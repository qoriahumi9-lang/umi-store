import React, { useState } from 'react';
import { Plus, Search, Edit2, Package, Check, X } from 'lucide-react';
import { Product, Category } from '../../types/pos';
import { formatRupiah, CATEGORIES } from '../../data/initialData';

interface ProductViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductView: React.FC<ProductViewProps> = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStockVal, setEditStockVal] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<Category, 'Semua'>>('Sepatu');
  const [newPrice, setNewPrice] = useState(500000);
  const [newStock, setNewStock] = useState(10);
  const [newSku, setNewSku] = useState('');
  const [newSizes, setNewSizes] = useState('39, 40, 41, 42, 43, 44');

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartEdit = (p: Product) => {
    setEditingId(p.id);
    setEditStockVal(p.stock);
  };

  const handleSaveStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, editStockVal) } : item))
    );
    setEditingId(null);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const sizesArr = newSizes.split(',').map((s) => s.trim()).filter(Boolean);
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      category: newCategory,
      price: Number(newPrice) || 0,
      stock: Number(newStock) || 0,
      sku: newSku || `SP-${Math.floor(1000 + Math.random() * 9000)}`,
      sizes: sizesArr.length ? sizesArr : ['All'],
      defaultSize: sizesArr[0] || 'All',
      image: '/src/assets/images/nike_air_max_1793836773065.jpg',
      description: 'Produk sportswear baru ditambahkan ke katalog.'
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    // Reset form
    setNewName('');
    setNewSku('');
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-110px)] text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-display text-white">
            Kelola Inventaris & Produk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar lengkap katalog barang, varian ukuran, harga jual, dan stok gudang
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#39d353] hover:bg-[#2fc047] text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama produk atau kode SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#39d353]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c.value
                  ? 'bg-[#39d353] text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#0f1a36] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4 text-left">Produk</th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Kode SKU</th>
                <th className="py-3 px-4 text-right">Harga Jual</th>
                <th className="py-3 px-4 text-center">Ukuran Tersedia</th>
                <th className="py-3 px-4 text-center">Stok</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 border border-slate-700">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{prod.name}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          {prod.description || 'Peralatan olahraga original'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-300">
                    {prod.sku}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-[#39d353]">
                    {formatRupiah(prod.price)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-1 max-w-[160px] mx-auto">
                      {prod.sizes.map((s) => (
                        <span key={s} className="bg-slate-900 border border-slate-700 px-1 py-0.2 rounded text-[10px] font-mono text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {editingId === prod.id ? (
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          value={editStockVal}
                          onChange={(e) => setEditStockVal(Number(e.target.value))}
                          className="w-16 bg-slate-900 border border-[#39d353] rounded px-2 py-1 text-center font-mono font-bold text-white text-xs"
                          min={0}
                        />
                        <button
                          onClick={() => handleSaveStock(prod.id)}
                          className="p-1 rounded bg-[#39d353] text-slate-950 hover:bg-[#2fc047]"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`font-mono font-bold px-2.5 py-1 rounded-full text-xs ${
                          prod.stock <= 5
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : prod.stock <= 10
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {prod.stock} unit
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleStartEdit(prod)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Stok"
                    >
                      <Edit2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl p-5 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="text-[#39d353]" size={18} />
                <h3 className="font-bold text-sm font-display">Tambah Produk Sportwear Baru</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Nike Zoom Fly 5"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
                  >
                    <option value="Sepatu">Sepatu</option>
                    <option value="Baju">Baju</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Celana">Celana</option>
                    <option value="Jaket">Jaket</option>
                    <option value="Aksesoris">Aksesoris</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kode SKU</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="Contoh: NK-ZM-5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#39d353]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stok Awal</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#39d353]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Varian Ukuran (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newSizes}
                  onChange={(e) => setNewSizes(e.target.value)}
                  placeholder="39, 40, 41, 42 atau S, M, L, XL"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#39d353] hover:bg-[#2fc047] text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
