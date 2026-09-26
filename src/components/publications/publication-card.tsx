import { CodeIcon, PaperIcon, ProjectIcon } from "@/components/ui-icons";
import { RevealGroup } from "@/components/reveal";
import { tagClassNames } from "@/lib/publication-view";
import type { Publication } from "@/lib/publications";

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
        <h2 className="text-title leading-[1.2] font-medium tracking-[-0.025em] text-foreground">
          {publication.title}
        </h2>
        <p className="mt-5 text-ui leading-7 text-foreground-80">
          {publication.authors}
        </p>
        <p className="mt-2 text-ui leading-7 text-foreground-60">
          {publication.venue}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-ui font-medium">
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
                className={`rounded-full border px-3 py-1 text-ui leading-5 font-medium ${tag.className}`}
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
