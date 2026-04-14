'use client';

import React, { useState } from 'react';
import { useUrlMeta } from '@/lib/urlMetaContext';
import type { UrlMetaData as CtxUrlMetaData } from '@/lib/urlMetadata';

export type UrlMetaData = CtxUrlMetaData;

interface UrlPreviewCardProps {
  url: string;
  metaData?: UrlMetaData;
}

const UrlPreviewCard: React.FC<UrlPreviewCardProps> = ({ url, metaData }) => {
  const contextMeta = useUrlMeta(url);
  const activeMetaData: UrlMetaData | undefined = metaData ?? contextMeta;
  const [imageAspectRatio, setImageAspectRatio] = useState<'square' | 'wide' | null>(null);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatio(aspectRatio >= 1.4 ? 'wide' : 'square');
  };

  if (!activeMetaData || activeMetaData.error) {
    return (
      <div className="block border border-red-400 bg-red-100 text-red-700 rounded-lg p-4 my-4">
        <div className="font-semibold">Error loading preview:</div>
        <div className="text-sm">{activeMetaData?.error || 'Could not fetch preview data.'}</div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-words text-sm mt-2 block"
        >
          {url}
        </a>
      </div>
    );
  }

  const displayTitle = activeMetaData.ogTitle || activeMetaData.title || url;
  const displayDescription = activeMetaData.ogDescription || activeMetaData.description;
  const displayImage = activeMetaData.ogImage;
  const displaySiteName = activeMetaData.ogSiteName;
  const displayUrl = activeMetaData.ogUrl || url;

  const imageContainerClasses =
    imageAspectRatio === 'wide'
      ? 'flex-shrink-0 w-44 h-24 bg-white border border-gray-200 rounded-md overflow-hidden flex items-center justify-center'
      : 'flex-shrink-0 w-28 h-28 bg-white border border-gray-200 rounded-md overflow-hidden flex items-center justify-center';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-200 rounded-lg overflow-hidden my-4 hover:shadow-md transition-shadow duration-200 no-underline"
    >
      <div className="p-3 flex gap-4 items-center">
        {displayImage && (
          <div className={imageContainerClasses}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              style={{ display: 'block', margin: 'auto' }}
              onLoad={handleImageLoad}
            />
          </div>
        )}
        <div className="flex-1 min-w-0 py-1">
          <div className="font-semibold text-blue-600 break-words">{displayTitle}</div>
          {displaySiteName && <div className="text-xs text-gray-500 mt-1">{displaySiteName}</div>}
          {displayDescription && (
            <div className="text-sm text-gray-700 mt-2 line-clamp-3">{displayDescription}</div>
          )}
          <div className="text-xs text-gray-500 mt-2 break-words">{displayUrl}</div>
        </div>
      </div>
    </a>
  );
};

export default UrlPreviewCard;
