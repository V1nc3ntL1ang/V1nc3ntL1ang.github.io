import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  size?: number | string;
};

// One grid and stroke treatment for every interface icon.
function Icon({ className = "", size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={`site-icon ${className}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return <Icon {...props}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></Icon>;
}

export function MailIcon(props: IconProps) {
  return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
}

export function GitHubIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-7A5.4 5.4 0 0 0 18.8 5a5 5 0 0 0-.1-3.5S17.5 1.2 15 2.9a13.4 13.4 0 0 0-7 0C5.5 1.2 4.3 1.5 4.3 1.5A5 5 0 0 0 4.2 5a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.2 6.7 6.2 7A3.4 3.4 0 0 0 8 18.1V22" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return <Icon {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></Icon>;
}

export function CloseIcon(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <Icon size="1em" {...props}><path d="M6 18 18 6M6 6h12v12" /></Icon>;
}

export function ArrowRightIcon(props: IconProps) {
  return <Icon size="1em" {...props}><path d="M4 12h16m-7-7 7 7-7 7" /></Icon>;
}

export function ChevronDownIcon(props: IconProps) {
  return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
}

export function PaperIcon(props: IconProps) {
  return <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8m-8 4h6" /></Icon>;
}

export function CodeIcon(props: IconProps) {
  return <Icon {...props}><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" /></Icon>;
}

export function ProjectIcon(props: IconProps) {
  return <Icon {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01m3 0h.01" /></Icon>;
}
