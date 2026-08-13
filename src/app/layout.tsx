import './globals.css';
import fs from 'node:fs';
import path from 'node:path';
import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import blogConfig from '@/lib/blogConfig.json';
import { fetchAllUrlMetadata } from '@/lib/urlMetadata';
import { UrlMetaProvider } from '@/lib/urlMetaContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(blogConfig.siteInfo.url),
  // Pages set a bare title; this appends the site name. Pages that need the
  // exact string (the index) set title.absolute instead.
  title: {
    default: blogConfig.siteInfo.title,
    template: `%s | ${blogConfig.siteInfo.title}`,
  },
  description: 'Your central hub for the latest news, updates, and insights on BasicSwap DEX.',
  openGraph: {
    title: blogConfig.siteInfo.title,
    description: blogConfig.siteInfo.description,
    url: blogConfig.siteInfo.url,
    siteName: blogConfig.siteInfo.title,
    images: [
      {
        url: `${blogConfig.siteInfo.url}/images/blog/welcome-thumbnail.jpg`,
        width: 1200,
        height: 630,
        alt: blogConfig.siteInfo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: blogConfig.siteInfo.title,
    description: blogConfig.siteInfo.description,
    images: [
      `${blogConfig.siteInfo.url}/images/blog/welcome-thumbnail.jpg`,
    ],
  },
};

async function loadUrlMetadata() {
  const appDir = path.join(process.cwd(), 'src/app');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  const mdxSources: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pageMdx = path.join(appDir, entry.name, 'page.mdx');
    if (fs.existsSync(pageMdx)) {
      mdxSources.push(fs.readFileSync(pageMdx, 'utf8'));
    }
  }
  return fetchAllUrlMetadata(mdxSources);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const urlMetadata = await loadUrlMetadata();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fefffe] min-h-screen flex flex-col`}>
        <UrlMetaProvider value={urlMetadata}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UrlMetaProvider>
      </body>
    </html>
  );
}
