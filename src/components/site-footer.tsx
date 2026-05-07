import Link from "next/link";
import { GitHubIcon, MailIcon } from "@/components/contact-icons";
import { profile } from "@/lib/site-content";
import { ClustrmapsWidget } from "@/components/clustrmaps-widget";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M3.2 10.7 12 3.7l8.8 7v7.75a1.75 1.75 0 0 1-1.75 1.75h-4.3v-5.4h-5.5v5.4h-4.3a1.75 1.75 0 0 1-1.75-1.75V10.7Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-shell mt-8 border-t border-border-subtle py-8 md:py-10">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <div className="footer-icon-options">
          <Link href="/" aria-label="Home" className="footer-icon-link">
            <HomeIcon />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="footer-icon-link"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="footer-icon-link"
          >
            <MailIcon />
          </a>
        </div>

        <div className="text-sm leading-7 text-foreground-60 md:justify-self-center">
          <p>
            <span className="text-foreground">&copy; 2026 Letian Liang.</span>
            <span className="ms-3">Last updated: March 2026</span>
          </p>
        </div>

        <div className="footer-clustrmaps justify-self-start md:justify-self-end">
          <ClustrmapsWidget />
        </div>
      </div>
    </footer>
  );
}
