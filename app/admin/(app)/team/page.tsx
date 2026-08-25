import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import TeamPanel from "@/components/admin/TeamPanel";
import { supabaseServer } from "@/lib/supabase/server";
import type { AllowedEmail, Member } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Team" };
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [members, allowed] = await Promise.all([
    supabase.from("members").select("*").order("created_at"),
    supabase.from("allowed_emails").select("*").order("created_at"),
  ]);

  const list = (members.data ?? []) as Member[];
  const me = list.find((m) => m.id === user!.id);

  return (
    <>
      <PageHeader
        title="Team"
        lede="Add someone here and they can sign in with Google immediately. No invite email, no password."
      />
      <TeamPanel
        members={list}
        initialAllowed={(allowed.data ?? []) as AllowedEmail[]}
        isOwner={me?.role === "owner"}
        currentId={user!.id}
      />
    </>
  );
}
