declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { PostMetadata } from '@/lib/postTypes';

  export const post: PostMetadata;
  export const metadata: Record<string, unknown>;

  const MDXComponent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXComponent;
}
