'use client';

import React from 'react';

// ==================== Contentful Rich Text Types (inline, no library needed) ====================
// These match the standard Contentful Rich Text Document format.
// All data still comes from Contentful CMS — we just render the JSON ourselves.

const BLOCKS = {
  PARAGRAPH: 'paragraph',
  HEADING_1: 'heading-1',
  HEADING_2: 'heading-2',
  HEADING_3: 'heading-3',
  HEADING_4: 'heading-4',
  HEADING_5: 'heading-5',
  HEADING_6: 'heading-6',
  UL_LIST: 'unordered-list',
  OL_LIST: 'ordered-list',
  LIST_ITEM: 'list-item',
  QUOTE: 'blockquote',
  HR: 'hr',
  TABLE: 'table',
  TABLE_ROW: 'table-row',
  TABLE_CELL: 'table-cell',
  TABLE_HEADER_CELL: 'table-header-cell',
  EMBEDDED_ASSET: 'embedded-asset-block',
  EMBEDDED_ENTRY: 'embedded-entry-block',
} as const;

const INLINES = {
  HYPERLINK: 'hyperlink',
  ENTRY_HYPERLINK: 'entry-hyperlink',
  ASSET_HYPERLINK: 'asset-hyperlink',
} as const;

const MARKS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  CODE: 'code',
} as const;

// ==================== Custom Rich Text Renderer ====================
// Renders Contentful Rich Text Document (JSON) to React components.
// 100% edge-compatible — no external dependencies, no Node.js APIs.

function getAssetUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('//') ? `https:${url}` : url;
}

function renderMarks(text: React.ReactNode, marks: string[]): React.ReactNode {
  return marks.reduce((node: React.ReactNode, mark: string) => {
    switch (mark) {
      case MARKS.BOLD:
        return <strong className="font-bold text-slate-900">{node}</strong>;
      case MARKS.ITALIC:
        return <em className="italic text-slate-700">{node}</em>;
      case MARKS.UNDERLINE:
        return <u>{node}</u>;
      case MARKS.CODE:
        return <code className="bg-slate-100 text-orange-600 px-1.5 py-0.5 rounded text-sm font-mono">{node}</code>;
      default:
        return node;
    }
  }, text);
}

