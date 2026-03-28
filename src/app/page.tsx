import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/reveal";
import { profile } from "@/lib/site-content";

export default function Home() {
  return (
    <section className="accent-wash">
      <div className="site-shell flex min-h-[calc(100svh-var(--header-h))] items-center py-16 md:py-24">
        <RevealGroup
          mode="load"
          as="div"
          className="mx-auto grid w-full max-w-[77rem] gap-12 md:grid-cols-[minmax(0,0.98fr)_minmax(18rem,0.62fr)] md:items-center md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)] lg:gap-14"
        >
          <div className="max-w-[44rem]">
            <p
              className="reveal-group-item eyebrow"
              style={{ transitionDelay: "20ms" }}
            >
              Welcome
            </p>

            <h1
              className="reveal-group-item mt-5 max-w-[14ch] text-[clamp(3rem,7.8vw,5.9rem)] leading-[0.92] tracking-[-0.055em] font-medium text-foreground"
              style={{ transitionDelay: "90ms" }}
            >
              Hi, I&apos;m {profile.nickname}. Welcome to my website.
            </h1>

            <div
              className="reveal-group-item mt-10 max-w-[43rem] space-y-4 text-[1.0625rem] leading-8 tracking-[-0.012em] text-foreground-60 md:mt-12 md:text-[1.18rem] md:leading-9"
              style={{ transitionDelay: "180ms" }}
            >
              <p>
                I&apos;m currently a third-year undergraduate majoring in Data
                Science and Big Data Technology at{" "}
                <a
                  className="entity-inline-link"
                  href="https://www.scut.edu.cn/en/"
                  target="_blank"
                  rel="noreferrer"
                >
                  South China University of Technology
                  <span
                    aria-hidden="true"
                    className="link-arrow text-[0.85em] leading-none"
                  >
                    ↗
                  </span>
                </a>
                .
              </p>
              <p>
                I&apos;m interested in artificial intelligence, especially
                multi-agent systems, open-ended learning, and multimodal large
                language model systems.
              </p>
              <p>
                You can reach me by{" "}
                <a
                  className="entity-inline-link"
                  href={`mailto:${profile.email}`}
                >
                  email
                  <span
                    aria-hidden="true"
                    className="link-arrow text-[0.85em] leading-none"
                  >
                    ↗
                  </span>
                </a>{" "}
                . If you&apos;re interested, feel free to take a look at my{" "}
                <a
                  className="entity-inline-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <span
                    aria-hidden="true"
                    className="link-arrow text-[0.85em] leading-none"
                  >
                    ↗
                  </span>
                </a>
                .
              </p>
            </div>

            <div
              className="reveal-group-item mt-10 md:mt-12"
              style={{ transitionDelay: "260ms" }}
            >
              <Link href="/about" className="home-learn-link">
                <span>Learn more about me</span>
                <span className="home-learn-link-arrow" aria-hidden="true">
                  ›
                </span>
              </Link>
            </div>
          </div>

          <div
            className="reveal-group-item md:justify-self-end"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative md:translate-x-2 md:-translate-y-2 lg:translate-x-4 lg:-translate-y-4">
              <div className="pointer-events-none absolute inset-6 rounded-[2.2rem] bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_70%)] blur-3xl opacity-60" />
              <Image
                src="/home/vincent-dog-avatar.png"
                alt="Vincent's dog avatar"
                width={512}
                height={512}
                priority
                className="relative block aspect-square w-full max-w-[18rem] rounded-[2.1rem] object-cover ring-1 ring-white/7 shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:max-w-[20rem] lg:rounded-[2.35rem]"
              />
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
