'use client';

import React, { createContext, useContext } from 'react';
import type { UrlMetaData } from './urlMetadata';

const UrlMetaContext = createContext<Record<string, UrlMetaData>>({});

export function UrlMetaProvider({
  value,
  children,
}: {
  value: Record<string, UrlMetaData>;
  children: React.ReactNode;
}) {
  return <UrlMetaContext.Provider value={value}>{children}</UrlMetaContext.Provider>;
}

export function useUrlMeta(url: string): UrlMetaData | undefined {
  return useContext(UrlMetaContext)[url];
}
