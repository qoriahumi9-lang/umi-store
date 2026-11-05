import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Product, Category } from '../types/pos';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/initialData';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col p-3 overflow-hidden min-h-0">
      {/* Top Search & Category Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-2.5 pb-3">
        {/* Search Input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk... (Nama / Kode SKU)"
            className="w-full bg-[#0d1730] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] transition-all"
          />
        </div>

        {/* Categories Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#39d353] text-slate-950 shadow-[0_2px_8px_rgba(57,211,83,0.35)]'
                    : 'bg-[#0d1730] border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid: 4 columns as in reference photo */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredProducts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-500">
            <p className="text-sm font-semibold">Tidak ada produk ditemukan</p>
            <p className="text-xs text-slate-600 mt-1">Coba kata kunci atau kategori yang berbeda</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
