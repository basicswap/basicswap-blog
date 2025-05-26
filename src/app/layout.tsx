import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import blogConfig from '@/lib/blogConfig.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BasicSwap Blog',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fefffe] min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
