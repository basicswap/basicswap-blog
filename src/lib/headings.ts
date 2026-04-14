export interface Heading {
  level: number;
  text: string;
  slug: string;
}

const FENCED_CODE = /```[\s\S]*?```|~~~[\s\S]*?~~~/g;
const HEADING = /^(#{1,6})\s+(.*)$/gm;

export function stripFencedCode(mdx: string): string {
  return mdx.replace(FENCED_CODE, '');
}

export function extractHeadings(
  mdx: string,
  slugify: (s: string) => string,
): Heading[] {
  const stripped = stripFencedCode(mdx);
  const out: Heading[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(HEADING.source, HEADING.flags);
  while ((m = re.exec(stripped)) !== null) {
    const text = m[2].trim();
    out.push({ level: m[1].length, text, slug: slugify(text) });
  }
  return out;
}
