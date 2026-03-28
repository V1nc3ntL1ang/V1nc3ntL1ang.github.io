import Link from "next/link";
import { profile } from "@/lib/site-content";
import { ClustrmapsWidget } from "@/components/clustrmaps-widget";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.864 10.912c.575.107.786-.25.786-.556 0-.274-.01-1-.016-1.962-3.2.696-3.877-1.542-3.877-1.542-.523-1.328-1.277-1.682-1.277-1.682-1.044-.713.079-.698.079-.698 1.155.081 1.763 1.186 1.763 1.186 1.026 1.759 2.692 1.251 3.348.956.104-.743.402-1.251.731-1.539-2.554-.29-5.24-1.277-5.24-5.684 0-1.255.448-2.282 1.183-3.086-.119-.29-.513-1.459.112-3.042 0 0 .965-.309 3.162 1.179a10.95 10.95 0 0 1 5.758 0c2.195-1.488 3.159-1.179 3.159-1.179.627 1.583.233 2.752.114 3.042.737.804 1.181 1.831 1.181 3.086 0 4.418-2.69 5.391-5.254 5.675.413.356.781 1.058.781 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.669.791.555A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5v8a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const footerLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: profile.github, label: "GitHub", icon: <GitHubIcon />, external: true },
  { href: `mailto:${profile.email}`, label: "Email", icon: <MailIcon /> },
];

export function SiteFooter() {
  return (
    <footer className="site-shell mt-8 border-t border-border-subtle py-8 md:py-10">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <div className="flex items-center gap-3">
          {footerLinks.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="footer-icon-link"
              >
                {item.icon}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="footer-icon-link"
              >
                {item.icon}
              </Link>
            ),
          )}
        </div>

        <div className="text-sm leading-7 text-foreground-60 md:justify-self-center">
          <p>
            <span className="text-foreground">© 2026 Letian Liang.</span>
            <span className="ms-3">Last updated: Jan. 2026</span>
          </p>
        </div>

        <div className="footer-clustrmaps justify-self-start md:justify-self-end">
          <ClustrmapsWidget />
        </div>
      </div>
    </footer>
  );
}
