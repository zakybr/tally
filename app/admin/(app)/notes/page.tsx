import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import NotesIndex from "@/components/admin/NotesIndex";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Notes" };
export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("notes")
    .select("id, title, plain_text, tags, updated_at")
    .eq("archived", false)
    .order("updated_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Notes"
        lede="Open a note and anyone else in it edits alongside you, cursor and all. Nothing needs saving."
      />
      <NotesIndex initialNotes={data ?? []} memberId={user!.id} />
    </>
  );
}
