'use client';

import React, { useState, useMemo } from 'react';
import { PostMetadata } from '@/lib/blog';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar';
import TagDropdown from './TagDropdown';

interface BlogListClientProps {
  posts: PostMetadata[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.author.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    return filtered;
  }, [posts, searchTerm, selectedTag]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagDropdown allTags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">No posts found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BlogListClient;
