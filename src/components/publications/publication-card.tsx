import { RevealGroup } from "@/components/reveal";
import { tagClassNames } from "@/lib/publication-view";
import type { Publication } from "@/lib/publications";

function PaperIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-[1.125rem] shrink-0">
      <path
        d="M3.5 4.5h2.25A4.25 4.25 0 0 1 10 8.75V16a4.25 4.25 0 0 0-4.25-4.25H3.5V4.5Zm13 0h-2.25A4.25 4.25 0 0 0 10 8.75V16a4.25 4.25 0 0 1 4.25-4.25h2.25V4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-[1.125rem] shrink-0">
      <rect x="2.75" y="4" width="14.5" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6 8 2.25 2L6 12m5 0h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-[1.125rem] shrink-0">
      <path d="m8.4 12.35 4.85-5.2a1.9 1.9 0 0 1 2.75 2.6l-4.9 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.55 12.15a3.15 3.15 0 0 1 .15 4.05c-1.15 1.2-2.9 1.05-4.35 1.05.05-1.4-.1-3.15 1.05-4.3a3.05 3.05 0 0 1 3.15-.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.15 7.45 6.4 5.7a1.75 1.75 0 0 0-2.45 2.5l2 1.95m6.9 2.7 1.7 1.75c.5.5.65 1.2.4 1.8l-3.25-.45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const actionClassName =
  "inline-flex h-9 min-w-[6.75rem] items-center justify-center gap-2 rounded-full bg-white/[0.12] px-4 text-foreground transition-colors hover:bg-white/[0.22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground";

export function PublicationCard({
  publication,
  revealDelay,
}: {
  publication: Publication;
  revealDelay: number;
}) {
  const tags = [
    { label: publication.venueShort, className: tagClassNames[0] },
    { label: publication.year.toString(), className: tagClassNames[1] },
    ...(publication.distinction
      ? [{ label: publication.distinction, className: tagClassNames[2] }]
      : []),
  ];

  return (
    <RevealGroup threshold={0.08} rootMargin="0px 0px 8% 0px">
      <article
        id={publication.id}
        className="reveal-group-item reveal-group-item-card card-surface w-full scroll-mt-24 rounded-[1.5rem] p-6 md:p-8"
        style={{
          animationDelay: `${revealDelay}ms`,
          animationDuration: "520ms",
        }}
      >
        <h2 className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.2] font-medium tracking-[-0.025em] text-foreground">
          {publication.title}
        </h2>
        <p className="mt-5 text-sm leading-7 text-foreground-80">
          {publication.authors}
        </p>
        <p className="mt-2 text-sm leading-7 text-foreground-60">
          {publication.venue}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
          <div className="flex flex-wrap items-center gap-2.5">
            <a href={publication.paperUrl} target="_blank" rel="noreferrer" className={actionClassName}>
              <PaperIcon />
              Paper
            </a>
            <a href={publication.codeUrl} target="_blank" rel="noreferrer" className={actionClassName}>
              <CodeIcon />
              Code
            </a>
            {publication.projectUrl ? (
              <a href={publication.projectUrl} target="_blank" rel="noreferrer" className={actionClassName}>
                <ProjectIcon />
                Project
              </a>
            ) : null}
          </div>
          <div className="ml-auto flex flex-wrap justify-end gap-2">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full border px-3 py-1 text-xs leading-5 font-medium ${tag.className}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </article>
    </RevealGroup>
  );
}
