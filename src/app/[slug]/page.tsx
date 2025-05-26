import { getPostData, getAllPostsData } from '@/lib/blog';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import MDXRendererWrapper from '@/components/blog/MDXRendererWrapper';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogConfig from '@/lib/blogConfig.json';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for each post
export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const ogImageUrl = post.thumbnail || post.bannerImage;

  return {
    title: `${post.title} | ${blogConfig.siteInfo.title}`,
    description: post.description,
    openGraph: {
      title: `${post.title} | ${blogConfig.siteInfo.title}`,
      description: post.description,
      url: `${blogConfig.siteInfo.url}/blog/${post.slug}`,
      siteName: blogConfig.siteInfo.title,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: ogImageUrl ? `${blogConfig.siteInfo.url}${process.env.NODE_ENV === 'production' ? '/basicswap-blog' : ''}${ogImageUrl}` : `${blogConfig.siteInfo.url}/site-meta.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${blogConfig.siteInfo.title}`,
      description: post.description,
      images: [
        ogImageUrl ? `${blogConfig.siteInfo.url}${process.env.NODE_ENV === 'production' ? '/basicswap-blog' : ''}${ogImageUrl}` : `${blogConfig.siteInfo.url}/site-meta.png`,
      ],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Extract headings manually using regex
  let extractedHeadings: Heading[] = [];
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    extractedHeadings.push({ level, text, slug });
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
      ],
      rehypePlugins: [
      ],
    },
  });

  return (
    <BlogPostLayout post={post}>
      <MDXRendererWrapper content={mdxSource} headings={extractedHeadings} />
    </BlogPostLayout>
  );
}
