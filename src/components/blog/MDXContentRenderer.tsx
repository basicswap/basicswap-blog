'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Callout from '../mdx/Callout';
import ChartWrapper from '../mdx/ChartWrapper';
import StyledTableWrapper from '../mdx/StyledTableWrapper';
import CustomCodeBlock from '../mdx/CustomCodeBlock';
import Collapsible from '../mdx/Collapsible';
import CustomDiv from '../mdx/CustomDiv';
import Counter from '../mdx/Counter';
import Checklist from '../mdx/Checklist';
import Timeline from '../mdx/Timeline';
import TableOfContents from './TableOfContents';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

// Helper function to generate slug from text
const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// Define custom components available within MDX
const components = {
  Callout,
  ChartWrapper,
  StyledTableWrapper,
  CustomCodeBlock,
  Collapsible,
  CustomDiv,
  Counter,
  Checklist,
  Timeline,
  table: StyledTableWrapper,
  pre: CustomCodeBlock,
  code: (props: any) => {
    let inlineCodeContent = String(props.children);
    if (inlineCodeContent.startsWith('`') && inlineCodeContent.endsWith('`')) {
      inlineCodeContent = inlineCodeContent.slice(1, -1);
    }
    return <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded">{inlineCodeContent}</code>;
  },
  p: (props: any) => {
    const { children } = props;
    if (React.isValidElement(children) && children.type === CustomCodeBlock) {
      return children;
    }
    if (Array.isArray(children)) {
      const containsCodeBlock = children.some(child => React.isValidElement(child) && child.type === CustomCodeBlock);
      if (containsCodeBlock) {
        return <>{children}</>;
      }
    }
    return <p className="my-2 leading-relaxed" {...props} />;
  },
  
  // Custom heading components to add IDs for linking
  h1: (props: any) => {
    const slug = generateSlug(props.children);
    return <h1 id={slug} {...props} />;
  },
  h2: (props: any) => {
    const slug = generateSlug(props.children);
    return <h2 id={slug} {...props} />;
  },
  h3: (props: any) => {
    const slug = generateSlug(props.children);
    return <h3 id={slug} {...props} />;
  },
  h4: (props: any) => {
    const slug = generateSlug(props.children);
    return <h4 id={slug} {...props} />;
  },
  h5: (props: any) => {
    const slug = generateSlug(props.children);
    return <h5 id={slug} {...props} />;
  },
  h6: (props: any) => {
    const slug = generateSlug(props.children);
    return <h6 id={slug} {...props} />;
  },
};

interface MDXContentRendererProps {
  content: MDXRemoteSerializeResult;
  headings: Heading[];
}

const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({ content, headings }) => {
  return (
    <>
      {headings.length > 0 && <TableOfContents headings={headings} />}
      <div className="prose prose-lg max-w-none">
        <MDXRemote {...content} components={components} />
      </div>
    </>
  );
};

export default MDXContentRenderer;
