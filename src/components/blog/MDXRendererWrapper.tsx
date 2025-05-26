'use client';

import dynamic from 'next/dynamic';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

// Dynamically import MDXContentRenderer with ssr: false
const MDXContentRenderer = dynamic(() => import('./MDXContentRenderer'), { ssr: false });

interface MDXRendererWrapperProps {
  content: MDXRemoteSerializeResult;
  headings: Heading[];
}

const MDXRendererWrapper: React.FC<MDXRendererWrapperProps> = ({ content, headings }) => {
  return <MDXContentRenderer content={content} headings={headings} />;
};

export default MDXRendererWrapper;
