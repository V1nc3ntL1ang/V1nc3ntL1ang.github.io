import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/reveal";
import { education, focusAreas, profile } from "@/lib/site-content";

const visibleFocusAreas = focusAreas.filter((item) => !item.hidden);
const visibleEducation = education.filter((item) => !item.hidden);
const aboutHeroCopy = (
  <>
    I study Data Science and Big Data Technology at South China University of
    Technology, where I am fortunate to work under the supervision of{" "}
    <a
      className="entity-inline-link"
      href="https://xw-hu.github.io/"
      target="_blank"
      rel="noreferrer"
    >
      Prof. Xiaowei Hu
      <span
        aria-hidden="true"
        className="link-arrow text-[0.85em] leading-none"
      >
        {"\u2197"}
      </span>
    </a>
    . I&apos;m interested in artificial intelligence, especially multi-agent
    systems, open-ended learning, and multimodal large language model systems.
  </>
);

type InterestVisualStyle = "ambient" | "quiet" | "etched";
type VisibleFocusArea = (typeof visibleFocusAreas)[number];

function SignalPath({
  className = "",
  d,
}: {
  className?: string;
  d: string;
}) {
  const lineClassName = `interest-line${className ? ` ${className}` : ""}`;
  const runnerClassName = `interest-signal-runner${className ? ` ${className}` : ""}`;

  return (
    <>
      <path className={lineClassName} d={d} />
      <path className={runnerClassName} d={d} pathLength={1} />
    </>
  );
}

function SignalLoop({
  className = "",
  d,
}: {
  className?: string;
  d: string;
}) {
  const runnerClassName = `interest-loop-runner${className ? ` ${className}` : ""}`;

  return <path className={runnerClassName} d={d} pathLength={1} />;
}

