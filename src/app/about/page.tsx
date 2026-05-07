import Image from "next/image";
import { OpenEndedCurvedRunner } from "@/components/open-ended-curved-runner";
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

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.864 10.912c.575.107.786-.25.786-.556 0-.274-.01-1-.016-1.962-3.2.696-3.877-1.542-3.877-1.542-.523-1.328-1.277-1.682-1.277-1.682-1.044-.713.079-.698.079-.698 1.155.081 1.763 1.186 1.763 1.186 1.026 1.759 2.692 1.251 3.348.956.104-.743.402-1.251.731-1.539-2.554-.29-5.24-1.277-5.24-5.684 0-1.255.448-2.282 1.183-3.086-.119-.29-.513-1.459.112-3.042 0 0 .965-.309 3.162 1.179a10.95 10.95 0 0 1 5.758 0c2.195-1.488 3.159-1.179 3.159-1.179.627 1.583.233 2.752.114 3.042.737.804 1.181 1.831 1.181 3.086 0 4.418-2.69 5.391-5.254 5.675.413.356.781 1.058.781 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.669.791.555A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6.5h16c.552 0 1 .448 1 1v9c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1v-9c0-.552.448-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 8 8 5 8-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OPEN_ENDED_INFINITY_LOOP =
  "C80 92 80 128 104 138 C123.5 146.5 143.5 133 160 110 C176.5 87 196.5 73.5 216 82 C240 92 240 128 216 138 C196.5 146.5 176.5 133 160 110 C143.5 87 123.5 73.5 104 82";
const OPEN_ENDED_INFINITY_PATH = `M104 82 ${OPEN_ENDED_INFINITY_LOOP} Z`;

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
          <g
            className="interest-verb-mark open-ended-reference-mark"
            transform="translate(160 110) scale(1.08) translate(-160 -110)"
          >
            <path className="open-ended-reference-edge" d={OPEN_ENDED_INFINITY_PATH} fill="none" />
            <OpenEndedCurvedRunner d={OPEN_ENDED_INFINITY_PATH} />
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
                  {profile.displayName}
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
              <div className="py-4 last:pb-0">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-44">
                  Email & GitHub
                </p>
                <div className="mt-2 grid gap-1 text-[1.05rem] font-medium leading-7 text-foreground">
                  <a
                    className="entity-subtle-link flex w-fit max-w-full items-center gap-5"
                    href={`mailto:${profile.email}`}
                  >
                    <MailIcon className="shrink-0 text-foreground-44" />
                    <span className="min-w-0 break-all">{profile.email}</span>
                    <span
                      aria-hidden="true"
                      className="link-arrow shrink-0 text-sm leading-none"
                    >
                      ↗
                    </span>
                  </a>
                  <a
                    className="entity-subtle-link flex w-fit max-w-full items-center gap-5"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon className="shrink-0 text-foreground-44" />
                    <span className="min-w-0 break-all">
                      github.com/V1nc3ntL1ang
                    </span>
                    <span
                      aria-hidden="true"
                      className="link-arrow shrink-0 text-sm leading-none"
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
                className="reveal-group-item reveal-group-item-card interest-card interest-card-ambient interest-card-art interest-card-motion-window interest-card-motion-signal"
                style={{ animationDelay: `${140 + index * 90}ms` }}
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
