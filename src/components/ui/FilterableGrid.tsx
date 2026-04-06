'use client';

import { useState, type ReactNode } from 'react';

interface FilterableGridProps {
  /** Items to filter and display */
  items: any[];
  /** Categories for filter buttons (first item = "Semua") */
  categories: string[];
  /** Search placeholder text */
  searchPlaceholder: string;
  /** Empty state message */
  emptyMessage: string;
  /** Field name to search (defaults to 'title') */
  searchField?: string;
  /** Secondary search field (defaults to 'excerpt') */
  searchFieldSecondary?: string;
  /** Category field name (defaults to 'category') */
  categoryField?: string;
  /** Render function for each item */
  renderItem: (item: any) => ReactNode;
}

export default function FilterableGrid({
  items,
  categories,
  searchPlaceholder,
  emptyMessage,
  searchField = 'title',
  searchFieldSecondary = 'excerpt',
  categoryField = 'category',
  renderItem,
}: FilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === 'Semua' || item[categoryField] === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      item[searchField]?.toLowerCase().includes(query) ||
      item[searchFieldSecondary]?.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Filter Bar */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
              />
              <svg
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">{emptyMessage}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filtered.map((item) => renderItem(item))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
