'use client';

import type { RichTextDocument } from './rich-text-renderer';

// Re-export for consistent interface
// The actual RichTextRenderer is now 100% edge-compatible (no external deps)
import RichTextRenderer from './rich-text-renderer';

export default function RichTextWrapper({ document }: { document: RichTextDocument | null }) {
  if (!document || !document.content || document.content.length === 0) return null;
  return <RichTextRenderer document={document} />;
}
