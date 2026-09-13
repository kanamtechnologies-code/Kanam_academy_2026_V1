import type { Metadata } from "next";

import { LibraryPartnerClient } from "@/components/library/LibraryPartnerClient";
import { getLibraryPartner } from "@/lib/libraryPartners";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getLibraryPartner(slug);
  const title = partner
    ? `${partner.name} — Welcome`
    : "Library welcome — Kanam Academy";
  const description =
    partner?.description ??
    "Your library card unlocks free Digital Literacy and Financial Literacy courses from Kanam Academy.";
  return { title, description };
}

export default async function LibraryPartnerPage({ params }: PageProps) {
  const { slug } = await params;
  return <LibraryPartnerClient slug={decodeURIComponent(slug).trim().toLowerCase()} />;
}
