import type { Metadata } from "next";
import { publicationsVisible } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Papers, preprints, and selected research by Vincent Liang.",
  alternates: {
    canonical: "/publications/",
  },
  robots: {
    index: publicationsVisible,
    follow: publicationsVisible,
  },
};

export default function PublicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
