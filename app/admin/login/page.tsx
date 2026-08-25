import type { Metadata } from "next";
import LoginPanel from "@/components/admin/LoginPanel";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return <LoginPanel next={next} error={error} />;
}
