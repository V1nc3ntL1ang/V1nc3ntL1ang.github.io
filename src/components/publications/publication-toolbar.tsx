"use client";

import { useEffect, useRef, useState } from "react";
import {
  sortOptions,
  type SortValue,
} from "@/lib/publication-view";

function SortChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4 transition-transform duration-200 group-hover/sort:rotate-180 group-focus-within/sort:rotate-180"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
      <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12.75 12.75 3.75 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClearSearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
      <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PublicationToolbar({
  searchQuery,
  selectedSort,
  onSearchChange,
  onSortChange,
}: {
  searchQuery: string;
  selectedSort: SortValue;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortValue) => void;
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRootRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const suppressSortFocusOpenRef = useRef(false);
  const openedAutomaticallyRef = useRef(false);

  useEffect(() => {
    if (!isSortOpen) return;

    const closeSortOnOutsidePointer = (event: PointerEvent) => {
      if (!sortRootRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeSortOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeSortOnOutsidePointer);
  }, [isSortOpen]);

  const openAutomatically = () => {
    openedAutomaticallyRef.current = true;
    setIsSortOpen(true);
  };

  const toggleFromButton = () => {
    if (openedAutomaticallyRef.current) {
      openedAutomaticallyRef.current = false;
      return;
    }
    setIsSortOpen((current) => !current);
  };

  const moveSortSelection = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const isNext = event.key === "ArrowDown" || event.key === "ArrowRight";
    const isPrevious = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!isNext && !isPrevious) return;

    event.preventDefault();
    const direction = isNext ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + sortOptions.length) % sortOptions.length;
    const nextOption = sortOptions[nextIndex];
    onSortChange(nextOption.value);
    window.requestAnimationFrame(() => {
      sortRootRef.current
        ?.querySelector<HTMLInputElement>(`input[value="${nextOption.value}"]`)
        ?.focus();
    });
  };

  return (
    <div aria-label="Publication tools" className="flex flex-wrap items-center justify-end gap-3 text-sm">
      <div
        ref={sortRootRef}
        className="group/sort relative"
        onMouseEnter={openAutomatically}
        onMouseLeave={() => {
          openedAutomaticallyRef.current = false;
          setIsSortOpen(false);
        }}
        onFocus={() => {
          if (
            document.activeElement === sortButtonRef.current &&
            !suppressSortFocusOpenRef.current &&
            !isSortOpen
          ) {
            openAutomatically();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            openedAutomaticallyRef.current = false;
            setIsSortOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            openedAutomaticallyRef.current = false;
            suppressSortFocusOpenRef.current = true;
            setIsSortOpen(false);
            window.requestAnimationFrame(() => {
              sortButtonRef.current?.focus();
              suppressSortFocusOpenRef.current = false;
            });
          }
        }}
      >
        <button
          ref={sortButtonRef}
          type="button"
          aria-expanded={isSortOpen}
          aria-controls="publication-sort-options"
          title="Sort publications"
          onClick={toggleFromButton}
          className="inline-flex h-9 items-center gap-2 px-2 text-foreground transition-colors hover:text-foreground-60 focus-visible:text-foreground-60 focus-visible:outline-none"
        >
          <span>Sort</span>
          <SortChevron />
        </button>
        <div
          id="publication-sort-options"
          inert={!isSortOpen}
          aria-hidden={!isSortOpen}
          style={{
            transform: isSortOpen
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, -3px, 0)",
            transitionDuration: "80ms",
          }}
          className={`absolute top-full right-0 z-30 w-72 pt-2 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${
            isSortOpen ? "visible" : "invisible pointer-events-none"
          }`}
        >
          <fieldset className="rounded-xl border border-white/[0.08] bg-[#202020] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.38)]">
            <legend className="sr-only">Sort publications</legend>
            {sortOptions.map((option, index) => (
              <label
                key={option.value}
                className="group/option flex w-full cursor-pointer items-center gap-3 py-1.5 text-left text-base text-foreground-80 transition-colors hover:text-foreground"
              >
                <input
                  type="radio"
                  name="publication-sort"
                  value={option.value}
                  checked={option.value === selectedSort}
                  onChange={() => onSortChange(option.value)}
                  onKeyDown={(event) => moveSortSelection(event, index)}
                  className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-foreground-44 bg-transparent text-foreground transition-colors checked:border-foreground checked:bg-[radial-gradient(circle,currentColor_0_35%,transparent_40%)] hover:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#202020]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
        </div>
      </div>

      <div className="inline-flex h-9 w-full items-center gap-2 rounded-md border border-border-subtle px-3 text-foreground-44 transition-colors focus-within:border-border-strong focus-within:text-foreground-60 sm:w-56">
        <SearchIcon />
        <label htmlFor="publication-search" className="sr-only">
          Search publications
        </label>
        <input
          id="publication-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          className="publication-search-input min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-foreground-44"
        />
        {searchQuery ? (
          <button
            type="button"
            aria-label="Clear search"
            title="Clear search"
            onClick={() => onSearchChange("")}
            className="flex size-5 shrink-0 items-center justify-center rounded-full text-foreground-44 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
          >
            <ClearSearchIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}
