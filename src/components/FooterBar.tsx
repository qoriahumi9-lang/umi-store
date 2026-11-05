import React from 'react';
import { User, TrendingUp, CircleDollarSign } from 'lucide-react';
import { formatRupiah } from '../data/initialData';

interface FooterBarProps {
  cashierName: string;
  todayCount: number;
  todayRevenue: number;
}

export const FooterBar: React.FC<FooterBarProps> = ({ cashierName, todayCount, todayRevenue }) => {
  return (
    <footer className="bg-[#090f20] border-t border-slate-800/90 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-300 select-none">
      <div className="flex items-center gap-6">
        {/* Kasir */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <User size={13} />
          </div>
          <span className="text-slate-400">Kasir :</span>
          <span className="font-bold text-white">{cashierName}</span>
        </div>

        <div className="hidden sm:block h-4 w-px bg-slate-800" />

        {/* Transaksi Hari Ini */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[#39d353]">
            <TrendingUp size={13} />
          </div>
          <span className="text-slate-400">Transaksi Hari Ini :</span>
          <span className="font-bold text-white font-mono">{todayCount} Transaksi</span>
        </div>

        <div className="hidden md:block h-4 w-px bg-slate-800" />

        {/* Total Penjualan */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
            <CircleDollarSign size={13} />
          </div>
          <span className="text-slate-400">Total Penjualan :</span>
          <span className="font-bold text-[#39d353] font-mono">{formatRupiah(todayRevenue)}</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 font-mono hidden lg:block">
        POS V2.5.0 • Database Online • Shift Pagi
      </div>
    </footer>
  );
};
