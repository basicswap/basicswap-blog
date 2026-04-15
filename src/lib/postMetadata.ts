import type { Metadata } from 'next';
import type { PostMetadata } from './postTypes';
import blogConfig from './blogConfig.json';

export function buildPostMetadata(post: PostMetadata): Metadata {
  const titleWithSite = `${post.title} | ${blogConfig.siteInfo.title}`;
  const imageUrl = `${blogConfig.siteInfo.url}${post.thumbnail}`;

  return {
    title: titleWithSite,
    description: post.description,
    openGraph: {
      title: titleWithSite,
      description: post.description,
      url: `${blogConfig.siteInfo.url}/${post.slug}`,
      siteName: blogConfig.siteInfo.title,
      type: 'article',
      publishedTime: post.date,
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
