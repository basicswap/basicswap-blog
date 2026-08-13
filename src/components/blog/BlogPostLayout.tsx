import React from 'react';
import Image from 'next/image';
import type { PostMetadata } from '@/lib/postTypes';
import { postUrl } from '@/lib/postMetadata';
import blogConfig from '@/lib/blogConfig.json';
import TagPill from './TagPill';
import PostFooter from './PostFooter';

interface BlogPostLayoutProps {
  post: PostMetadata;
  children: React.ReactNode;
}

function buildArticleSchema(post: PostMetadata) {
  const url = postUrl(post.slug);
  const site = blogConfig.siteInfo.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${site}${post.bannerImage ?? post.thumbnail}`,
    keywords: post.tags.join(', '),
    author:
      post.author === blogConfig.siteInfo.author
        ? { '@type': 'Organization', name: post.author, url: 'https://basicswapdex.com' }
        : { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'BasicSwap DEX',
      url: 'https://basicswapdex.com',
      logo: { '@type': 'ImageObject', url: `${site}/images/basicswap-logo.svg` },
    },
  };
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, children }) => {
  return (
    <article className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }}
      />
      {post.bannerImage && (
        <div className="mb-8">
          <Image
            src={post.bannerImage}
            alt={post.title}
            width={1920}
            height={690}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      )}
      <h1 className="text-5xl font-extrabold text-titleColor mb-4">{post.title}</h1>
      <div className="text-gray-600 text-lg mb-6 flex items-center space-x-4">
        <span>By {post.author}</span>
        <span>&bull;</span>
        <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date))}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {children}
      </div>

      <PostFooter post={post} />
    </article>
  );
};

export default BlogPostLayout;
