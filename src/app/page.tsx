import { getAllPostsData } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import { Metadata } from 'next';
import blogConfig from '@/lib/blogConfig.json';

export const metadata: Metadata = {
  title: `${blogConfig.siteInfo.title} | Blog`,
  description: blogConfig.siteInfo.description,
  openGraph: {
    title: `${blogConfig.siteInfo.title} | Blog`,
    description: blogConfig.siteInfo.description,
    url: `${blogConfig.siteInfo.url}`,
    siteName: blogConfig.siteInfo.title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${blogConfig.siteInfo.title} | Blog`,
    description: blogConfig.siteInfo.description,
  },
};

export default function BlogIndexPage() {
  const allPosts = getAllPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-titleColor mb-4">BasicSwap Blog</h1>
        <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
          {blogConfig.siteInfo.description}
        </p>
      </div>
      <BlogListClient posts={allPosts} />
    </div>
  );
}
