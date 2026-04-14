import blogConfig from './blogConfig.json';
import { allPosts } from './postIndex';
import type { PostMetadata } from './postTypes';

export type { PostMetadata };
export type PostData = PostMetadata;

export function getAllPostsData(): PostMetadata[] {
  return [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostMetadata | null {
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) return null;
  return allPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllTags(): string[] {
  const fromPosts = allPosts.flatMap((p) => p.tags);
  const staticTags: string[] = blogConfig.staticTags ?? [];
  return Array.from(new Set([...fromPosts, ...staticTags])).sort();
}
