"use client";

import { RevealGroup } from "@/components/reveal";
import {
  filterGroups,
  type FilterGroupKey,
  type SelectedFilters,
} from "@/lib/publication-view";

export function PublicationFilters({
  selectedFilters,
  onToggle,
  onClear,
  onSelectAll,
}: {
  selectedFilters: SelectedFilters;
  onToggle: (group: FilterGroupKey, value: string) => void;
  onClear: () => void;
  onSelectAll: () => void;
}) {
  return (
    <RevealGroup className="hidden lg:sticky lg:top-24 lg:block">
      <aside
        id="publication-filters"
        aria-label="Publication filters"
        className="reveal-group-item reveal-group-item-card rounded-[1.5rem] border border-border-subtle p-5"
        style={{ animationDelay: "120ms" }}
      >
        <div className="border-b border-border-subtle pb-4">
          <h2 className="text-base font-medium text-foreground">
            Filter by tags
          </h2>
        </div>

        <div className="space-y-6 pt-5">
          {filterGroups.map((group) => (
            <fieldset key={group.key}>
              <legend className="mb-3 text-xs font-medium tracking-[0.12em] text-foreground-44 uppercase">
                {group.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const isSelected =
                    selectedFilters[group.key].includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => onToggle(group.key, option)}
                      className={`rounded-full border px-3 py-1 text-xs leading-5 font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                        isSelected
                          ? `${group.selectedClassName} hover:brightness-125`
                          : "border-border-subtle bg-white/[0.04] text-foreground-60 hover:border-border-strong hover:bg-white/[0.08] hover:text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-sm text-foreground-60 underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-foreground-60 underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            Clear all
          </button>
        </div>
      </aside>
    </RevealGroup>
  );
}
