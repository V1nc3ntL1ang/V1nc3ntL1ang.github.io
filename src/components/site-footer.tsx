import Link from "next/link";
import { GitHubIcon, HomeIcon, MailIcon } from "@/components/ui-icons";
import { profile } from "@/lib/site-content";
import { MapMyVisitorsWidget } from "@/components/mapmyvisitors-widget";

export function SiteFooter() {
  return (
    <footer className="site-shell mt-8 border-t border-border-subtle py-8 md:py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
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
            <GitHubIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="footer-icon-link"
          >
            <MailIcon />
          </a>
        </div>

        <div className="text-ui leading-7 text-foreground-60 md:justify-self-center">
          <p className="flex flex-wrap gap-x-3">
            <span className="whitespace-nowrap text-foreground">
              &copy; 2026 Letian Liang.
            </span>
            <span className="whitespace-nowrap">
              Last updated: September 2026
            </span>
          </p>
        </div>

        <div className="footer-mapmyvisitors justify-self-start md:justify-self-end">
          <MapMyVisitorsWidget />
        </div>
      </div>
    </footer>
  );
}
