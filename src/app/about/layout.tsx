import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, research interests, and education of Vincent Liang.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