function InterestVisual({
  index,
  style,
}: {
  index: number;
  style: InterestVisualStyle;
}) {
  return (
    <div
      className={`interest-visual interest-visual-${style} interest-visual-tone-${index + 1}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 220" className="interest-visual-svg">
        {index === 0 ? (
          <circle className="interest-accent-ring" cx="160" cy="110" r="58" />
        ) : null}
        {index === 0 ? (
          <g className="interest-verb-mark">
            <SignalPath className="interest-runner-phase-1" d="M150 103 111 75" />
            <SignalPath className="interest-line-soft interest-runner-phase-2" d="M170 103 209 75" />
            <SignalPath className="interest-line-soft interest-runner-phase-3" d="M170 117 209 145" />
            <SignalPath className="interest-line-faint interest-runner-phase-4" d="M150 117 111 145" />
            <circle className="interest-node interest-node-strong" cx="160" cy="110" r="12" />
            <circle className="interest-node" cx="104" cy="70" r="9" />
            <circle className="interest-node" cx="216" cy="70" r="9" />
            <circle className="interest-node" cx="216" cy="150" r="9" />
            <circle className="interest-node" cx="104" cy="150" r="9" />
            <circle className="interest-node interest-node-small" cx="160" cy="110" r="4" />
          </g>
        ) : index === 1 ? (
          <g className="interest-verb-mark">
            <rect className="interest-shape" x="104" y="86" width="112" height="52" rx="26" />
            <rect className="interest-shape interest-shape-soft" x="121" y="70" width="112" height="52" rx="26" />
            <rect className="interest-shape interest-shape-faint" x="87" y="102" width="112" height="52" rx="26" />
            <SignalLoop className="interest-runner-phase-2" d="M130 86 H190 C204.4 86 216 97.6 216 112 C216 126.4 204.4 138 190 138 H130 C115.6 138 104 126.4 104 112 C104 97.6 115.6 86 130 86 Z" />
            <SignalLoop className="interest-line-soft interest-runner-phase-4" d="M147 70 H207 C221.4 70 233 81.6 233 96 C233 110.4 221.4 122 207 122 H147 C132.6 122 121 110.4 121 96 C121 81.6 132.6 70 147 70 Z" />
            <SignalLoop className="interest-line-faint interest-runner-phase-1" d="M113 102 H173 C187.4 102 199 113.6 199 128 C199 142.4 187.4 154 173 154 H113 C98.6 154 87 142.4 87 128 C87 113.6 98.6 102 113 102 Z" />
          </g>
        ) : (
          <g className="interest-verb-mark">
            <SignalPath className="interest-runner-phase-1" d="M96 78 H137 C171 78 183 110 214 110" />
            <SignalPath className="interest-runner-phase-3" d="M96 110 H214" />
            <SignalPath className="interest-runner-phase-2" d="M96 142 H137 C171 142 183 110 214 110" />
            <rect className="interest-pill" x="76" y="67" width="54" height="22" rx="11" />
            <rect className="interest-pill" x="76" y="99" width="54" height="22" rx="11" />
            <rect className="interest-pill" x="76" y="131" width="54" height="22" rx="11" />
            <rect className="interest-shape" x="214" y="88" width="46" height="44" rx="15" />
            <circle className="interest-node interest-node-strong" cx="237" cy="110" r="10" />
            <circle className="interest-node interest-node-small" cx="237" cy="110" r="4" />
          </g>
        )}
      </svg>
    </div>
  );
}

function InterestCopy({
  item,
  index,
  compact = false,
}: {
  item: VisibleFocusArea;
  index: number;
  compact?: boolean;
}) {
  return (
    <div className={`interest-copy${compact ? " interest-copy-compact" : ""}`}>
      <p className="interest-index">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="interest-title">{item.title}</h3>
      <p className="interest-description">{item.description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      <section
        id="overview"
        className="site-shell flex min-h-[calc(100svh-var(--header-h))] items-center py-12 md:py-16"
      >
        <RevealGroup
          mode="load"
          as="div"
          className="grid w-full gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-center"
        >
          <div
            className="reveal-group-item max-w-4xl"
            style={{ transitionDelay: "40ms" }}
          >
            <p className="eyebrow">Overview</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.98] tracking-[-0.038em] font-medium text-foreground">
              Undergraduate at SCUT, majoring in Data Science and Big Data
              Technology
            </h1>
            <p className="mt-5 max-w-[42rem] text-[17px] leading-8 tracking-[-0.008em] text-foreground-70 md:text-lg md:leading-8">
              {aboutHeroCopy}
            </p>
          </div>

          <aside
            className="reveal-group-item card-surface rounded-[2rem] p-6 md:p-8"
            style={{ transitionDelay: "180ms" }}
          >
            <p className="eyebrow">Facts & Contact</p>
            <div className="mt-6 divide-y divide-border-subtle">
              <div className="py-4 first:pt-0">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-44">
                  Name
                </p>
                <p className="mt-2 text-[1.05rem] font-medium leading-7 text-foreground">
                  {profile.name} / {profile.nickname}
                </p>
              </div>
              <div className="py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-44">
                  Affiliation
                </p>
                <div className="mt-2 grid gap-1 text-[1.05rem] font-medium leading-7 text-foreground">
                  <a
                    className="entity-subtle-link w-fit"
                    href="https://www2.scut.edu.cn/ft_en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    School of Future Technology
                    <span
                      aria-hidden="true"
                      className="link-arrow text-sm leading-none"
                    >
                      ↗
                    </span>
                  </a>
                  <a
                    className="entity-subtle-link w-fit"
                    href="https://www.scut.edu.cn/en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    South China University of Technology (SCUT)
                    <span
                      aria-hidden="true"
                      className="link-arrow text-sm leading-none"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
              <div className="py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-44">
                  Program
                </p>
                <p className="mt-2 text-[1.05rem] font-medium leading-7 text-foreground">
                  Data Science and Big Data Technology
                </p>
              </div>
              <div className="py-4 last:pb-0">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-44">
                  Email & GitHub
                </p>
                <div className="mt-2 grid gap-1 text-[1.05rem] font-medium leading-7 text-foreground">
                  <a
                    className="entity-subtle-link w-fit"
                    href={`mailto:${profile.email}`}
                  >
                    {profile.email}
                    <span
                      aria-hidden="true"
                      className="link-arrow text-sm leading-none"
                    >
                      ↗
                    </span>
                  </a>
                  <a
                    className="entity-subtle-link w-fit"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                    <span
                      aria-hidden="true"
                      className="link-arrow text-sm leading-none"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </RevealGroup>
      </section>

      <section
        id="research"
        className="site-shell flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-[3.5rem] md:py-[5rem]"
      >
        <RevealGroup as="div">
          <div
            className="reveal-group-item mb-10 max-w-3xl"
            style={{ transitionDelay: "40ms" }}
          >
            <p className="eyebrow">Research interests</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.98] tracking-[-0.038em] font-medium text-foreground">
              Current interests
            </h2>
            <p className="mt-5 max-w-[40rem] text-[17px] leading-8 tracking-[-0.008em] text-foreground-70 md:text-lg md:leading-8">
              The areas that currently hold most of my academic attention.
            </p>
          </div>
          <div className="interest-card-grid interest-card-grid-art">
            {visibleFocusAreas.map((item, index) => (
              <article
                key={`interest-final-${item.title}`}
                className="interest-card interest-card-ambient interest-card-art interest-card-motion-window interest-card-motion-signal"
                style={{ transitionDelay: `${140 + index * 90}ms` }}
              >
                <InterestVisual index={index} style="ambient" />
                <InterestCopy item={item} index={index} />
              </article>
            ))}
          </div>
        </RevealGroup>
      </section>

      <section
        id="education"
        className="site-shell flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-[2.5rem] md:py-[3.5rem]"
      >
        <div>
          <Reveal className="mb-8 max-w-3xl" mode="in-view">
            <p className="eyebrow">Education</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.98] tracking-[-0.038em] font-medium text-foreground">
              Academic background
            </h2>
            <p className="mt-5 max-w-[42rem] text-[17px] leading-8 tracking-[-0.008em] text-foreground-70 md:text-lg md:leading-8">
              Academic environments that shaped how I perceive, think, and act.
            </p>
          </Reveal>
          <RevealGroup
            as="div"
            className="divide-y divide-border-subtle border-y border-border-subtle"
          >
            {visibleEducation.map((item, index) => (
              <article
                key={`education-${item.title}`}
                className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_15rem] md:items-center md:gap-6 md:py-5"
              >
                <div
                  className="reveal-group-item grid gap-4 md:grid-cols-[9.5rem_minmax(0,1fr)] md:items-center md:gap-6"
                  style={{ transitionDelay: `${120 + index * 110}ms` }}
                >
                  <div className="md:pt-1">
                    <p className="education-period">{item.period}</p>
                    <p className="mt-3 text-[17px] leading-7 text-foreground">
                      {item.location}
                    </p>
                  </div>

                  <div className="max-w-3xl md:pt-0.5">
                    <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-foreground">
                      <a
                        className="entity-title-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                        <span
                          aria-hidden="true"
                          className="link-arrow text-[0.85em] leading-none"
                        >
                          ↗
                        </span>
                      </a>
                    </h3>
                    <p className="mt-2 text-[17px] leading-7 text-foreground-70">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 max-w-3xl text-[17px] leading-7 tracking-[-0.008em] text-foreground-60">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div
                  className="reveal-group-item reveal-group-item-lite md:justify-self-end"
                  style={{ transitionDelay: `${180 + index * 110}ms` }}
                >
                  <div className="relative aspect-[1.14/0.88] w-full overflow-hidden rounded-[1.45rem] bg-background-soft md:w-[15rem]">
                    <Image
                      src={item.media.src}
                      alt={item.media.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: item.media.position }}
                      sizes="(max-width: 768px) 100vw, 288px"
                      loading="eager"
                    />
                    <div
                      className={`absolute inset-0 ${item.media.overlayClassName}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
