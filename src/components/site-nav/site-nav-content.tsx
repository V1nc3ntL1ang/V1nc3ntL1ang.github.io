import { education, focusAreas, profile } from "@/lib/site-content";
import { publications, publicationsVisible } from "@/lib/publications";

export type MenuKey = "about" | "publication";

type NavMenu = {
  eyebrow: string;
  primary: Array<{ label: string; href: string }>;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
};

export const navMenus: Record<MenuKey, NavMenu> = {
  about: {
    eyebrow: "Explore About",
    primary: [
      { label: "Overview", href: "/about#overview" },
      { label: "Research Interests", href: "/about#research" },
      { label: "Education", href: "/about#education" },
    ],
    columns: [],
  },
  publication: {
    eyebrow: "Explore Publications",
    primary: [
      { label: "All Publications", href: "/publications#publications" },
    ],
    columns: [],
  },
};

const overviewSearchText =
  "Hi, I'm Vincent. Welcome to my website. I love working with AI — and working on it. I like building things with strong ideas and clean execution. I'm drawn to work that feels thoughtful, clear, and quietly confident. You can reach me by email. If you're interested, feel free to take a look at my GitHub.";
const aboutOverviewSearchText =
  "I study Data Science and Big Data Technology at South China University of Technology. My current interests center on agentic AI, recursive self-improvement, and multimodal large language models. Letian “Vincent” Liang. School of Future Technology. South China University of Technology. Data Science and Big Data Technology.";

type SearchItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  href: string;
  content: string;
  snippetSource?: string;
};

export type SearchResult = SearchItem & {
  rank: number;
  snippet: string;
};

const searchItems: SearchItem[] = [
  {
    id: "home",
    section: "Home",
    label: "Home",
    description: "Welcome page",
    href: "/",
    content: [
      "home",
      "welcome",
      "vincent",
      "website",
      profile.email,
      profile.github,
      overviewSearchText,
    ].join(" "),
    snippetSource: overviewSearchText,
  },
  {
    id: "about-overview",
    section: "About / Overview",
    label: "Overview",
    description: "Profile, affiliation, and current direction",
    href: "/about#overview",
    content: [
      "about overview profile scut vincent",
      overviewSearchText,
      aboutOverviewSearchText,
      profile.name,
      profile.nickname,
      profile.email,
      profile.github,
    ].join(" "),
    snippetSource: aboutOverviewSearchText,
  },
  ...(publicationsVisible
    ? [
        {
          id: "publications-index",
          section: "Publications",
          label: "Publications",
          description: "Papers, preprints, and selected research",
          href: "/publications#publications",
          content:
            "publications papers preprints selected research academic work",
          snippetSource: "A collection of my academic work.",
        },
        ...publications.map((publication) => ({
          id: `publication-${publication.id}`,
          section: "Publications",
          label: publication.title,
          description: [
            publication.venueShort,
            publication.year.toString(),
            publication.distinction,
          ]
            .filter(Boolean)
            .join(" · "),
          href: `/publications#${publication.id}`,
          content: [
            "publication paper research",
            publication.title,
            publication.authors,
            publication.venue,
            publication.venueShort,
            publication.year.toString(),
            publication.distinction ?? "",
          ].join(" "),
          snippetSource: `${publication.authors}. ${publication.venue}`,
        })),
      ]
    : []),
  ...focusAreas
    .filter((item) => !item.hidden)
    .map((item, index) => ({
      id: `about-research-${index}`,
      section: "About / Research interests",
      label: item.title,
      description: item.description,
      href: "/about#research",
      content: [
        "research interests current interests about research",
        item.eyebrow,
        item.title,
        item.description,
      ].join(" "),
      snippetSource: item.description,
    })),
  ...education
    .filter((item) => !item.hidden)
    .map((item, index) => ({
      id: `about-education-${index}`,
      section: "About / Academic background",
      label: item.title,
      description: item.subtitle,
      href: "/about#education",
      content: [
        "education academic background",
        item.title,
        item.subtitle,
        item.period,
        item.location,
        item.description,
      ].join(" "),
      snippetSource: `${item.subtitle}. ${item.description}`,
    })),
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSnippet(source: string, query: string) {
  const trimmedSource = source.replace(/\s+/g, " ").trim();
  if (!trimmedSource || !query) return trimmedSource;

  const matchIndex = trimmedSource.toLowerCase().indexOf(query.toLowerCase());
  if (matchIndex === -1) return trimmedSource;

  const start = Math.max(0, matchIndex - 40);
  const end = Math.min(trimmedSource.length, matchIndex + query.length + 70);
  return `${start > 0 ? "..." : ""}${trimmedSource
    .slice(start, end)
    .trim()}${end < trimmedSource.length ? "..." : ""}`;
}

export function buildSearchResults(query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return searchItems.map((item) => ({
      ...item,
      rank: 0,
      snippet: item.description,
    }));
  }

  return searchItems
    .map((item) => {
      const label = item.label.toLowerCase();
      const description = item.description.toLowerCase();
      const content = item.content.toLowerCase();
      const rank = label.startsWith(normalizedQuery)
        ? 0
        : label.includes(normalizedQuery)
          ? 1
          : description.includes(normalizedQuery)
            ? 2
            : content.includes(normalizedQuery)
              ? 3
              : -1;

      return rank === -1
        ? null
        : {
            ...item,
            rank,
            snippet: extractSnippet(
              item.snippetSource ?? item.description,
              normalizedQuery,
            ),
          };
    })
    .filter((item): item is SearchResult => item !== null)
    .sort((first, second) =>
      first.rank === second.rank
        ? first.label.localeCompare(second.label)
        : first.rank - second.rank,
    );
}

export function highlightMatch(text: string, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return text;

  const pattern = new RegExp(`(${escapeRegExp(query.trim())})`, "ig");
  return text.split(pattern).map((segment, index) =>
    segment.toLowerCase() === normalized ? (
      <mark key={`${segment}-${index}`} className="nav-search-highlight">
        {segment}
      </mark>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    ),
  );
}

export type MenuSnapshot = {
  key: MenuKey;
  menu: NavMenu;
};

export function getMenuSnapshot(key: MenuKey): MenuSnapshot {
  return { key, menu: navMenus[key] };
}
