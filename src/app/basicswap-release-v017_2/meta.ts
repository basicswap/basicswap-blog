import type { PostMetadata } from '@/lib/postTypes';

export const post: PostMetadata = {
  "slug": "basicswap-release-v017_2",
  "title": "BasicSwap v0.17.2: A Security Fix for Adaptor-Signature Swaps (Update Now)",
  "date": "2026-07-14",
  "author": "BasicSwap Team",
  "tags": [
    "News",
    "Release",
    "Security"
  ],
  "description": "BasicSwap v0.17.2 fixes a fund-safety race condition on the automatic refund path of adaptor-signature (Monero-style) swaps, along with watcher hardening, a BCH recovery fix, and AMM and bid-page fixes. Everyone should update before resuming swaps. No coin cores and no database migration this cycle.",
  "thumbnail": "/images/blog/Medium_BSX_17_2.jpg",
  "bannerImage": "/images/blog/Blog_BSX_17_2.jpg"
};
