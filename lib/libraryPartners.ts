import { TRACKS, type Track } from "@/lib/tracks";

export const LIBRARY_LITERACY_TRACK_IDS = [
  "digital-literacy",
  "financial-literacy",
] as const satisfies ReadonlyArray<Track["id"]>;

export type LibraryPartner = {
  slug: string;
  name: string;
  location: string;
  className: string;
  classCode: string;
  trackIds: Track["id"][];
  headline: string;
  description: string;
  /** What patrons actually carry — e.g. PINES card, not a county-branded card. */
  cardName: string;
};

/** Catalog of library partnerships. Henry County is the first live partner. */
export const LIBRARY_PARTNERS: LibraryPartner[] = [
  {
    slug: "henry-county",
    name: "Henry County Library System",
    location: "Henry County, Georgia",
    className: "Henry County Library — Digital & Financial Literacy",
    classCode: "KANAM-HCLS",
    trackIds: [...LIBRARY_LITERACY_TRACK_IDS],
    headline: "Welcome. Your free courses are ready.",
    description:
      "Digital Literacy and Financial Literacy — two full Kanam courses, unlocked with your PINES card.",
    cardName: "PINES card",
  },
];

const PARTNER_BY_SLUG = new Map(LIBRARY_PARTNERS.map((p) => [p.slug, p]));
const PARTNER_BY_CODE = new Map(
  LIBRARY_PARTNERS.map((p) => [p.classCode.trim().toUpperCase(), p])
);

export function getLibraryPartner(slug: string): LibraryPartner | null {
  const key = slug.trim().toLowerCase();
  return PARTNER_BY_SLUG.get(key) ?? null;
}

export function findLibraryPartnerByCode(classCode: string): LibraryPartner | null {
  const code = classCode.trim().toUpperCase();
  return PARTNER_BY_CODE.get(code) ?? null;
}

export function slugifyPartnerName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "library";
}

export function lessonIdsForTracks(trackIds: Iterable<string>): string[] {
  const wanted = new Set(trackIds);
  return TRACKS.filter((track) => wanted.has(track.id)).flatMap((track) =>
    track.lessons.map((lesson) => lesson.id)
  );
}

export function trackTitlesForIds(trackIds: Iterable<string>): string[] {
  const wanted = new Set(trackIds);
  return TRACKS.filter((track) => wanted.has(track.id)).map((track) => track.title);
}
