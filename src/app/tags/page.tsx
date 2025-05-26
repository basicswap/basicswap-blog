import { getAllTags } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';
import blogConfig from '@/lib/blogConfig.json';

export const metadata: Metadata = {
  title: `Tags | ${blogConfig.siteInfo.title}`,
  description: `Browse all tags on the ${blogConfig.siteInfo.title}`,
  openGraph: {
    title: `Tags | ${blogConfig.siteInfo.title}`,
    description: `Browse all tags on the ${blogConfig.siteInfo.title}`,
    url: `${blogConfig.siteInfo.url}/blog/tags`,
    siteName: blogConfig.siteInfo.title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Tags | ${blogConfig.siteInfo.title}`,
    description: `Browse all tags on the ${blogConfig.siteInfo.title}`,
  },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Tags</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link key={tag} href={`/blog/tags/${tag}`}>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
