"use client";

import Link from "next/link";
import type { RefObject } from "react";
import {
  highlightMatch,
  type MenuSnapshot,
  type SearchResult,
} from "@/components/site-nav/site-nav-content";

export function NavMenuLayer({
  snapshot,
  className = "",
  isInteractive = true,
  measurementRef,
  onNavigate,
}: {
  snapshot: MenuSnapshot;
  className?: string;
  isInteractive?: boolean;
  measurementRef?: (node: HTMLDivElement | null) => void;
  onNavigate: () => void;
}) {
  return (
    <div
      ref={measurementRef}
      inert={!isInteractive}
      className={`nav-menu-layer site-shell flex items-start gap-20 py-10 ${className}`}
      aria-hidden={isInteractive ? undefined : true}
    >
      <section className="w-fit shrink-0 space-y-4">
        <h2 className="nav-group-title">{snapshot.menu.eyebrow}</h2>
        <ul className="space-y-4">
          {snapshot.menu.primary.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="nav-primary-link"
                onClick={onNavigate}
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
                    onClick={onNavigate}
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
}

export function SiteSearchPanel({
  open,
  query,
  results,
  inputRef,
  resultsRef,
  onQueryChange,
  onClose,
}: {
  open: boolean;
  query: string;
  results: SearchResult[];
  inputRef: RefObject<HTMLInputElement | null>;
  resultsRef: RefObject<HTMLDivElement | null>;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-x-0 top-16 z-[52] transition-opacity duration-200 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="site-shell py-6">
        <div
          id="site-search-panel"
          role="search"
          className="nav-search-panel mx-auto max-w-[42rem]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-border-subtle px-5 py-4">
            <label htmlFor="site-search-input" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search-input"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search the site"
              className="nav-search-input"
            />
          </div>

          <div
            ref={resultsRef}
            className="nav-search-results max-h-[22rem] overflow-y-auto p-3"
          >
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="nav-group-title">Search</p>
              <p className="text-xs tracking-[0.02em] text-foreground-44">
                Press / to open, Esc to close
              </p>
            </div>

            <ul className="space-y-1">
              {results.length > 0 ? (
                results.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="nav-search-link"
                      onClick={onClose}
                    >
                      <div>
                        <p className="nav-search-meta">{item.section}</p>
                        <p className="mt-1 text-[1rem] leading-6 font-medium text-foreground">
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
  );
}
