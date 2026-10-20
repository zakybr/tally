/*
  /audit used to carry its own warm palette and serif as a separate paid-traffic
  page. It is now the site's free audit and uses the main brand, so the layout
  just passes through.
*/
export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
