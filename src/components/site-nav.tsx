"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildSearchResults,
  getMenuSnapshot,
  type MenuKey,
  type MenuSnapshot,
} from "@/components/site-nav/site-nav-content";
import {
  NavMenuLayer,
  SiteSearchPanel,
} from "@/components/site-nav/site-nav-panels";
import { navItems } from "@/lib/site-content";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      viewBox="0 0 16 16"
      fill="none"
    >
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

function menuKeyForHref(href: string): MenuKey {
  if (href === "/about") return "about";
  return "publication";
}

export function SiteNav() {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  const [openItem, setOpenItem] = useState<MenuKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnapshot, setActiveSnapshot] =
    useState<MenuSnapshot | null>(null);
  const [exitingSnapshot, setExitingSnapshot] =
    useState<MenuSnapshot | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [activeContentNode, setActiveContentNode] =
    useState<HTMLDivElement | null>(null);
  const hoverOpenTimeoutRef = useRef<number | null>(null);
  const hoverCloseTimeoutRef = useRef<number | null>(null);
  const exitingTimeoutRef = useRef<number | null>(null);
  const currentOpenItemRef = useRef<MenuKey | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  const isPanelOpen = openItem !== null;
  const panelHeight = isPanelOpen ? contentHeight : 0;
  const searchResults = buildSearchResults(searchQuery);

  useEffect(() => {
    currentOpenItemRef.current = openItem;
  }, [openItem]);

  const clearHoverTimers = () => {
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
    clearHoverTimers();
    clearExitTimer();
    setOpenItem(null);
    setExitingSnapshot(null);
    setIsCrossfading(false);
  }, []);

  const closeSearch = useCallback(() => {
    searchInputRef.current?.blur();
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const openSearch = useCallback(() => {
    closeMenu();
    setSearchOpen(true);
  }, [closeMenu]);

  const scheduleOpen = (key: MenuKey) => {
    closeSearch();
    clearHoverTimers();

    if (openItem === null) {
      openMenu(key);
    } else if (openItem !== key) {
      hoverOpenTimeoutRef.current = window.setTimeout(() => {
        openMenu(key);
        hoverOpenTimeoutRef.current = null;
      }, 150);
    }
  };

  const scheduleClose = () => {
    clearHoverTimers();
    hoverCloseTimeoutRef.current = window.setTimeout(() => {
      closeMenu();
      hoverCloseTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    if (!exitingSnapshot) return;

    clearExitTimer();
    exitingTimeoutRef.current = window.setTimeout(() => {
      setExitingSnapshot((current) =>
        current?.key === exitingSnapshot.key ? null : current,
      );
      setIsCrossfading(false);
      exitingTimeoutRef.current = null;
    }, 260);

    return clearExitTimer;
  }, [exitingSnapshot]);

  useEffect(() => {
    if (!activeContentNode) return;

    const updateHeight = () => setContentHeight(activeContentNode.scrollHeight);
    const frame = window.requestAnimationFrame(updateHeight);
    if (typeof ResizeObserver === "undefined") {
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activeContentNode);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeContentNode]);

  useEffect(
    () => () => {
      clearHoverTimers();
      clearExitTimer();
    },
    [],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      clearHoverTimers();
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
    if (!searchOpen) return;
    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      const target = event.target;
      if (target instanceof Node && !searchResultsRef.current?.contains(target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", preventBackgroundScroll, {
      passive: false,
    });
    document.addEventListener("touchmove", preventBackgroundScroll, {
      passive: false,
    });
    return () => {
      document.removeEventListener("wheel", preventBackgroundScroll);
      document.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [searchOpen]);

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
      } else if (!searchOpen && !isTypingField && event.key === "/") {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, closeSearch, openSearch, searchOpen]);

  const toggleSearch = () => {
    if (searchOpen) closeSearch();
    else openSearch();
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[51]">
      <header className="bg-background/96" onMouseLeave={scheduleClose}>
        <div className="site-shell flex h-16 items-center gap-6">
          <Link href="/" className="nav-brand shrink-0">
            Vincent Liang
          </Link>

          <div className="flex min-w-0 flex-1 items-center">
            <nav
              className="hover-navigation h-full items-center"
              aria-label="Primary navigation"
            >
              <ul className="flex h-full items-center">
                {navItems
                  .filter((item) => !item.hidden)
                  .map((item) => {
                    const key = menuKeyForHref(item.href);
                    const normalizedHref = item.href.replace(/\/$/, "") || "/";
                    const isCurrent = normalizedPathname === normalizedHref;
                    const isOpen = openItem === key;
                    const isDimmed = openItem !== null && openItem !== key;

                    return (
                      <li
                        key={item.href}
                        className="relative flex h-full items-center"
                      >
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? "page" : undefined}
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
                          <span className="inline-flex items-center py-0 leading-none">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            <div className="hover-navigation ml-2">
              <button
                type="button"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="site-search-panel"
                className="nav-icon-button"
                onMouseEnter={closeMenu}
                onFocus={closeMenu}
                onClick={toggleSearch}
              >
                <SearchIcon />
              </button>
            </div>

            <div className="direct-navigation ml-auto h-full items-center gap-1">
              <nav
                className="flex h-full items-center"
                aria-label="Mobile navigation"
              >
                <ul className="flex h-full items-center">
                  {navItems
                    .filter((item) => !item.hidden)
                    .map((item) => {
                      const normalizedHref =
                        item.href.replace(/\/$/, "") || "/";
                      const isCurrent = normalizedPathname === normalizedHref;

                      return (
                        <li key={item.href} className="flex h-full items-center">
                          <Link
                            href={item.href}
                            aria-current={isCurrent ? "page" : undefined}
                            onClick={() => {
                              closeMenu();
                              closeSearch();
                            }}
                            className="mobile-nav-link"
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </nav>

              <button
                type="button"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="site-search-panel"
                className="nav-icon-button"
                onClick={toggleSearch}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay fixed inset-x-0 top-16 bottom-0 z-50 bg-primary-12/90 backdrop-blur-lg ${
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
        inert={!isPanelOpen}
        aria-hidden={!isPanelOpen}
        className={`nav-panel fixed inset-x-0 top-16 z-[51] overflow-hidden bg-background/98 ${
          isPanelOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ height: `${panelHeight}px` }}
        onMouseEnter={clearHoverTimers}
        onMouseLeave={scheduleClose}
      >
        <div className="relative">
          {activeSnapshot ? (
            <NavMenuLayer
              snapshot={activeSnapshot}
              measurementRef={setActiveContentNode}
              className={isCrossfading ? "nav-menu-content-enter" : ""}
              onNavigate={closeMenu}
            />
          ) : null}
          {exitingSnapshot ? (
            <NavMenuLayer
              snapshot={exitingSnapshot}
              className="nav-menu-content-exit absolute inset-0 z-10"
              isInteractive={false}
              onNavigate={closeMenu}
            />
          ) : null}
        </div>
      </div>

      <SiteSearchPanel
        open={searchOpen}
        query={searchQuery}
        results={searchResults}
        inputRef={searchInputRef}
        resultsRef={searchResultsRef}
        onQueryChange={setSearchQuery}
        onClose={closeSearch}
      />
    </div>
  );
}
