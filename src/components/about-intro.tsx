import Image from "next/image";
import { ArrowUpRightIcon, GitHubIcon, MailIcon } from "@/components/ui-icons";
import { RevealGroup } from "@/components/reveal";
import { profile } from "@/lib/site-content";

function Avatar({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      className="intro-avatar reveal-group-item"
      style={{ animationDelay: "90ms" }}
      src="/home/vincent-dog-avatar.png"
      alt="Vincent's illustrated dog avatar"
      width={512}
      height={512}
      sizes="(max-width: 640px) 144px, 290px"
      priority={priority}
    />
  );
}

function Biography() {
  return (
    <div className="intro-biography">
      <p className="reveal-group-item" style={{ animationDelay: "180ms" }}>
        My name is Letian Liang. I am an undergraduate student at{" "}
        <span className="font-medium tracking-[-0.03em] text-foreground">
          <a className="entity-title-link" href="https://www.scut.edu.cn/en/" target="_blank" rel="noreferrer">
            South China University of Technology
            <span aria-hidden="true" className="link-arrow text-[0.85em] leading-none"><ArrowUpRightIcon /></span>
          </a>
        </span>,{" "}
        majoring in Data Science and Big Data Technology. I am fortunate to work under the supervision of{" "}
        <span className="font-medium tracking-[-0.03em] text-foreground">
          <a className="entity-title-link" href="https://xw-hu.github.io/" target="_blank" rel="noreferrer">
            Prof. Xiaowei Hu
            <span aria-hidden="true" className="link-arrow text-[0.85em] leading-none"><ArrowUpRightIcon /></span>
          </a>
        </span>.
      </p>
      <p className="reveal-group-item" style={{ animationDelay: "260ms" }}>
        I&apos;m interested in artificial intelligence, especially agentic AI, recursive self-improvement, and multimodal large language models.
      </p>
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="intro-contact-links reveal-group-item" style={{ animationDelay: "300ms" }}>
      <a className="intro-email-link" href={`mailto:${profile.email}`}>
        <MailIcon /><span>Email</span>
      </a>
      <a className="intro-github-link" href={profile.github} target="_blank" rel="noreferrer">
        <GitHubIcon /><span>GitHub</span>
      </a>
    </div>
  );
}

export function AboutIntro() {
  return (
    <section id="overview" aria-labelledby="intro-name" className="site-shell about-section intro-section">
      <div className="intro-layout-shell">
        <RevealGroup mode="load" className="intro-design">
          <div className="intro-portrait-layout">
            <div className="intro-portrait-identity">
              <Avatar priority />
              <div className="intro-name-block reveal-group-item" style={{ animationDelay: "180ms" }}>
                <h1 id="intro-name">Letian &quot;Vincent&quot; Liang</h1>
              </div>
            </div>
            <div className="intro-portrait-copy">
              <Biography />
              <ContactLinks />
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
