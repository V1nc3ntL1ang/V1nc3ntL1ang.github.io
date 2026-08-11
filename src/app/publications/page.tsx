"use client";

import { useEffect, useState } from "react";
import { PublicationCard } from "@/components/publications/publication-card";
import { PublicationFilters } from "@/components/publications/publication-filters";
import { PublicationToolbar } from "@/components/publications/publication-toolbar";
import { RevealGroup } from "@/components/reveal";
import {
  comparePublications,
  createAllSelectedFilters,
  createEmptyFilters,
  totalFilterOptionCount,
  type FilterGroupKey,
  type SelectedFilters,
  type SortValue,
} from "@/lib/publication-view";
import { publications } from "@/lib/publications";

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortValue>("newest");
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>(createAllSelectedFilters);
  const [initialRevealComplete, setInitialRevealComplete] = useState(false);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("en");
  const selectedFilterCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0,
  );
  const visiblePublications = publications
    .filter((publication) => {
      const matchesVenue = selectedFilters.venues.includes(
        publication.venueShort,
      );
      const matchesYear = selectedFilters.years.includes(
        publication.year.toString(),
      );
      if (!matchesVenue || !matchesYear) return false;
      if (!normalizedQuery) return true;

      return [
        publication.title,
        publication.authors,
        publication.venue,
        publication.venueShort,
        publication.year.toString(),
        publication.distinction ?? "",
      ]
        .join(" ")
        .toLocaleLowerCase("en")
        .includes(normalizedQuery);
    })
    .sort((first, second) =>
      comparePublications(first, second, selectedSort),
    );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setInitialRevealComplete(true);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleFilter = (group: FilterGroupKey, value: string) => {
    setSelectedFilters((currentFilters) => {
      const currentValues = currentFilters[group];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];
      return { ...currentFilters, [group]: nextValues };
    });
  };

  const selectAllFilters = () => {
    setSelectedFilters((currentFilters) => {
      const currentFilterCount = Object.values(currentFilters).reduce(
        (count, values) => count + values.length,
        0,
      );
      return currentFilterCount === totalFilterOptionCount
        ? currentFilters
        : createAllSelectedFilters();
    });
  };

  const clearFilters = () => {
    setSelectedFilters((currentFilters) =>
      Object.values(currentFilters).some((values) => values.length > 0)
        ? createEmptyFilters()
        : currentFilters,
    );
  };

  return (
    <div className="pb-20">
      <section
        id="overview"
        className="site-shell pt-14 pb-10 md:pt-16 md:pb-12"
      >
        <RevealGroup mode="load" className="w-full">
          <div
            role="status"
            className="reveal-group-item reveal-group-item-lite mb-10 rounded-xl border border-[#e7c45a]/70 bg-[#e7c45a]/10 px-4 py-4 text-[#f0d77b] md:mb-12 md:px-5"
            style={{ animationDelay: "30ms" }}
          >
            <p className="text-lg leading-7 font-semibold text-[#f6dc7d]">
              Note:
            </p>
            <p className="mt-1 text-base leading-7 text-[#f0d77b]">
              Impressive detective work—you found this page before it was
              ready! It’s mostly placeholders for now, but I really hope to
              fill it with my own work over time.
            </p>
          </div>
          <p
            className="reveal-group-item reveal-group-item-lite eyebrow"
            style={{ animationDelay: "90ms" }}
          >
            Publications
          </p>
          <h1
            className="reveal-group-item reveal-group-item-lite mt-4 text-[clamp(2.5rem,5vw,3rem)] leading-none font-medium tracking-[-0.04em] text-foreground"
            style={{ animationDelay: "150ms" }}
          >
            Papers, Preprints, and Selected Research
          </h1>
          <p
            className="reveal-group-item reveal-group-item-lite mt-5 text-base leading-7 tracking-[-0.01em] text-foreground-44"
            style={{ animationDelay: "210ms" }}
          >
            A collection of my academic work.
          </p>
        </RevealGroup>
      </section>

      <section id="publications" className="site-shell pb-6 md:pb-8">
        <RevealGroup mode="load">
          <div
            className="reveal-group-item reveal-group-item-lite relative z-40"
            style={{ animationDelay: "190ms", animationDuration: "440ms" }}
          >
            <PublicationToolbar
              searchQuery={searchQuery}
              selectedSort={selectedSort}
              onSearchChange={setSearchQuery}
              onSortChange={setSelectedSort}
            />
          </div>
        </RevealGroup>
        <p aria-live="polite" className="sr-only">
          {visiblePublications.length} publication
          {visiblePublications.length === 1 ? "" : "s"} shown
        </p>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            {visiblePublications.length > 0 ? (
              <div className="space-y-4">
                {visiblePublications.map((publication, index) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    revealDelay={
                      !initialRevealComplete && index < 3
                        ? 300 + index * 60
                        : 0
                    }
                  />
                ))}
              </div>
            ) : (
              <RevealGroup>
                <div className="reveal-group-item reveal-group-item-card card-surface rounded-[1.5rem] px-6 py-16 text-center md:px-8">
                  <p className="text-base text-foreground-60">
                    {normalizedQuery && selectedFilterCount > 0
                      ? "No publications match the current search and filters."
                      : normalizedQuery
                        ? `No publications match “${searchQuery.trim()}”.`
                        : "No publications match the selected filters."}
                  </p>
                </div>
              </RevealGroup>
            )}
          </div>
          <PublicationFilters
            selectedFilters={selectedFilters}
            onToggle={toggleFilter}
            onClear={clearFilters}
            onSelectAll={selectAllFilters}
          />
        </div>
      </section>
    </div>
  );
}
