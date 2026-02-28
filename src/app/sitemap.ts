import type { MetadataRoute } from "next";
import { ALL_TOOL_SLUGS } from "@/lib/tools-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tools.teknocuan.web.id";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
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
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = ALL_TOOL_SLUGS.map(slug => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...toolPages];
}
