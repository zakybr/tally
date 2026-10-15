import type { Metadata } from "next";
import VerticalPage from "@/components/VerticalPage";
import { getService } from "@/lib/services";

const service = getService("instagram-account-recovery")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  keywords: service.keywords,
  alternates: { canonical: service.path },
  openGraph: {
    title: `${service.title} | Tally`,
    description: service.description,
    url: service.path,
  },
};

export default function Page() {
  return <VerticalPage vertical={service} />;
}
