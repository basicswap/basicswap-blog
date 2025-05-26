import React from 'react';
import { PostMetadata } from '@/lib/blog';
import blogConfig from '@/lib/blogConfig.json';

interface SocialShareButtonsProps {
  post: PostMetadata;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ post }) => {
  const postUrl = `${blogConfig.siteInfo.url}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} by ${post.author} on BasicSwap Blog`);

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8">
      <a
        href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 flex items-center"
      >
        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-6.914L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zm-2.97 17.1L6.184 4.14H4.99L15.316 20.26h1.953z" />
        </svg>
        Share on X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 flex items-center"
      >
        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.24.195 2.24.195v2.46h-1.262c-1.225 0-1.628.76-1.628 1.563V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
        </svg>
        Share on Facebook
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200 flex items-center"
      >
        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.362-.847-2.042-1.983-2.042-1.145 0-1.724.78-1.724 2.042v5.569h-3.554V9.092h3.554v1.748h.047c.559-.894 1.519-1.83 3.162-1.83 2.042 0 3.635 1.34 3.635 4.26V20.452zM3.531 7.004c-1.356 0-2.351-.947-2.351-2.291 0-1.345.995-2.291 2.351-2.291 1.36 0 2.351.946 2.351 2.291 0 1.344-.991 2.291-2.351 2.291zm1.781 13.448H1.75V9.092h3.562V20.452zM22.225 1H1.775C1.395 1 1 1.395 1 1.775v20.45C1 22.605 1.395 23 1.775 23h20.45C22.605 23 23 22.605 23 22.225V1.775C23 1.395 22.605 1 22.225 1z" />
        </svg>
        Share on LinkedIn
      </a>
    </div>
  );
};

export default SocialShareButtons;
