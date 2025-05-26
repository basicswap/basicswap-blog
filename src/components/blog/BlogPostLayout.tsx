import React from 'react';
import Image from 'next/image';
import { PostMetadata } from '@/lib/blog';
import TagPill from './TagPill';
import PostFooter from './PostFooter';

interface BlogPostLayoutProps {
  post: PostMetadata;
  children: React.ReactNode;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, children }) => {
  return (
    <article className="container mx-auto px-4 py-8">
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
