import { Source_Serif_4 } from "next/font/google";

/*
  Scopes the /audit palette and serif to this route and /audit/thanks.
  next/font downloads the face at build time and self-hosts it, so no visitor
  request goes to Google.
*/
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-audit-serif",
  display: "swap",
});

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} audit-sheet`}>{children}</div>;
}
