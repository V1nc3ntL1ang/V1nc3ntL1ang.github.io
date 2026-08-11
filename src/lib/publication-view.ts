import { publications, type Publication } from "@/lib/publications";

export type SortValue = "newest" | "oldest" | "title-asc" | "title-desc";
export type FilterGroupKey = "venues" | "years";
export type SelectedFilters = Record<FilterGroupKey, string[]>;

export const sortOptions: Array<{ label: string; value: SortValue }> = [
  { label: "Newest → Oldest", value: "newest" },
  { label: "Oldest → Newest", value: "oldest" },
  { label: "Alphabetical (A–Z)", value: "title-asc" },
  { label: "Alphabetical (Z–A)", value: "title-desc" },
];

export const tagClassNames = [
  "border-[#315486] bg-[#1f3b63] text-[#b7d5ff]",
  "border-[#416f20] bg-[#315b14] text-[#c2ee9e]",
  "border-[#b6643b] bg-[#8f4327] text-[#ffd0b5]",
];

const venueFilterOptions = Array.from(
  new Set(publications.map((publication) => publication.venueShort)),
).sort((first, second) => first.localeCompare(second, "en"));

const yearFilterOptions = Array.from(
  new Set(publications.map((publication) => publication.year.toString())),
).sort((first, second) => Number(second) - Number(first));

export const filterGroups: Array<{
  key: FilterGroupKey;
  label: string;
  options: string[];
  selectedClassName: string;
}> = [
  {
    key: "venues",
    label: "Venue",
    options: venueFilterOptions,
    selectedClassName: tagClassNames[0],
  },
  {
    key: "years",
    label: "Year",
    options: yearFilterOptions,
    selectedClassName: tagClassNames[1],
  },
];

export const totalFilterOptionCount = filterGroups.reduce(
  (count, group) => count + group.options.length,
  0,
);

export function createEmptyFilters(): SelectedFilters {
  return { venues: [], years: [] };
}

export function createAllSelectedFilters(): SelectedFilters {
  return {
    venues: [...venueFilterOptions],
    years: [...yearFilterOptions],
  };
}

export function comparePublications(
  first: Publication,
  second: Publication,
  sortValue: SortValue,
) {
  if (sortValue === "newest") return second.year - first.year;
  if (sortValue === "oldest") return first.year - second.year;

  const titleComparison = first.title.localeCompare(second.title, "en", {
    sensitivity: "base",
  });
  return sortValue === "title-asc" ? titleComparison : -titleComparison;
}
