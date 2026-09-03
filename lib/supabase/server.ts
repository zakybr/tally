import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/* Server client. `cookies()` is async in Next 16, so every caller must await this. */
export async function supabaseServer() {
  const store = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll(list) {
          try {
            for (const { name, value, options } of list) {
              store.set(name, value, options);
            }
          } catch {
            /* Called from a Server Component render, proxy.ts refreshes the session instead. */
          }
        },
      },
    },
  );
}
