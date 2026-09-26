import { ArrowRightIcon } from "@/components/ui-icons";
import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/reveal";
import { profile } from "@/lib/site-content";

export default function Home() {
  return (
    <section>
      <div className="site-shell home-hero-shell flex min-h-[calc(100svh-var(--header-h))] items-center py-16 md:py-24">
        <RevealGroup
          mode="load"
          as="div"
          className="home-hero-grid grid w-full gap-12 md:items-center"
        >
          <div className="max-w-[44rem]">
            <h1
              className="reveal-group-item home-hero-title mt-5 leading-[0.93] tracking-[-0.048em] font-medium text-foreground"
              style={{ animationDelay: "90ms" }}
            >
              <span className="home-hero-title-phrase">Hi, I&apos;m {profile.nickname}.</span>{" "}
              <span className="home-hero-title-phrase home-hero-welcome">Welcome to my website.</span>
            </h1>

            <div
              className="reveal-group-item home-hero-copy mt-10 space-y-4 tracking-[-0.01em] text-foreground-70 md:mt-12"
              style={{ animationDelay: "180ms" }}
            >
              <p>I love working with AI — and working on it.</p>
            </div>

            <div
              className="reveal-group-item home-hero-action mt-10 md:mt-12"
              style={{ animationDelay: "260ms" }}
            >
              <Link href="/about" className="home-learn-link">
                <span>Learn more about me</span>
                <span className="home-learn-link-arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>
          </div>

          <div
            className="reveal-group-item md:justify-self-end"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative md:-translate-y-2 lg:-translate-y-4">
              <Image
                src="/home/vincent-dog-avatar.png"
                alt="Vincent's dog avatar"
                width={512}
                height={512}
                priority
                className="home-hero-avatar relative block aspect-square w-full max-w-[18rem] rounded-[2.1rem] object-cover ring-1 ring-white/7 shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:max-w-[20rem] lg:rounded-[2.35rem]"
              />
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
