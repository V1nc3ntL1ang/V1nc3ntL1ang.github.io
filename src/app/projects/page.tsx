import { projects } from "@/lib/site-content";

const visibleProjects = projects.filter((project) => !project.hidden);

export default function ProjectsPage() {
  return (
    <div className="pb-24">
      <section id="overview" className="site-shell py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 text-[clamp(2.75rem,8vw,5rem)] leading-[0.94] tracking-[-0.05em] font-medium text-foreground">
            A clean grid for actual work, speculative ideas, and future drafts.
          </h1>
          <p className="mt-8 text-lg leading-8 tracking-[-0.01em] text-foreground-44">
            These are intentionally simple placeholders. We can keep real work,
            experimental work, and hidden work in one content file and decide
            later what appears in navigation or on the homepage.
          </p>
        </div>
      </section>

      <section id="featured" className="site-shell py-6 md:py-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              id={project.slug}
              key={project.slug}
              className="card-surface rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-border-strong"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">{project.year}</p>
                <span className="rounded-full border border-border-subtle px-3 py-1 text-xs text-foreground-44">
                  {project.status}
                </span>
              </div>
              <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em] text-foreground">
                {project.title}
              </h2>
              <p className="mt-4 text-sm leading-7 tracking-[-0.01em] text-foreground-44">
                {project.summary}
              </p>
              <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-border-subtle">
                <div className="h-56 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(54,166,215,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))]" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-3 py-1 text-xs text-foreground-80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-foreground-60">{project.note}</p>
                <span className="text-sm text-foreground-80">Details later</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
