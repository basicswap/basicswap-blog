import type { MetadataRoute } from 'next';
import blogConfig from '@/lib/blogConfig.json';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${blogConfig.siteInfo.url}/sitemap.xml`,
  };
}
