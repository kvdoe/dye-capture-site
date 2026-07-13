import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { meta } from "@/lib/data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://dye-capture-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dye Capture | Carbon-alginate bead research",
  description:
    "A student research study testing recoverable carbon-alginate beads for removing Reactive Blue 140 from water.",
  keywords: [
    "activated carbon",
    "alginate beads",
    "textile dye",
    "water treatment",
    "chitosan",
    "Reactive Blue 140",
    "adsorption",
  ],
  authors: meta.team.map((name) => ({ name })),
  creator: meta.team.join(", "),
  applicationName: "Dye Capture",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dye Capture | Carbon-alginate bead research",
    description:
      "Coconut-shell carbon sealed inside alginate beads removed up to 84% of Reactive Blue 140 in this student study.",
    type: "article",
    url: siteUrl,
    siteName: "Dye Capture",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dye Capture | Carbon-alginate bead research",
    description: "An interactive account of a student dye-removal experiment.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  other: { "x-build": "gitv11" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: meta.title,
              alternateName: meta.subtitle,
              url: siteUrl,
              abstract: meta.headline,
              author: meta.team.map((name) => ({ "@type": "Person", name })),
              sourceOrganization: { "@type": "Organization", name: meta.org },
              about: [
                "Reactive Blue 140",
                "activated carbon adsorption",
                "calcium-alginate beads",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
