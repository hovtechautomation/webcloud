'use client';

import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-slate-900">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-slate-700">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-slate-100 text-orange-600 px-1.5 py-0.5 rounded text-sm font-mono">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="text-sm sm:text-base leading-relaxed text-slate-600 mb-4 sm:mb-6">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: any, children: any) => (
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 sm:mt-10 mb-3 sm:mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: any) => (
      <h4 className="text-base sm:text-lg font-bold text-slate-800 mt-5 sm:mt-6 mb-2 sm:mb-3">{children}</h4>
    ),
    [BLOCKS.HEADING_4]: (_node: any, children: any) => (
      <h5 className="text-sm sm:text-base font-bold text-slate-800 mt-4 sm:mt-5 mb-2">{children}</h5>
    ),
    [BLOCKS.HEADING_5]: (_node: any, children: any) => (
      <h6 className="text-sm font-bold text-slate-800 mt-4 mb-2">{children}</h6>
    ),
    [BLOCKS.HEADING_6]: (_node: any, children: any) => (
      <h6 className="text-sm font-bold text-slate-700 mt-4 mb-2">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 sm:mb-6 text-sm sm:text-base text-slate-600 ml-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 sm:mb-6 text-sm sm:text-base text-slate-600 ml-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: any) => (
      <blockquote className="border-l-4 border-orange-500 pl-4 sm:pl-6 py-2 bg-orange-50/50 rounded-r-lg my-4 sm:my-6 italic text-slate-700">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-6 sm:my-8 border-slate-200" />
    ),
    [BLOCKS.TABLE]: (_node: any, children: any) => (
      <div className="overflow-x-auto mb-4 sm:mb-6">
        <table className="w-full border-collapse border border-slate-200 rounded-lg overflow-hidden text-sm sm:text-base">
          {children}
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node: any, children: any) => (
      <tr className="border-b border-slate-200">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node: any, children: any) => (
      <td className="px-3 sm:px-4 py-2 text-left text-slate-700 border-r border-slate-100">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node: any, children: any) => (
      <th className="px-3 sm:px-4 py-2 text-left bg-slate-50 font-bold text-slate-900 border-r border-slate-100">{children}</th>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:text-orange-700 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.target?.fields?.file?.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:text-orange-700 underline underline-offset-2"
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => (
      <span className="text-orange-600 cursor-pointer hover:text-orange-700 underline underline-offset-2">
        {children}
      </span>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const url = node.data?.target?.fields?.file?.url;
      const alt = node.data?.target?.fields?.title || 'Embedded image';
      if (!url) return null;
      return (
        <figure className="my-6 sm:my-8">
          <img
            src={url.startsWith('//') ? `https:${url}` : url}
            alt={alt}
            className="w-full rounded-xl sm:rounded-2xl object-cover max-h-96"
            loading="lazy"
          />
          {alt && <figcaption className="text-xs sm:text-sm text-slate-500 mt-2 text-center">{alt}</figcaption>}
        </figure>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (_node: any, children: any) => (
      <div className="my-4 sm:my-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        {children}
      </div>
    ),
  },
};

interface RichTextRendererProps {
  document: Document;
}

export default function RichTextRenderer({ document: doc }: RichTextRendererProps) {
  if (!doc || !doc.content || doc.content.length === 0) return null;

  return (
    <div className="rich-text-content">
      {documentToReactComponents(doc, richTextOptions)}
    </div>
  );
}
