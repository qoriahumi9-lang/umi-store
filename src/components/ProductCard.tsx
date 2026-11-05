import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/pos';
import { formatRupiah } from '../data/initialData';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;

  // Format size display string e.g. "Size: 39-44" or "Size: S-XXL" or "All Size"
  const sizeDisplay = () => {
    if (product.sizes.length === 1) {
      return product.sizes[0];
    }
    if (product.category === 'Sepatu') {
      return `Size: ${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`;
    }
    return `Size: ${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`;
  };

  return (
    <div className="bg-white rounded-xl p-3 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 border border-slate-200/60 group">
      {/* Product Image on clean white backdrop */}
      <div className="relative w-full aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden p-2 group-hover:scale-[1.02] transition-transform duration-200">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain drop-shadow-sm select-none"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px] flex items-center justify-center text-white font-bold text-xs uppercase rounded-lg">
            Habis
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-2.5">
        <h3 className="text-slate-900 font-extrabold text-[14px] leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        <div className="text-emerald-600 font-black text-[15px] font-mono tracking-tight mt-0.5">
          {formatRupiah(product.price)}
        </div>

        <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1.5">
          <span>Stok: <strong className="text-slate-700 font-semibold">{product.stock}</strong></span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">{sizeDisplay()}</span>
        </div>
      </div>

      {/* + Tambah Button */}
      <button
        onClick={() => onAddToCart(product)}
        disabled={isOutOfStock}
        className={`mt-2.5 w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-150 shadow-sm cursor-pointer ${
          isOutOfStock
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-[#39d353] hover:bg-[#2fc047] active:scale-[0.98] text-slate-950 shadow-[0_2px_8px_rgba(57,211,83,0.3)]'
        }`}
      >
        <ShoppingCart size={14} className="stroke-[2.5]" />
        <span>Tambah</span>
      </button>
    </div>
  );
};
