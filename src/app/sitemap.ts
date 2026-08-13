import type { MetadataRoute } from 'next';
import { getAllPostsData, getAllTags } from '@/lib/blog';
import blogConfig from '@/lib/blogConfig.json';

export const dynamic = 'force-static';

const BASE = blogConfig.siteInfo.url;

// next.config.ts sets trailingSlash: true, so every exported route ends in "/".
const url = (path: string) => (path ? `${BASE}/${path}/` : `${BASE}/`);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsData(); // newest first
  const newest = posts[0]?.date;

  // Static tags with no posts would render notFound(), so list only tags that
  // actually have posts.
  const tags = getAllTags().filter((tag) =>
    posts.some((post) => post.tags.includes(tag)),
  );

  return [
    { url: url(''), lastModified: newest, changeFrequency: 'weekly', priority: 1 },
    { url: url('tags'), lastModified: newest, changeFrequency: 'weekly', priority: 0.4 },
    ...tags.map((tag) => ({
      url: url(`tags/${encodeURIComponent(tag)}`),
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
    ...posts.map((post) => ({
      url: url(post.slug),
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