function renderNode(node: any): React.ReactNode {
  if (!node) return null;

  // Text node
  if (node.nodeType === 'text') {
    return renderMarks(node.value || '', node.marks || []);
  }

  // Block nodes
  switch (node.nodeType) {
    case BLOCKS.PARAGRAPH:
      return <p className="text-sm sm:text-base leading-relaxed text-slate-600 mb-4 sm:mb-6">{renderChildren(node.content)}</p>;

    case BLOCKS.HEADING_1:
      return <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 sm:mt-10 mb-3 sm:mb-4">{renderChildren(node.content)}</h2>;

    case BLOCKS.HEADING_2:
      return <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3">{renderChildren(node.content)}</h3>;

    case BLOCKS.HEADING_3:
      return <h4 className="text-base sm:text-lg font-bold text-slate-800 mt-5 sm:mt-6 mb-2 sm:mb-3">{renderChildren(node.content)}</h4>;

    case BLOCKS.HEADING_4:
      return <h5 className="text-sm sm:text-base font-bold text-slate-800 mt-4 sm:mt-5 mb-2">{renderChildren(node.content)}</h5>;

    case BLOCKS.HEADING_5:
      return <h6 className="text-sm font-bold text-slate-800 mt-4 mb-2">{renderChildren(node.content)}</h6>;

    case BLOCKS.HEADING_6:
      return <h6 className="text-sm font-bold text-slate-700 mt-4 mb-2">{renderChildren(node.content)}</h6>;

    case BLOCKS.UL_LIST:
      return <ul className="list-disc list-inside space-y-2 mb-4 sm:mb-6 text-sm sm:text-base text-slate-600 ml-2">{renderChildren(node.content)}</ul>;

    case BLOCKS.OL_LIST:
      return <ol className="list-decimal list-inside space-y-2 mb-4 sm:mb-6 text-sm sm:text-base text-slate-600 ml-2">{renderChildren(node.content)}</ol>;

    case BLOCKS.LIST_ITEM:
      return <li className="leading-relaxed">{renderChildren(node.content)}</li>;

    case BLOCKS.QUOTE:
      return (
        <blockquote className="border-l-4 border-orange-500 pl-4 sm:pl-6 py-2 bg-orange-50/50 rounded-r-lg my-4 sm:my-6 italic text-slate-700">
          {renderChildren(node.content)}
        </blockquote>
      );

    case BLOCKS.HR:
      return <hr className="my-6 sm:my-8 border-slate-200" />;

    case BLOCKS.TABLE:
      return (
        <div className="overflow-x-auto mb-4 sm:mb-6">
          <table className="w-full border-collapse border border-slate-200 rounded-lg overflow-hidden text-sm sm:text-base">
            {renderChildren(node.content)}
          </table>
        </div>
      );

    case BLOCKS.TABLE_ROW:
      return <tr className="border-b border-slate-200">{renderChildren(node.content)}</tr>;

    case BLOCKS.TABLE_CELL:
      return <td className="px-3 sm:px-4 py-2 text-left text-slate-700 border-r border-slate-100">{renderChildren(node.content)}</td>;

    case BLOCKS.TABLE_HEADER_CELL:
      return <th className="px-3 sm:px-4 py-2 text-left bg-slate-50 font-bold text-slate-900 border-r border-slate-100">{renderChildren(node.content)}</th>;

    case BLOCKS.EMBEDDED_ASSET: {
      const url = getAssetUrl(node.data?.target?.fields?.file?.url);
      const alt = node.data?.target?.fields?.title || node.data?.target?.fields?.description || 'Embedded image';
      if (!url) return null;
      return (
        <figure className="my-6 sm:my-8">
          <img
            src={url}
            alt={alt}
            className="w-full rounded-xl sm:rounded-2xl object-cover max-h-96"
            loading="lazy"
          />
          {alt && <figcaption className="text-xs sm:text-sm text-slate-500 mt-2 text-center">{alt}</figcaption>}
        </figure>
      );
    }

    case BLOCKS.EMBEDDED_ENTRY:
      return (
        <div className="my-4 sm:my-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {renderChildren(node.content)}
        </div>
      );

    // Inline nodes
    case INLINES.HYPERLINK:
      return (
        <a
          href={node.data?.uri || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 underline underline-offset-2 transition-colors"
        >
          {renderChildren(node.content)}
        </a>
      );

    case INLINES.ASSET_HYPERLINK: {
      const assetUrl = getAssetUrl(node.data?.target?.fields?.file?.url);
      return (
        <a
          href={assetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 underline underline-offset-2"
        >
          {renderChildren(node.content)}
        </a>
      );
    }

    case INLINES.ENTRY_HYPERLINK:
      return (
        <span className="text-orange-600 cursor-pointer hover:text-orange-700 underline underline-offset-2">
          {renderChildren(node.content)}
        </span>
      );

    default:
      // Fallback for unknown nodes — render children if any
      if (node.content) return renderChildren(node.content);
      return null;
  }
}

function renderChildren(content: any[] | undefined): React.ReactNode {
  if (!content || !Array.isArray(content)) return null;
  return content.map((node, index) => (
    <React.Fragment key={node?.nodeType ? `${node.nodeType}-${index}` : `text-${index}`}>
      {renderNode(node)}
    </React.Fragment>
  ));
}

// ==================== Exported Component ====================

export interface RichTextDocument {
  nodeType: string;
  data: any;
  content: any[];
}

interface RichTextRendererProps {
  document: RichTextDocument | null;
}

export default function RichTextRenderer({ document: doc }: RichTextRendererProps) {
  if (!doc || !doc.content || doc.content.length === 0) return null;

  return (
    <div className="rich-text-content">
      {renderChildren(doc.content)}
    </div>
  );
}
