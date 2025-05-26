import { getAllPostsData, getAllTags } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogConfig from '@/lib/blogConfig.json';

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

// Generate dynamic metadata for each tag page
interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const tag = awaitedParams.tag;

  return {
    title: `Posts tagged "${tag}" | ${blogConfig.siteInfo.title}`,
    description: `Browse all blog posts tagged with "${tag}" on the ${blogConfig.siteInfo.title}`,
    openGraph: {
    title: `Posts tagged "${tag}" | ${blogConfig.siteInfo.title}`,
    description: `Browse all blog posts tagged with "${tag}" on the ${blogConfig.siteInfo.title}`,
      url: `${blogConfig.siteInfo.url}/blog/tags/${tag}`,
      siteName: blogConfig.siteInfo.title,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Posts tagged "${tag}" | ${blogConfig.siteInfo.title}`,
      description: `Browse all blog posts tagged with "${tag}" on the ${blogConfig.siteInfo.title}`,
    },
  };
}

export default async function TagArchivePage({ params }: TagPageProps) {
  const awaitedParams = await params;
  const tag = awaitedParams.tag;
  const allPosts = getAllPostsData();
  const filteredPosts = allPosts.filter(post => post.tags.includes(tag));

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Posts Tagged: "{tag}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
