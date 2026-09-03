"use client";

import * as Y from "yjs";
import {
  Awareness,
  applyAwarenessUpdate,
  encodeAwarenessUpdate,
  removeAwarenessStates,
} from "y-protocols/awareness";
import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

/*
  A Yjs provider that rides Supabase Realtime broadcast instead of a dedicated
  websocket server. Two people editing the same note converge through CRDT
  updates relayed by Supabase, which costs nothing on the free tier.

  Wire format is JSON because broadcast payloads are JSON, so binary Yjs
  updates travel base64 encoded.
*/

type Msg =
  | { t: "sync1"; from: number; sv: string; reply?: boolean }
  | { t: "sync2"; to: number; u: string }
  | { t: "update"; from: number; u: string }
  | { t: "aware"; from: number; u: string };

const toB64 = (bytes: Uint8Array) => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(s);
};

const fromB64 = (b64: string) => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

export type PeerState = {
  clientId: number;
  name: string;
  color: string;
};

export class SupabaseYjsProvider {
  readonly doc: Y.Doc;
  readonly awareness: Awareness;

  private channel: RealtimeChannel;
  private origin = Symbol("supabase-yjs");
  private onPeers?: (peers: PeerState[]) => void;
  private onStatus?: (connected: boolean) => void;
  private destroyed = false;

  constructor(
    supabase: SupabaseClient,
    roomId: string,
    doc: Y.Doc,
    opts: {
      user: { name: string; color: string };
      onPeers?: (peers: PeerState[]) => void;
      onStatus?: (connected: boolean) => void;
    },
  ) {
    this.doc = doc;
    this.onPeers = opts.onPeers;
    this.onStatus = opts.onStatus;

    this.awareness = new Awareness(doc);
    this.awareness.setLocalStateField("user", opts.user);

    this.channel = supabase.channel(`note:${roomId}`, {
      config: { broadcast: { self: false } },
    });

    this.channel.on("broadcast", { event: "y" }, ({ payload }) =>
      this.receive(payload as Msg),
    );

    doc.on("update", this.handleDocUpdate);
    this.awareness.on("update", this.handleAwarenessUpdate);

    this.channel.subscribe((status) => {
      const connected = status === "SUBSCRIBED";
      this.onStatus?.(connected);
      if (connected) {
        /* Announce ourselves. Any peer already in the room answers with a diff. */
        this.send({ t: "sync1", from: doc.clientID, sv: toB64(Y.encodeStateVector(doc)) });
        this.broadcastAwareness([doc.clientID]);
      }
    });

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", this.handleUnload);
    }
  }

  /* --- outbound ---------------------------------------------------------- */

  private send(msg: Msg) {
    if (this.destroyed) return;
    void this.channel.send({ type: "broadcast", event: "y", payload: msg });
  }

  private handleDocUpdate = (update: Uint8Array, origin: unknown) => {
    /* Do not echo updates that arrived from a peer, that is how loops start. */
    if (origin === this.origin) return;
    this.send({ t: "update", from: this.doc.clientID, u: toB64(update) });
  };

  private handleAwarenessUpdate = (
    { added, updated, removed }: { added: number[]; updated: number[]; removed: number[] },
    origin: unknown,
  ) => {
    if (origin !== "remote") {
      this.broadcastAwareness([...added, ...updated, ...removed]);
    }
    this.emitPeers();
  };

  private broadcastAwareness(clients: number[]) {
    if (!clients.length) return;
    this.send({
      t: "aware",
      from: this.doc.clientID,
      u: toB64(encodeAwarenessUpdate(this.awareness, clients)),
    });
  }

  /* --- inbound ----------------------------------------------------------- */

  private receive(msg: Msg) {
    if (this.destroyed) return;

    switch (msg.t) {
      case "sync1": {
        /* Reply with everything they are missing. */
        const diff = Y.encodeStateAsUpdate(this.doc, fromB64(msg.sv));
        this.send({ t: "sync2", to: msg.from, u: toB64(diff) });
        /* Then ask for anything we are missing, once, so this does not ping-pong. */
        if (!msg.reply) {
          this.send({
            t: "sync1",
            from: this.doc.clientID,
            sv: toB64(Y.encodeStateVector(this.doc)),
            reply: true,
          });
        }
        this.broadcastAwareness([this.doc.clientID]);
        break;
      }
      case "sync2": {
        if (msg.to !== this.doc.clientID) return;
        Y.applyUpdate(this.doc, fromB64(msg.u), this.origin);
        break;
      }
      case "update": {
        if (msg.from === this.doc.clientID) return;
        Y.applyUpdate(this.doc, fromB64(msg.u), this.origin);
        break;
      }
      case "aware": {
        if (msg.from === this.doc.clientID) return;
        applyAwarenessUpdate(this.awareness, fromB64(msg.u), "remote");
        break;
      }
    }
  }

  private emitPeers() {
    if (!this.onPeers) return;
    const peers: PeerState[] = [];
    this.awareness.getStates().forEach((state, clientId) => {
      const user = (state as { user?: { name?: string; color?: string } }).user;
      if (user?.name) {
        peers.push({
          clientId,
          name: user.name,
          color: user.color ?? "#ff4a1c",
        });
      }
    });
    this.onPeers(peers);
  }

  private handleUnload = () => {
    removeAwarenessStates(this.awareness, [this.doc.clientID], "unload");
  };

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.doc.off("update", this.handleDocUpdate);
    this.awareness.off("update", this.handleAwarenessUpdate);
    removeAwarenessStates(this.awareness, [this.doc.clientID], "destroy");
    this.awareness.destroy();
    void this.channel.unsubscribe();
    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", this.handleUnload);
    }
  }
}

export { toB64, fromB64 };
