import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://v1nc3ntl1ang.github.io"),
  title: {
    default: "Vincent Liang",
    template: "%s | Vincent Liang",
  },
  description:
    "Personal website of Vincent Liang.",
  applicationName: "Vincent Liang",
  alternates: {
    canonical: "https://v1nc3ntl1ang.github.io",
  },
  authors: [
    {
      name: "Vincent Liang",
      url: "https://v1nc3ntl1ang.github.io",
    },
  ],
  keywords: [
    "Vincent Liang",
    "Letian Liang",
    "South China University of Technology",
    "artificial intelligence",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    title: "Vincent Liang",
    description:
      "Personal website of Vincent Liang.",
    url: "https://v1nc3ntl1ang.github.io",
    siteName: "Vincent Liang",
    type: "website",
    images: [
      {
        url: "/home/vincent-dog-avatar.png",
        width: 512,
        height: 512,
        alt: "Vincent Liang",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vincent Liang",
    description:
      "Personal website of Vincent Liang."
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="min-h-screen">
          <SiteNav />
          <main className="pt-16">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
