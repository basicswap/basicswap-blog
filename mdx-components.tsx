import type { MDXComponents } from 'mdx/types';
import React from 'react';
import Image from 'next/image';
import Callout from '@/components/mdx/Callout';
import ChartWrapper from '@/components/mdx/ChartWrapper';
import StyledTableWrapper from '@/components/mdx/StyledTableWrapper';
import CustomCodeBlock from '@/components/mdx/CustomCodeBlock';
import Collapsible from '@/components/mdx/Collapsible';
import CustomDiv from '@/components/mdx/CustomDiv';
import Counter from '@/components/mdx/Counter';
import Checklist from '@/components/mdx/Checklist';
import Timeline from '@/components/mdx/Timeline';
import Gallery from '@/components/mdx/Gallery';
import UrlPreviewCard from '@/components/mdx/UrlPreviewCard';
import YouTube from '@/components/mdx/YouTube';
import { generateSlug } from '@/lib/slugify';
import { resolveImageDimensions } from '@/lib/imageDimensions';

const headingWithId = (
  Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
) => {
  const Component = ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Tag id={generateSlug(String(children))} {...rest}>
      {children}
    </Tag>
  );
  Component.displayName = `MDX${Tag.toUpperCase()}`;
  return Component;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
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
    UrlPreviewCard,
    YouTube,
    table: StyledTableWrapper,
    pre: CustomCodeBlock,
    img: ({ src, alt, width, height, ...rest }) => {
      const srcString = typeof src === 'string' ? src : undefined;
      if (!srcString) return null;
      const isExternal = srcString.startsWith('http');
      const dims = isExternal ? null : resolveImageDimensions(srcString);
      const w = Number(width) || dims?.width;
      const h = Number(height) || dims?.height;
      if (isExternal || !w || !h) {
        // eslint-disable-next-line @next/next/no-img-element
        return (
          <img
            src={srcString}
            alt={alt ?? ''}
            {...rest}
            className="max-w-full h-auto mx-auto block"
          />
        );
      }
      return (
        <Image
          src={srcString}
          alt={alt ?? ''}
          width={w}
          height={h}
          {...rest}
          className="mx-auto block"
        />
      );
    },
    a: ({ href, children, ...rest }) => {
      const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-blue-600 hover:underline"
          {...rest}
        >
          {children}
        </a>
      );
    },
    h1: headingWithId('h1'),
    h2: headingWithId('h2'),
    h3: headingWithId('h3'),
    h4: headingWithId('h4'),
    h5: headingWithId('h5'),
    h6: headingWithId('h6'),
  };
}
