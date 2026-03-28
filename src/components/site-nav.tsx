"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { education, focusAreas, navItems, profile } from "@/lib/site-content";

const navMenus = {
  about: {
    eyebrow: "Explore about",
    primary: [
      { label: "Overview", href: "/about#overview" },
      { label: "Research Interests", href: "/about#research" },
      { label: "Education", href: "/about#education" },
    ],
    columns: [],
  },
  project: {
    eyebrow: "Explore project",
    primary: [
      { label: "API platform", href: "/projects#overview" },
      { label: "Codex", href: "/projects#personal-site-system" },
      { label: "Agents", href: "/projects#agent-lab" },
      { label: "Open models", href: "/projects#featured" },
      { label: "Applications", href: "/projects#scheduler-sandbox" },
    ],
    columns: [
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/projects#featured" },
          { label: "Manual", href: "/projects#scheduler-sandbox" },
          { label: "Community", href: "/projects#agent-lab" },
        ],
      },
      {
        title: "Highlights",
        links: [
          { label: "Research notes", href: "/projects#agent-lab" },
          { label: "System prototype", href: "/projects#personal-site-system" },
          { label: "Optimization", href: "/projects#scheduler-sandbox" },
        ],
      },
    ],
  },
} as const;

const overviewSearchText =
  "Hi, I'm Vincent. Welcome to my website. I'm currently a third-year undergraduate majoring in Data Science and Big Data Technology at South China University of Technology. I'm interested in artificial intelligence, especially multi-agent systems, open-ended learning, and multimodal language model systems.";
const aboutOverviewSearchText =
  "I study Data Science and Big Data Technology at South China University of Technology. My current interests center on multi-agent systems, open-ended learning, and multimodal large language model systems. Letian Liang / Vincent. School of Future Technology. South China University of Technology. Data Science and Big Data Technology.";

type SearchItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  href: string;
  content: string;
  snippetSource?: string;
};

