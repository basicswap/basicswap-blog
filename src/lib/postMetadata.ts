import type { Metadata } from 'next';
import type { PostMetadata } from './postTypes';
import blogConfig from './blogConfig.json';

// next.config.ts sets trailingSlash: true, so canonical URLs end in "/".
export function postUrl(slug: string): string {
  return `${blogConfig.siteInfo.url}/${slug}/`;
}

export function buildPostMetadata(post: PostMetadata): Metadata {
  const titleWithSite = `${post.title} | ${blogConfig.siteInfo.title}`;
  const imageUrl = `${blogConfig.siteInfo.url}${post.thumbnail}`;
  const url = postUrl(post.slug);

  return {
    // The root layout appends "| BasicSwap Blog" via its title template.
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: titleWithSite,
      description: post.description,
      url,
      siteName: blogConfig.siteInfo.title,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithSite,
      description: post.description,
      images: [imageUrl],
    },
  };
}
