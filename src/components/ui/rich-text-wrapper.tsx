'use client';

import dynamic from 'next/dynamic';
import type { Document } from '@contentful/rich-text-types';

// Lazy load RichTextRenderer with ssr:false to avoid
// @contentful/rich-text-react-renderer being bundled into Edge functions.
// This library uses Node.js APIs that crash in Cloudflare Workers.
const RichTextRenderer = dynamic(() => import('./rich-text-renderer'), {
  ssr: false,
  loading: () => <div className="animate-pulse space-y-4"><div className="h-4 bg-slate-200 rounded w-full" /><div className="h-4 bg-slate-200 rounded w-3/4" /><div className="h-4 bg-slate-200 rounded w-5/6" /></div>,
});

export default function RichTextWrapper({ document }: { document: Document }) {
  if (!document || !document.content || document.content.length === 0) return null;

  return <RichTextRenderer document={document} />;
}
