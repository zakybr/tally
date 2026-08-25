import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* Google sends the browser back here with a one-time code. Swap it for a session cookie. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?error=missing_code`);
  }

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  /* The signup trigger only creates a member row for allowlisted emails. No row, no access. */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: member } = await supabase
      .from("members")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!member) return NextResponse.redirect(`${origin}/admin/no-access`);
  }

  return NextResponse.redirect(`${origin}${next.startsWith("/") ? next : "/admin"}`);
}
