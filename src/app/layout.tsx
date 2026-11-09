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
    "A University of Texas at Austin study of how carbon loading and a chitosan coating affect reactive dye removal by activated carbon-alginate beads.",
  keywords: [
    "activated carbon",
    "alginate beads",
    "textile dye",
    "water treatment",
    "chitosan",
    "Reactive Blue 140",
    "adsorption",
  ],
  authors: meta.authors.map((name) => ({ name })),
  creator: meta.team.join(", "),
  applicationName: "Dye Capture",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dye Capture | Carbon-alginate bead research",
    description:
      "Uncoated carbon-alginate beads at 20% carbon removed 84% of Reactive Blue 140; a chitosan coating cut that to 41%.",
    type: "article",
    url: siteUrl,
    siteName: "Dye Capture",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dye Capture | Carbon-alginate bead research",
    description: "An interactive account of a dye-removal experiment with carbon-alginate beads.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  other: { "x-build": "gitv17" },
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
              author: meta.authors.map((name) => ({ "@type": "Person", name })),
              sourceOrganization: { "@type": "Organization", name: `${meta.org}, ${meta.program}` },
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
