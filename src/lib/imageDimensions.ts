import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

const publicDir = path.join(process.cwd(), 'public');

interface Dimensions {
  width: number;
  height: number;
}

const cache = new Map<string, Dimensions | null>();

export function resolveImageDimensions(src: string): Dimensions | null {
  if (cache.has(src)) return cache.get(src)!;
  if (!src.startsWith('/')) {
    cache.set(src, null);
    return null;
  }
  try {
    const full = path.join(publicDir, src);
    if (!full.startsWith(publicDir + path.sep)) {
      cache.set(src, null);
      return null;
    }
    const buf = fs.readFileSync(full);
    const dim = imageSize(buf);
    if (!dim.width || !dim.height) {
      cache.set(src, null);
      return null;
    }
    const result: Dimensions = { width: dim.width, height: dim.height };
    cache.set(src, result);
    return result;
  } catch {
    cache.set(src, null);
    return null;
  }
}
