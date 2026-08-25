import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { supabaseServer } from "@/lib/supabase/server";
import type { Member } from "@/lib/supabase/types";

/*
  Everything in this group requires a member row. Proxy already bounced signed-out
  visitors; this is the check that a signed-in account is actually allowlisted.
*/
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Member>();

  if (!member) redirect("/admin/no-access");

  return <AdminShell member={member}>{children}</AdminShell>;
}
