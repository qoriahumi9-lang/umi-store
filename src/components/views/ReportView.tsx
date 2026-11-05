import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Search, Filter } from 'lucide-react';
import { Transaction, StoreSettings } from '../../types/pos';
import { formatRupiah } from '../../data/initialData';
import { ReceiptModal } from '../ReceiptModal';

interface ReportViewProps {
  transactions: Transaction[];
  settings: StoreSettings;
}

export const ReportView: React.FC<ReportViewProps> = ({ transactions, settings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.items.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMethod = methodFilter === 'all' || t.paymentMethod === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const exportCSV = () => {
    const headers = ['No Order', 'Tanggal', 'Waktu', 'Kasir', 'Metode Bayar', 'Total Items', 'Subtotal', 'Pajak', 'Total Belanja', 'Status'];
    const rows = filtered.map((t) => [
      t.orderNumber,
      t.date,
      t.time,
      t.cashier,
      t.paymentMethod.toUpperCase(),
      t.items.reduce((s, i) => s + i.quantity, 0),
      t.subtotal,
      t.tax,
      t.total,
      t.status
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `laporan-transaksi-sportwear-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-110px)] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-display text-white">
            Laporan Transaksi Kasir
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Riwayat lengkap penjualan, pencatatan pembayaran, dan cetak ulang struk kasir
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-sm cursor-pointer"
        >
          <Download size={15} />
          <span>Ekspor CSV / Excel</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor transaksi TRX atau nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#39d353]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-slate-400" />
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#39d353]"
          >
            <option value="all">Semua Metode Pembayaran</option>
            <option value="tunai">Tunai (Cash)</option>
            <option value="transfer">Transfer Bank</option>
            <option value="qris">QRIS</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1a36] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4 text-left">No. Order</th>
                <th className="py-3 px-4 text-left">Waktu Transaksi</th>
                <th className="py-3 px-4 text-left">Kasir</th>
                <th className="py-3 px-4 text-left">Item Terjual</th>
                <th className="py-3 px-4 text-center">Metode</th>
                <th className="py-3 px-4 text-right">Total Transaksi</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Struk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    {t.orderNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">
                    {t.date} <span className="text-slate-500">{t.time}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{t.cashier}</td>
                  <td className="py-3 px-4">
                    <div className="line-clamp-1 text-slate-200">
                      {t.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(', ')}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono uppercase font-bold text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300">
                      {t.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-[#39d353]">
                    {formatRupiah(t.total)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedTx(t)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                      title="Lihat Struk"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Transaction Receipt Modal */}
      {selectedTx && (
        <ReceiptModal
          isOpen={!!selectedTx}
          onClose={() => setSelectedTx(null)}
          items={selectedTx.items}
          settings={settings}
          orderNumber={selectedTx.orderNumber}
          paymentMethod={selectedTx.paymentMethod}
          amountPaid={selectedTx.amountPaid}
          dateTimeStr={`${selectedTx.date} ${selectedTx.time}`}
        />
      )}
    </div>
  );
};
