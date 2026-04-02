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
import Image from 'next/image';
import Gallery from '../mdx/Gallery';
import UrlPreviewCard, { type UrlMetaData } from '../mdx/UrlPreviewCard';
import YouTube from '../mdx/YouTube';
import { generateSlug } from '@/lib/slugify';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

const isUrl = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

interface MDXContentRendererProps {
  content: MDXRemoteSerializeResult;
  headings: Heading[];
  urlMetaData: Record<string, UrlMetaData>;
}

const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({ content, headings, urlMetaData }) => {

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
    Gallery,
    UrlPreviewCard: (props: { url: string }) => <UrlPreviewCard {...props} metaData={urlMetaData[props.url]} />,
    YouTube,
    table: StyledTableWrapper,
    pre: CustomCodeBlock,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt, width, height, ...rest } = props;
      const srcString = typeof src === 'string' ? src : undefined;
      const isExternal = srcString?.startsWith('http');
      const hasRequiredProps = width && height;

      if (isExternal && !hasRequiredProps) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={srcString} alt={alt ?? ''} {...rest} className="max-w-full h-auto mx-auto block" />;
      }

      if (!srcString) return null;

      return (
        <Image
          src={srcString}
          alt={alt ?? ''}
          width={Number(width) || 800}
          height={Number(height) || 600}
          {...rest}
          className="mx-auto block"
        />
      );
    },
    code: (props: React.HTMLAttributes<HTMLElement>) => {
      let inlineCodeContent = String(props.children);
      if (inlineCodeContent.startsWith('`') && inlineCodeContent.endsWith('`')) {
        inlineCodeContent = inlineCodeContent.slice(1, -1);
      }
      return <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded">{inlineCodeContent}</code>;
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
      const { children } = props;

      interface AnchorProps {
        href?: string;
        children?: React.ReactNode;
      }

      if (
        React.Children.count(children) === 1 &&
        React.isValidElement(children) &&
        (children.type === 'a')
      ) {
        const anchorElement = children as React.ReactElement<AnchorProps>;
        if (
          typeof anchorElement.props.href === 'string' &&
          isUrl(anchorElement.props.href) &&
          anchorElement.props.children === anchorElement.props.href
        ) {
          return <UrlPreviewCard url={anchorElement.props.href} metaData={urlMetaData[anchorElement.props.href]} />;
        }
      }
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
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return <a className="text-blue-600 hover:underline" {...props} />;
    },
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h1 id={slug} {...props} />;
    },
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h2 id={slug} {...props} />;
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h3 id={slug} {...props} />;
    },
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h4 id={slug} {...props} />;
    },
    h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h5 id={slug} {...props} />;
    },
    h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const slug = generateSlug(String(props.children));
      return <h6 id={slug} {...props} />;
    },
  };


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