type SearchResult = SearchItem & {
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
    section: "About · Overview",
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
  ...focusAreas
    .filter((item) => !item.hidden)
    .map((item, index) => ({
      id: `about-research-${index}`,
      section: "About · Research interests",
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
      section: "About · Academic background",
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
  if (!trimmedSource) {
    return "";
  }

  if (!query) {
    return trimmedSource;
  }

  const lowerSource = trimmedSource.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerSource.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return trimmedSource;
  }

  const start = Math.max(0, matchIndex - 40);
  const end = Math.min(trimmedSource.length, matchIndex + query.length + 70);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < trimmedSource.length ? "…" : "";

  return `${prefix}${trimmedSource.slice(start, end).trim()}${suffix}`;
}

function highlightMatch(text: string, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return text;
  }

  const pattern = new RegExp(`(${escapeRegExp(query.trim())})`, "ig");
  const segments = text.split(pattern);

  return segments.map((segment, index) =>
    segment.toLowerCase() === normalized ? (
      <mark key={`${segment}-${index}`} className="nav-search-highlight">
        {segment}
      </mark>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    ),
  );
}

type MenuKey = keyof typeof navMenus;
type MenuSnapshot = {
  key: MenuKey;
  menu: (typeof navMenus)[MenuKey];
};

function getMenuSnapshot(key: MenuKey): MenuSnapshot {
  return {
    key,
    menu: navMenus[key],
  };
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.8333 13.8333L10.7022 10.7022M10.7022 10.7022C11.607 9.79738 12.1667 8.54738 12.1667 7.16667C12.1667 4.40525 9.9281 2.16667 7.16667 2.16667C4.40525 2.16667 2.16667 4.40525 2.16667 7.16667C2.16667 9.9281 4.40525 12.1667 7.16667 12.1667C8.54738 12.1667 9.79738 11.607 10.7022 10.7022Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<MenuKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnapshot, setActiveSnapshot] = useState<MenuSnapshot | null>(null);
  const [exitingSnapshot, setExitingSnapshot] = useState<MenuSnapshot | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [activeContentNode, setActiveContentNode] = useState<HTMLDivElement | null>(null);
  const hoverOpenTimeoutRef = useRef<number | null>(null);
  const hoverCloseTimeoutRef = useRef<number | null>(null);
  const exitingTimeoutRef = useRef<number | null>(null);
  const currentOpenItemRef = useRef<MenuKey | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isPanelOpen = openItem !== null;
  const panelHeight = isPanelOpen ? contentHeight : 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredSearchItems: SearchResult[] = normalizedQuery
    ? searchItems
        .map((item) => {
          const label = item.label.toLowerCase();
          const description = item.description.toLowerCase();
          const content = item.content.toLowerCase();

          let rank = -1;
          if (label.startsWith(normalizedQuery)) {
            rank = 0;
          } else if (label.includes(normalizedQuery)) {
            rank = 1;
          } else if (description.includes(normalizedQuery)) {
            rank = 2;
          } else if (content.includes(normalizedQuery)) {
            rank = 3;
          }

          if (rank === -1) {
            return null;
          }

          return {
            ...item,
            rank,
            snippet: extractSnippet(item.snippetSource ?? item.description, normalizedQuery),
          };
        })
        .filter((item): item is SearchResult => item !== null)
        .sort((a, b) => {
          if (a.rank !== b.rank) {
            return a.rank - b.rank;
          }

          return a.label.localeCompare(b.label);
        })
    : searchItems.map((item) => ({
        ...item,
        rank: 0,
        snippet: item.description,
      }));

  useEffect(() => {
    currentOpenItemRef.current = openItem;
  }, [openItem]);

  const clearTimers = () => {
    if (hoverOpenTimeoutRef.current) {
      window.clearTimeout(hoverOpenTimeoutRef.current);
      hoverOpenTimeoutRef.current = null;
    }

    if (hoverCloseTimeoutRef.current) {
      window.clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
  };

  const clearExitTimer = () => {
    if (exitingTimeoutRef.current) {
      window.clearTimeout(exitingTimeoutRef.current);
      exitingTimeoutRef.current = null;
    }
  };

  const openMenu = (key: MenuKey) => {
    const currentOpenItem = currentOpenItemRef.current;
    const nextSnapshot = getMenuSnapshot(key);

    if (currentOpenItem && currentOpenItem !== key) {
      setExitingSnapshot(getMenuSnapshot(currentOpenItem));
      setIsCrossfading(true);
    } else {
      setExitingSnapshot(null);
      setIsCrossfading(false);
    }

    setActiveSnapshot(nextSnapshot);
    setOpenItem(key);
  };

  const closeMenu = useCallback(() => {
    clearTimers();
    clearExitTimer();
    setOpenItem(null);
    setExitingSnapshot(null);
    setIsCrossfading(false);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const openSearch = useCallback(() => {
    closeMenu();
    setSearchOpen(true);
  }, [closeMenu]);

  const scheduleOpen = (key: MenuKey) => {
    closeSearch();
    clearTimers();

    if (openItem === null) {
      openMenu(key);
      return;
    }

    if (openItem === key) {
      return;
    }

    hoverOpenTimeoutRef.current = window.setTimeout(() => {
      openMenu(key);
      hoverOpenTimeoutRef.current = null;
    }, 150);
  };

  const scheduleClose = () => {
    clearTimers();
    hoverCloseTimeoutRef.current = window.setTimeout(() => {
      closeMenu();
      hoverCloseTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    if (!exitingSnapshot) {
      return;
    }

    clearExitTimer();
    exitingTimeoutRef.current = window.setTimeout(() => {
      setExitingSnapshot((current) => (current?.key === exitingSnapshot.key ? null : current));
      setIsCrossfading(false);
      exitingTimeoutRef.current = null;
    }, 200);

    return clearExitTimer;
  }, [exitingSnapshot]);

  useEffect(() => {
    if (!activeContentNode) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setContentHeight(activeContentNode.scrollHeight);
    });

    if (typeof ResizeObserver === "undefined") {
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new ResizeObserver(() => {
      setContentHeight(activeContentNode.scrollHeight);
    });

    observer.observe(activeContentNode);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeContentNode]);

  useEffect(() => () => {
    clearTimers();
    clearExitTimer();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      clearTimers();
      clearExitTimer();
      setOpenItem(null);
      setExitingSnapshot(null);
      setIsCrossfading(false);
      setSearchOpen(false);
      setSearchQuery("");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [closeMenu, closeSearch, openSearch, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.key === "Escape") {
        closeMenu();
        closeSearch();
        return;
      }

      if (!searchOpen && !isTypingField && event.key === "/") {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, closeSearch, openSearch, searchOpen]);

  const renderMenuLayer = (
    snapshot: MenuSnapshot,
    options?: {
      className?: string;
      attachMeasurementRef?: boolean;
      isInteractive?: boolean;
    },
  ) => (
    <div
      ref={options?.attachMeasurementRef ? setActiveContentNode : undefined}
      className={`nav-menu-layer site-shell flex items-start gap-20 py-10 ${options?.className ?? ""}`}
      aria-hidden={options?.isInteractive === false ? "true" : undefined}
    >
      <section className="w-fit shrink-0 space-y-4">
        <h2 className="nav-group-title">{snapshot.menu.eyebrow}</h2>
        <ul className="space-y-4">
          {snapshot.menu.primary.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="nav-primary-link"
                tabIndex={options?.isInteractive === false ? -1 : undefined}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="nav-link-arrow">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap items-start gap-16">
        {snapshot.menu.columns.map((column) => (
          <section key={column.title} className="space-y-4">
            <h2 className="nav-group-title">{column.title}</h2>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="nav-secondary-link"
                    tabIndex={options?.isInteractive === false ? -1 : undefined}
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="nav-link-arrow">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-x-0 top-0 z-[51]">
      <header className="bg-background/96" onMouseLeave={scheduleClose}>
        <div className="site-shell flex h-16 items-center gap-6">
          <Link href="/" className="nav-brand shrink-0">
            Vincent Liang
          </Link>

          <div className="flex min-w-0 flex-1 items-center">
            <nav className="hidden h-full items-center lg:flex" aria-label="Primary navigation">
              <ul className="flex h-full items-center">
                {navItems
                  .filter((item) => !item.hidden)
                  .map((item) => {
                    const key = item.href === "/about" ? "about" : "project";
                    const isOpen = openItem === key;
                    const isDimmed = openItem !== null && openItem !== key;

                    return (
                      <li key={item.href} className="relative flex h-full items-center">
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => scheduleOpen(key)}
                          onFocus={() => openMenu(key)}
                          className={`nav-link inline-flex h-full items-center px-[0.625rem] ${
                            isOpen
                              ? "nav-link-active"
                              : isDimmed
                                ? "nav-link-dim"
                                : "nav-link-default"
                          }`}
                        >
                          <span className="inline-flex items-center py-0 leading-none">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            <div className="ml-2 hidden lg:flex">
              <button
                type="button"
                aria-label="Open search"
                className="nav-icon-button"
                onMouseEnter={closeMenu}
                onFocus={closeMenu}
                onClick={() => {
                  if (searchOpen) {
                    closeSearch();
                    return;
                  }

                  openSearch();
                }}
              >
                <SearchIcon />
              </button>
            </div>
          </div>

        </div>
      </header>

      <div
        className={`nav-overlay fixed inset-x-0 bottom-0 top-16 z-50 bg-primary-12/90 backdrop-blur-lg ${
          isPanelOpen || searchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onMouseEnter={scheduleClose}
        onClick={() => {
          closeMenu();
          closeSearch();
        }}
      />

      <div
        aria-hidden={isPanelOpen ? "false" : "true"}
        className={`nav-panel fixed inset-x-0 top-16 z-[51] overflow-hidden bg-background/98 ${
          isPanelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ height: `${panelHeight}px` }}
        onMouseEnter={clearTimers}
        onMouseLeave={scheduleClose}
      >
        <div className="relative">
          {activeSnapshot
            ? renderMenuLayer(activeSnapshot, {
                attachMeasurementRef: true,
                className: isCrossfading ? "nav-menu-content-enter" : "",
              })
            : null}

          {exitingSnapshot
            ? renderMenuLayer(exitingSnapshot, {
                className: "nav-menu-content-exit absolute inset-0 z-10",
                isInteractive: false,
              })
            : null}
        </div>
      </div>

      <div
        aria-hidden={searchOpen ? "false" : "true"}
        className={`fixed inset-x-0 top-16 z-[52] ${
          searchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-200`}
      >
        <div className="site-shell py-6">
          <div className="nav-search-panel mx-auto max-w-[42rem]">
            <div className="border-b border-border-subtle px-5 py-4">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search the site"
                className="nav-search-input"
              />
            </div>

            <div className="max-h-[22rem] overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="nav-group-title">Search</p>
                <p className="text-xs tracking-[0.02em] text-foreground-44">Press / to open, Esc to close</p>
              </div>

              <ul className="space-y-1">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="nav-search-link"
                        onClick={closeSearch}
                      >
                        <div>
                          <p className="nav-search-meta">{item.section}</p>
                          <p className="mt-1 text-[1rem] font-medium leading-6 text-foreground">
                            {highlightMatch(item.label, normalizedQuery)}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-foreground-60">
                            {highlightMatch(item.snippet, normalizedQuery)}
                          </p>
                        </div>
                        <span aria-hidden="true" className="nav-search-link-arrow">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-2 py-4 text-sm leading-6 text-foreground-44">
                    No results found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
