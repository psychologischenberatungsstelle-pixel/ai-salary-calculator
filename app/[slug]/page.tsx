// app/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";

import SalaryCalculator from "@/components/SalaryCalculator";
import AdBanner from "@/components/AdBanner";
import NegotiationGuideBox from "@/components/NegotiationGuideBox";
import AffiliateBox from "@/components/AffiliateBox";
import RelatedLinks from "@/components/RelatedLinks";

/* ------------------------------ Typen ------------------------------ */

export interface SalaryEntry {
  slug: string;
  title: string;
  description?: string;
  [key: string]: unknown;
}

interface IndexedEntry {
  entry: SalaryEntry;
  aliases: string[];
}

type PageProps = {
  params: { slug: string };
};

/* --------------------------- Konfiguration ------------------------- */

const DATA_FILE = path.join(process.cwd(), "data", "salaries.json");
const SITE_NAME = "AI Salary Calculator";

const SLUG_FIELDS = [
  "slug",
  "id",
  "url",
  "path",
  "href",
  "link",
  "permalink",
  "key",
  "route",
];

const TITLE_FIELDS = ["title", "name", "job", "jobTitle", "role", "profession"];

/* ------------------------- Hilfsfunktionen ------------------------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanSlug(value: string): string {
  let v = value.trim();
  try {
    v = decodeURIComponent(v);
  } catch {
    // ungültige Kodierung -> Wert unverändert lassen
  }
  v = v.split("?")[0].split("#")[0];
  const parts = v.split("/").filter((p) => p.length > 0);
  if (parts.length === 0) return "";
  let last = parts[parts.length - 1];
  if (last.toLowerCase().endsWith(".html")) last = last.slice(0, -5);
  return last.trim();
}

function readString(item: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

/* ------------------------- Daten einlesen -------------------------- */

function extractList(raw: unknown): Array<[string | null, unknown]> {
  if (Array.isArray(raw)) {
    return raw.map((item): [string | null, unknown] => [null, item]);
  }

  if (isRecord(raw)) {
    const knownKeys = [
      "salaries",
      "data",
      "items",
      "jobs",
      "entries",
      "calculators",
      "professions",
      "pages",
      "list",
    ];
    for (const key of knownKeys) {
      const value = raw[key];
      if (Array.isArray(value)) {
        return value.map((item): [string | null, unknown] => [null, item]);
      }
    }

    for (const value of Object.values(raw)) {
      if (Array.isArray(value)) {
        return value.map((item): [string | null, unknown] => [null, item]);
      }
    }

    const pairs = Object.entries(raw).filter(([, v]) => isRecord(v));
    if (pairs.length > 0) {
      return pairs.map(([key, v]): [string | null, unknown] => [key, v]);
    }
  }

  return [];
}

function buildIndexedEntry(
  keyHint: string | null,
  item: unknown
): IndexedEntry | null {
  if (!isRecord(item)) return null;

  const candidates: string[] = [];

  for (const field of SLUG_FIELDS) {
    const value = item[field];
    if (typeof value === "string" || typeof value === "number") {
      const cleaned = cleanSlug(String(value));
      if (cleaned) candidates.push(cleaned);
    }
  }
  if (keyHint) {
    const cleaned = cleanSlug(keyHint);
    if (cleaned) candidates.push(cleaned);
  }

  const title = readString(item, TITLE_FIELDS);
  const country = readString(item, ["country", "land", "location", "region"]);
  if (title) {
    candidates.push(toSlug(title));
    candidates.push(toSlug(title + " salary"));
    if (country) {
      candidates.push(toSlug(title + " " + country));
      candidates.push(toSlug(title + " salary " + country));
    }
  }

  const seen = new Set<string>();
  const aliases: string[] = [];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const lower = candidate.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    aliases.push(candidate);
  }

  if (aliases.length === 0) return null;

  const primary = aliases[0];
  const entry = {
    ...item,
    slug: primary,
    title: title || primary,
  } as SalaryEntry;

  return { entry, aliases };
}

let cache: IndexedEntry[] | null = null;

function getIndex(): IndexedEntry[] {
  if (cache) return cache;

  let raw: unknown = [];
  try {
    raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (error) {
    console.error("[salaries] Konnte Datei nicht lesen: " + DATA_FILE, error);
    raw = [];
  }

  const result: IndexedEntry[] = [];
  for (const [keyHint, item] of extractList(raw)) {
    const indexed = buildIndexedEntry(keyHint, item);
    if (indexed) result.push(indexed);
  }

  cache = result;
  return result;
}

function getSalaries(): SalaryEntry[] {
  return getIndex().map((indexed) => indexed.entry);
}

function getSalaryBySlug(slug: string): SalaryEntry | undefined {
  const wanted = cleanSlug(slug).toLowerCase();
  const found = getIndex().find((indexed) =>
    indexed.aliases.some((alias) => alias.toLowerCase() === wanted)
  );

  if (!found) {
    console.warn(
      "[salaries] Slug nicht gefunden: '" +
        slug +
        "'. Bekannte Slugs: " +
        getIndex()
          .flatMap((indexed) => indexed.aliases)
          .join(", ")
    );
  }

  return found?.entry;
}

/* ----------------------- generateStaticParams ---------------------- */

export function generateStaticParams(): Array<{ slug: string }> {
  const seen = new Set<string>();
  const params: Array<{ slug: string }> = [];

  for (const indexed of getIndex()) {
    for (const alias of indexed.aliases) {
      const lower = alias.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      params.push({ slug: alias });
    }
  }

  console.log("[generateStaticParams] " + params.length + " Slugs");
  return params;
}

/* ------------------------- generateMetadata ------------------------ */

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getSalaryBySlug(params.slug);

  if (!entry) {
    return { title: "Nicht gefunden | " + SITE_NAME };
  }

  const title = entry.title + " Gehaltsrechner | " + SITE_NAME;
  const description =
    entry.description ??
    "Berechne dein mögliches Gehalt als " +
      entry.title +
      ". Kostenloser Gehaltsrechner mit aktuellen Daten.";

  return {
    title,
    description,
    alternates: { canonical: "/" + entry.slug },
    openGraph: { title, description, type: "website" },
  };
}

/* ------------------------------- Seite ----------------------------- */

export default function SalaryPage({ params }: PageProps) {
  const entry = getSalaryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  const related = getSalaries()
    .filter((item) => item.slug !== entry.slug)
    .slice(0, 6)
    .map((item) => ({ slug: item.slug, title: item.title }));

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{entry.title} Gehaltsrechner</h1>

      <SalaryCalculator data={entry} />

      <AdBanner slot="1234567890" />

      <NegotiationGuideBox />

      <AffiliateBox />

      <RelatedLinks links={related} />
    </main>
  );
}
