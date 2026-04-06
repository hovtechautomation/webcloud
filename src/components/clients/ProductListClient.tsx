'use client';

import Image from 'next/image';
import Link from 'next/link';
import FilterableGrid from '@/components/ui/FilterableGrid';
import { MessageCircle, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  _id: string; name: string; slug: string; description: string; price?: string; category: string; imageUrl?: string; features?: string[];
}

export default function ProductListClient({ products, categories, whatsapp }: { products: Product[]; categories: string[]; whatsapp: string }) {
  return (
    <FilterableGrid
      items={products}
      categories={categories}
      searchPlaceholder="Cari produk..."
      emptyMessage="Tidak ada produk ditemukan."
      searchField="name"
    >
      {(item) => (
        <div key={item._id} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
          <div className="aspect-video overflow-hidden relative">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"><span className="text-3xl sm:text-4xl font-bold text-slate-400">{item.name.charAt(0)}</span></div>
            )}
            {item.category && <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-slate-900/80 text-white text-[10px] sm:text-xs font-medium rounded-full">{item.category}</span></div>}
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-1 text-slate-900 group-hover:text-orange-600 transition-colors">{item.name}</h3>
            {item.price && <p className="text-orange-600 font-bold text-base sm:text-lg mb-2">{item.price}</p>}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">{item.description}</p>
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {item.features.slice(0, 3).map((f: string, i: number) => <span key={i} className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 px-2 py-0.5 sm:py-1 rounded">{f}</span>)}
              </div>
            )}
            <div className="flex gap-2 sm:gap-3">
              <Link href={`/products/${item.slug}`} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors text-xs sm:text-sm"><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Detail</Link>
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik produk ${item.name}.`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors text-xs sm:text-sm"><ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Pesan</a>
            </div>
          </div>
        </div>
      )}
    </FilterableGrid>
  );
}
