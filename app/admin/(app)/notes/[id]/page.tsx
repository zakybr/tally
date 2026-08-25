import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoteEditor from "@/components/admin/NoteEditor";
import { supabaseServer } from "@/lib/supabase/server";
import type { Member, Note } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await supabaseServer();
  const { data } = await supabase.from("notes").select("title").eq("id", id).maybeSingle();
  return { title: (data as { title?: string } | null)?.title ?? "Note" };
}

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [noteResult, memberResult] = await Promise.all([
    supabase.from("notes").select("*").eq("id", id).maybeSingle<Note>(),
    supabase.from("members").select("*").eq("id", user!.id).single<Member>(),
  ]);

  if (!noteResult.data) notFound();

  return (
    <>
      <div className="border-b border-hairline px-5 py-3 md:px-8">
        <Link href="/admin/notes" className="mono-label text-ink-2 hover:text-amber">
          ← All notes
        </Link>
      </div>
      <NoteEditor note={noteResult.data} member={memberResult.data!} />
    </>
  );
}
