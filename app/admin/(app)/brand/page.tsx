import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import BrandHub from "@/components/admin/BrandHub";
import { supabaseServer } from "@/lib/supabase/server";
import type { BrandAsset, Prompt } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Brand" };
export const dynamic = "force-dynamic";

export default async function BrandPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [assets, prompts] = await Promise.all([
    supabase.from("brand_assets").select("*").order("position"),
    supabase.from("prompts").select("*").order("position"),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Identity and briefs"
        title="Brand"
        lede="The logo, the palette, the rules, and a prompt for every kind of asset — each one carrying the brand block so anything Claude generates comes back looking like Tally."
      />
      <BrandHub
        assets={(assets.data ?? []) as BrandAsset[]}
        initialPrompts={(prompts.data ?? []) as Prompt[]}
        memberId={user!.id}
      />
    </>
  );
}
