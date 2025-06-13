import { getPostData, getAllPostsData } from '@/lib/blog';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import MDXRendererWrapper from '@/components/blog/MDXRendererWrapper';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogConfig from '@/lib/blogConfig.json';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { JSDOM, VirtualConsole } from 'jsdom';

interface Heading {
  level: number;
  text: string;
  slug: string;
}


export async function generateStaticParams() {
  const posts = getAllPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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
          url: ogImageUrl ? `${blogConfig.siteInfo.url}${ogImageUrl}` : `${blogConfig.siteInfo.url}/site-meta.png`,
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
        ogImageUrl ? `${blogConfig.siteInfo.url}${ogImageUrl}` : `${blogConfig.siteInfo.url}/site-meta.png`,
      ],
    },
  };
}

async function extractAndFetchMetaData(mdxContent: string): Promise<Record<string, any>> {
  const urlMetaData: Record<string, any> = {};
  const urlsToFetch = new Set<string>();

  const urlPreviewCardRegex = /<UrlPreviewCard\s+url="([^"]+)"\s*\/?>/g;
  let match;
  while ((match = urlPreviewCardRegex.exec(mdxContent)) !== null) {
    urlsToFetch.add(match[1]);
  }

  const lines = mdxContent.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    const urlMatch = trimmedLine.match(/^((https?:\/\/|www\.)[^\s]+)$/);
    if (urlMatch) {
      urlsToFetch.add(urlMatch[1]);
    }
  }

  for (const url of urlsToFetch) {
    try {
      console.log(`Fetching meta data for URL (build time): ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Failed to fetch meta data for ${url}: ${response.statusText}`);
        urlMetaData[url] = { error: `Failed to fetch: ${response.statusText}` };
        continue;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        console.warn(`URL does not point to HTML: ${url}`);
        urlMetaData[url] = { error: 'Not an HTML page' };
        continue;
      }

      const html = await response.text();
      
      const virtualConsole = new VirtualConsole();
      virtualConsole.on('error', (error) => {
        if (!error.message?.includes('Could not parse CSS stylesheet')) {
          console.error('JSDOM Error:', error);
        }
      });
      
      const dom = new JSDOM(html, {
        resources: 'usable',
        runScripts: 'outside-only',
        pretendToBeVisual: false,
        virtualConsole
      });
      const doc = dom.window.document;

      const extracted: any = {};
      extracted.ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined;
      extracted.ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || undefined;
      extracted.ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || undefined;
      extracted.ogSiteName = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || undefined;
      extracted.ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || undefined;
      extracted.title = doc.querySelector('title')?.textContent || undefined;
      extracted.description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined;

      urlMetaData[url] = extracted;
      console.log(`Successfully fetched meta data for ${url}`);

    } catch (error: any) {
      console.error(`Error fetching or parsing meta data for ${url}:`, error);
      urlMetaData[url] = { error: `Error fetching preview: ${error.message}` };
    }
  }
  
  return urlMetaData;
}


export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const urlMetaData = await extractAndFetchMetaData(post.content);


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
      <MDXRendererWrapper content={mdxSource} headings={extractedHeadings} urlMetaData={urlMetaData} /> {/* Pass urlMetaData */}
    </BlogPostLayout>
  );
}
