import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/*
  Next 16 renamed Middleware to Proxy. This runs before /admin renders and does two jobs:
  refresh the Supabase session cookie, and bounce signed-out visitors to the login page.
  It is an optimistic check only — row level security is what actually protects the data.
*/
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(list) {
          for (const { name, value } of list) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of list) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;
  const isPublic = pathname === "/admin/login" || pathname === "/admin/no-access";

  if (!user && !isPublic) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.search = "";
    if (pathname !== "/admin") login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }

  if (user && pathname === "/admin/login") {
    const home = request.nextUrl.clone();
    home.pathname = "/admin";
    home.search = "";
    return NextResponse.redirect(home);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
