import type { MetadataRoute } from "next";

const siteUrl = "https://dye-capture-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/materials`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/protocol`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
