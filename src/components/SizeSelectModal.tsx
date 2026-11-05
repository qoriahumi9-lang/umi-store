import React, { useState } from 'react';
import { X, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types/pos';
import { formatRupiah } from '../data/initialData';

interface SizeSelectModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: (product: Product, selectedSize: string, quantity: number) => void;
}

export const SizeSelectModal: React.FC<SizeSelectModalProps> = ({ product, onClose, onConfirm }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product?.defaultSize || product?.sizes[0] || 'All');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const handleConfirm = () => {
    onConfirm(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl p-5 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product preview */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
          <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {product.category}
            </div>
            <h3 className="text-lg font-bold text-white leading-tight font-display">
              {product.name}
            </h3>
            <div className="text-[#39d353] font-mono font-extrabold text-lg mt-0.5">
              {formatRupiah(product.price)}
            </div>
            <div className="text-xs text-slate-400">
              Stok Tersedia: <span className="text-slate-200 font-bold">{product.stock}</span>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-200">Pilih Ukuran / Varian:</span>
            <span className="text-xs text-[#39d353] font-bold font-mono">
              Terpilih: {selectedSize}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold font-mono border transition-all ${
                    isSelected
                      ? 'bg-[#39d353] text-slate-950 border-[#39d353] shadow-[0_0_12px_rgba(57,211,83,0.35)] scale-105'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="mt-5 flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <span className="text-sm font-bold text-slate-200">Jumlah Beli:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-base flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center font-mono font-extrabold text-base text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-base flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#39d353] hover:bg-[#2fc047] text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(57,211,83,0.3)] transition-all cursor-pointer"
          >
            <ShoppingCart size={15} />
            <span>Masukkan Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
