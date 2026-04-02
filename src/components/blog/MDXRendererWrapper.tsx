'use client';

import dynamic from 'next/dynamic';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';
import type { UrlMetaData } from '../mdx/UrlPreviewCard';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

const MDXContentRenderer = dynamic(() => import('./MDXContentRenderer'), { ssr: false });

interface MDXRendererWrapperProps {
  content: MDXRemoteSerializeResult;
  headings: Heading[];
  urlMetaData: Record<string, UrlMetaData>;
}

const MDXRendererWrapper: React.FC<MDXRendererWrapperProps> = ({ content, headings, urlMetaData }) => {
  return <MDXContentRenderer content={content} headings={headings} urlMetaData={urlMetaData} />;
};

export default MDXRendererWrapper;
