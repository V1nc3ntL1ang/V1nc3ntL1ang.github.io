"use client";

import Link from "next/link";
import { ArrowUpRightIcon, CloseIcon } from "@/components/ui-icons";
import { useEffect, useRef, type RefObject } from "react";
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
                  <ArrowUpRightIcon />
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
                      <ArrowUpRightIcon />
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
  const layerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const layer = layerRef.current;
    if (!panel || !layer) return;

    const opener = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("header, main, footer"),
      (element) => ({ element, inert: element.inert }),
    );
    const previousOverflow = document.documentElement.style.overflow;
    const viewport = window.visualViewport;
    restoreFocusRef.current = true;

    const updateViewport = () => {
      layer.style.setProperty("--search-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      layer.style.setProperty("--search-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };

    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !panel.contains(event.target)) {
        inputRef.current?.focus({ preventScroll: true });
      }
    };

    updateViewport();
    inputRef.current?.focus({ preventScroll: true });
    background.forEach(({ element }) => { element.inert = true; });
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("focusin", containFocus);
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);

    return () => {
      document.removeEventListener("focusin", containFocus);
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      document.documentElement.style.overflow = previousOverflow;

      if (restoreFocusRef.current) {
        const target = opener && opener !== document.body && opener.isConnected
          ? opener
          : Array.from(document.querySelectorAll<HTMLButtonElement>("button[aria-controls='site-search-panel']"))
              .find((button) => button.getClientRects().length > 0);
        target?.focus({ preventScroll: true });
      }
    };
  }, [open, inputRef]);

  return (
    <div
      ref={layerRef}
      inert={!open}
      aria-hidden={!open}
      className={`nav-search-layer fixed inset-x-0 z-[52] transition-opacity duration-200 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="site-shell flex min-h-0 py-6">
        <div
          ref={panelRef}
          id="site-search-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Search the site"
          className="nav-search-panel mx-auto max-w-[42rem]"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;

            const controls = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>("input, button, a[href]"),
            ).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
            const first = controls[0];
            const last = controls.at(-1);
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-border-subtle px-5 py-4">
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
              className="nav-search-input min-w-0"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="nav-icon-button -my-2 -mr-2 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            ref={resultsRef}
            className="nav-search-results min-h-0 max-h-[22rem] overflow-y-auto p-3"
          >
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="nav-group-title">Search</p>
              <p className="hover-navigation text-ui tracking-[0.02em] text-foreground-44">
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
                      onClick={() => {
                        restoreFocusRef.current = false;
                        onClose();
                      }}
                    >
                      <div>
                        <p className="nav-search-meta">{item.section}</p>
                        <p className="mt-1 text-body leading-6 font-medium text-foreground">
                          {highlightMatch(item.label, normalizedQuery)}
                        </p>
                        <p className="mt-1 text-ui leading-6 text-foreground-60">
                          {highlightMatch(item.snippet, normalizedQuery)}
                        </p>
                      </div>
                      <span aria-hidden="true" className="nav-search-link-arrow">
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-2 py-4 text-ui leading-6 text-foreground-44">
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
