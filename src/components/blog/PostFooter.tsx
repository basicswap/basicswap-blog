import React from 'react';
import { PostMetadata } from '@/lib/blog';
import AuthorBio from './AuthorBio';
import SocialShareButtons from './SocialShareButtons';
import RelatedPosts from './RelatedPosts';

interface PostFooterProps {
  post: PostMetadata;
}

const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <AuthorBio author={post.author} />
      <SocialShareButtons post={post} />
      <RelatedPosts currentPostSlug={post.slug} tags={post.tags} />
    </div>
  );
};

export default PostFooter;
