import React from 'react';
import { TrendingUp, ShoppingBag, CreditCard, DollarSign, ArrowUpRight, Award } from 'lucide-react';
import { Transaction, Product } from '../../types/pos';
import { formatRupiah } from '../../data/initialData';

interface DashboardViewProps {
  transactions: Transaction[];
  products: Product[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ transactions, products }) => {
  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalItemsSold = transactions.reduce(
    (sum, t) => sum + t.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );
  const avgOrderValue = transactions.length > 0 ? Math.round(totalRevenue / transactions.length) : 0;

  // Payment breakdown
  const paymentCounts = transactions.reduce(
    (acc, t) => {
      acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-110px)] text-white">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black font-display tracking-tight text-white">
            Dashboard Penjualan Sportwear
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ringkasan performa penjualan harian, transaksi, dan inventaris toko
          </p>
        </div>
        <div className="text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Real-time Sync
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Penjualan */}
        <div className="bg-[#0f1a36] border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Penjualan</span>
            <div className="w-8 h-8 rounded-lg bg-[#39d353]/15 text-[#39d353] flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-[#39d353] mt-2">
            {formatRupiah(totalRevenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-1">
            <ArrowUpRight size={13} />
            <span>+18.4% dari kemarin</span>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="bg-[#0f1a36] border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Jumlah Transaksi</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white mt-2">
            {transactions.length} <span className="text-sm font-normal text-slate-400">Order</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blue-400 font-medium mt-1">
            <span>Rata-rata 3.2 order / jam</span>
          </div>
        </div>

        {/* Produk Terjual */}
        <div className="bg-[#0f1a36] border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Produk Terjual</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white mt-2">
            {totalItemsSold} <span className="text-sm font-normal text-slate-400">Pcs</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Sepatu & Jersey mendominasi
          </div>
        </div>

        {/* Nilai Rata-rata */}
        <div className="bg-[#0f1a36] border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Rata-rata Keranjang (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white mt-2">
            {formatRupiah(avgOrderValue)}
          </div>
          <div className="text-[11px] text-amber-400 mt-1">
            Transaksi bernilai tinggi
          </div>
        </div>
      </div>

      {/* Middle Grid: Top Products & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="lg:col-span-2 bg-[#0f1a36] border border-slate-800/80 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-[#39d353]" size={18} />
              <h3 className="font-bold text-sm text-white font-display">
                Produk Terlaris Hari Ini
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Berdasarkan Volume</span>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((prod, index) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center font-mono font-bold text-slate-400 text-xs">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{prod.name}</h4>
                    <span className="text-[11px] text-slate-400">{prod.category} • Stok: {prod.stock}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-[#39d353]">
                    {formatRupiah(prod.price)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    SKU: {prod.sku}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-[#0f1a36] border border-slate-800/80 rounded-xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white font-display mb-3">
              Distribusi Metode Bayar
            </h3>

            <div className="space-y-3">
              {/* Tunai */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Tunai (Cash)</span>
                  <span className="font-mono">{paymentCounts['tunai'] || 0} Trx</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#39d353] h-full rounded-full"
                    style={{
                      width: `${transactions.length ? ((paymentCounts['tunai'] || 0) / transactions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* QRIS */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>QRIS Nasional</span>
                  <span className="font-mono">{paymentCounts['qris'] || 0} Trx</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{
                      width: `${transactions.length ? ((paymentCounts['qris'] || 0) / transactions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Transfer */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Transfer Bank</span>
                  <span className="font-mono">{paymentCounts['transfer'] || 0} Trx</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{
                      width: `${transactions.length ? ((paymentCounts['transfer'] || 0) / transactions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-400">
            <span className="text-[#39d353] font-bold">Tips Kasir:</span> Pastikan struk tercetak rapi sebelum menyerahkan barang ke pelanggan.
          </div>
        </div>
      </div>
    </div>
  );
};
