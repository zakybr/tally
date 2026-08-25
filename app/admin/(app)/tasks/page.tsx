import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import TaskBoard from "@/components/admin/TaskBoard";
import { supabaseServer } from "@/lib/supabase/server";
import type { List, Member, Task } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Tasks" };
export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [lists, tasks, members] = await Promise.all([
    supabase.from("lists").select("*").eq("archived", false).order("position"),
    supabase.from("tasks").select("*").order("position"),
    supabase.from("members").select("*").order("created_at"),
  ]);

  return (
    <>
      <PageHeader
        title="Tasks"
        lede="Everything here updates live. If someone else has it open, their changes land on your screen without a refresh."
      />
      <TaskBoard
        initialLists={(lists.data ?? []) as List[]}
        initialTasks={(tasks.data ?? []) as Task[]}
        members={(members.data ?? []) as Member[]}
        currentMemberId={user!.id}
      />
    </>
  );
}
