import type { MetadataRoute } from "next";
import { ALL_TOOL_SLUGS } from "@/lib/tools-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://tools.teknocuan.web.id";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogPosts: MetadataRoute.Sitemap = [
    "panduan-seo-on-page",
    "apa-itu-robots-txt",
    "jwt-cara-kerja-keamanan",
    "cara-membuat-htaccess",
    "panduan-regex-untuk-developer",
    "open-graph-meta-tag",
    "mastering-seo-on-page-checklist",
    "why-robots-txt-is-essential",
    "understanding-jwt-security",
  ].map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = ALL_TOOL_SLUGS.map(slug => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...toolPages];
}
