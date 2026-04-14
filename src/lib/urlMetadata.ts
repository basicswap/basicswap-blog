import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { JSDOM, VirtualConsole } from 'jsdom';
import { isSafeUrl } from './urlSafety';
import { stripFencedCode } from './headings';

export interface UrlMetaData {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogSiteName?: string;
  ogUrl?: string;
  title?: string;
  description?: string;
  error?: string;
}

interface CacheEntry {
  fetchedAt: number;
  data: UrlMetaData;
}
type Cache = Record<string, CacheEntry>;

const CACHE_PATH = path.join(process.cwd(), '.next-url-cache.json');
const OG_CACHE_DIR = path.join(process.cwd(), 'public', 'og-cache');
const OG_CACHE_PUBLIC_PREFIX = '/og-cache';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;
const MAX_OG_IMAGE_BYTES = 1_000_000;

const ALLOWED_OG_IMAGE_TYPES: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const URL_CARD_RE = /<UrlPreviewCard\s+url=["']([^"']+)["']\s*\/?>/g;
const BARE_URL_RE = /^\s*(https?:\/\/[^\s]+)\s*$/gm;

function loadCache(): Cache {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as Cache;
  } catch {
    return {};
  }
}

function saveCache(cache: Cache): void {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

export function extractUrls(mdx: string): Set<string> {
  const urls = new Set<string>();
  const stripped = stripFencedCode(mdx);
  for (const m of stripped.matchAll(URL_CARD_RE)) urls.add(m[1]);
  for (const m of stripped.matchAll(BARE_URL_RE)) urls.add(m[1]);
  return urls;
}

async function downloadOgImage(
  sourceUrl: string,
): Promise<string | undefined> {
  if (!(await isSafeUrl(sourceUrl))) return undefined;
  try {
    const res = await fetch(sourceUrl, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return undefined;

    const contentType = (res.headers.get('content-type') ?? '')
      .split(';')[0]
      .trim()
      .toLowerCase();
    const ext = ALLOWED_OG_IMAGE_TYPES[contentType];
    if (!ext) return undefined;

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength === 0 || buf.byteLength > MAX_OG_IMAGE_BYTES) {
      return undefined;
    }

    fs.mkdirSync(OG_CACHE_DIR, { recursive: true });
    const hash = crypto.createHash('sha256').update(sourceUrl).digest('hex');
    const filename = `${hash}${ext}`;
    const fullPath = path.join(OG_CACHE_DIR, filename);
    if (!fullPath.startsWith(OG_CACHE_DIR + path.sep)) return undefined;
    fs.writeFileSync(fullPath, buf);
    return `${OG_CACHE_PUBLIC_PREFIX}/${filename}`;
  } catch {
    return undefined;
  }
}

async function fetchOne(url: string): Promise<UrlMetaData> {
  if (!(await isSafeUrl(url))) return { error: 'URL not allowed' };
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return { error: `Failed to fetch: ${res.statusText}` };
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html')) {
      return { error: 'Not an HTML page' };
    }

    const vc = new VirtualConsole();
    vc.on('error', () => {});
    const { window } = new JSDOM(await res.text(), { virtualConsole: vc });
    const document = window.document;

    const meta = (sel: string, attr: string) =>
      document.querySelector(sel)?.getAttribute(attr) ?? undefined;

    const rawOgImage = meta('meta[property="og:image"]', 'content');
    let ogImage: string | undefined = rawOgImage;
    if (rawOgImage && /^https?:\/\//.test(rawOgImage)) {
      const localPath = await downloadOgImage(rawOgImage);
      if (localPath) ogImage = localPath;
    }

    return {
      ogTitle: meta('meta[property="og:title"]', 'content'),
      ogDescription: meta('meta[property="og:description"]', 'content'),
      ogImage,
      ogSiteName: meta('meta[property="og:site_name"]', 'content'),
      ogUrl: meta('meta[property="og:url"]', 'content'),
      title: document.querySelector('title')?.textContent ?? undefined,
      description: meta('meta[name="description"]', 'content'),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    return { error: `Error fetching preview: ${message}` };
  }
}

export async function fetchAllUrlMetadata(
  mdxSources: string[],
): Promise<Record<string, UrlMetaData>> {
  const all = new Set<string>();
  for (const src of mdxSources) {
    for (const u of extractUrls(src)) all.add(u);
  }

  const cache = loadCache();
  const now = Date.now();
  const out: Record<string, UrlMetaData> = {};

  await Promise.all(
    [...all].map(async (url) => {
      const cached = cache[url];
      if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
        out[url] = cached.data;
        return;
      }
      const data = await fetchOne(url);
      cache[url] = { fetchedAt: now, data };
      out[url] = data;
    }),
  );

  saveCache(cache);
  return out;
}
