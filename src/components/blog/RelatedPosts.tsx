import React from 'react';
import Link from 'next/link';
import { getAllPostsData } from '@/lib/blog';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPostSlug: string;
  tags: string[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostSlug, tags }) => {
  const allPosts = getAllPostsData();

  const related = allPosts.filter(post =>
    post.slug !== currentPostSlug &&
    post.tags.some(tag => tags.includes(tag))
  );

  const postsToShow = related.slice(0, 3);

  if (postsToShow.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {postsToShow.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
