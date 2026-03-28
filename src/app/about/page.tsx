import Image from "next/image";
import { HomeFocusVisual } from "@/components/home-focus-visual";
import { RevealGroup } from "@/components/reveal";
import { education, focusAreas, profile } from "@/lib/site-content";

const visibleFocusAreas = focusAreas.filter((item) => !item.hidden);
const visibleEducation = education.filter((item) => !item.hidden);
const aboutHeroCopy =
  "I study Data Science and Big Data Technology at South China University of Technology. My current interests center on multi-agent systems, open-ended learning, and multimodal large language model systems.";
const educationMedia = [
  {
    src: "/education/sms-campus-main.jpg",
    alt: "Shenzhen Middle School campus",
    position: "50% 52%",
    imageClassName: "brightness-[0.82] saturate-[0.74] contrast-[1.02]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(92,118,156,0.07),rgba(8,10,16,0.2))]"
  },
  {
    src: "/education/scut-campus-main.jpg",
    alt: "South China University of Technology Guangzhou International Campus",
    position: "50% 54%",
    imageClassName: "brightness-[0.76] saturate-[0.72] contrast-[1.02]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(92,118,156,0.1),rgba(8,10,16,0.28))]"
  },
  {
    src: "/education/berkeley-campus.jpg",
    alt: "UC Berkeley campus",
    position: "50% 46%",
    imageClassName: "brightness-[0.81] saturate-[0.7] contrast-[1.01]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(92,118,156,0.06),rgba(8,10,16,0.18))]"
  }
];
const educationLinks = [
  "https://www.shenzhong.net/",
  "https://www.scut.edu.cn/en/",
  "https://www.berkeley.edu/"
];
export default function AboutPage() {
  const renderEducationDescription = (
    item: (typeof visibleEducation)[number]
  ) => {
    if (item.title === "South China University of Technology") {
      return (
        <>
          My current academic base. It has been an utmost privilege to work
          under the supervision of{" "}
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
              ↗
            </span>
          </a>
          .
        </>
      );
    }

    return item.description;
  };
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
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.94] tracking-[-0.05em] font-medium text-foreground">
              Undergraduate at SCUT, majoring in Data Science and Big Data
              Technology
            </h1>
            <p className="mt-5 max-w-[42rem] text-[17px] leading-8 tracking-[-0.01em] text-foreground-60 md:text-lg md:leading-8">
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
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.94] tracking-[-0.05em] font-medium text-foreground">
              Current interests
            </h2>
            <p className="mt-5 max-w-[40rem] text-[17px] leading-8 tracking-[-0.01em] text-foreground-60 md:text-lg md:leading-8">
              The areas that currently hold most of my academic attention.
            </p>
          </div>
          <div className="research-panels md:grid md:grid-cols-3">
            {visibleFocusAreas.map((item, index) => (
              <article
                key={item.title}
                className={`reveal-group-item home-focus-panel border-t border-border-subtle py-6 md:border-t-0 md:py-8 ${
                  index === 0 ? "" : "md:border-l md:border-border-subtle"
                }`}
                style={{ transitionDelay: `${140 + index * 110}ms` }}
              >
                <div className="px-5 md:px-6">
                  <div className="home-focus-visual-frame">
                    <HomeFocusVisual
                      variant={
                        index === 0
                          ? "agents"
                          : index === 1
                            ? "learning"
                            : "multimodal"
                      }
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 md:px-8">
                  <div className="home-focus-copy">
                    <h3 className="max-w-[15rem] text-[1.9rem] font-medium leading-[1.02] tracking-[-0.045em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[22rem] text-[17px] leading-8 tracking-[-0.012em] text-foreground-60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealGroup>
      </section>

      <section
        id="education"
        className="site-shell flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-[2.5rem] md:py-[3.5rem]"
      >
        <RevealGroup as="div">
          <div
            className="reveal-group-item mb-8 max-w-3xl"
            style={{ transitionDelay: "40ms" }}
          >
            <p className="eyebrow">Education</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2.15rem,4.8vw,3.45rem)] leading-[0.94] tracking-[-0.05em] font-medium text-foreground">
              Academic background
            </h2>
            <p className="mt-5 max-w-[42rem] text-[17px] leading-8 tracking-[-0.01em] text-foreground-60 md:text-lg md:leading-8">
              Academic environments that shaped how I perceive, think, and act.
            </p>
          </div>
          <div className="divide-y divide-border-subtle border-y border-border-subtle">
            {visibleEducation.map((item, index) => (
              <article
                key={`education-${item.title}`}
                className="reveal-group-item grid gap-4 py-5 md:grid-cols-[9.5rem_minmax(0,1fr)_15rem] md:items-center md:gap-6 md:py-5"
                style={{ transitionDelay: `${180 + index * 140}ms` }}
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
                      href={educationLinks[index]}
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
                  <p className="mt-2 text-[17px] leading-7 text-foreground-60">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 max-w-3xl text-[17px] leading-7 tracking-[-0.01em] text-foreground-44">
                    {renderEducationDescription(item)}
                  </p>
                </div>

                <div className="md:justify-self-end">
                  <div className="relative aspect-[1.14/0.88] w-full overflow-hidden rounded-[1.45rem] bg-background-soft md:w-[15rem]">
                    <Image
                      src={educationMedia[index].src}
                      alt={educationMedia[index].alt}
                      fill
                      className={`object-cover ${educationMedia[index].imageClassName}`}
                      style={{ objectPosition: educationMedia[index].position }}
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                    <div
                      className={`absolute inset-0 ${educationMedia[index].overlayClassName}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}
