import React from 'react';
import { Home, BarChart3, Package, FileText, Settings, LogOut } from 'lucide-react';

export type TabType = 'kasir' | 'dashboard' | 'produk' | 'laporan' | 'pengaturan';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'kasir', label: 'Kasir', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'produk', label: 'Produk', icon: Package },
    { id: 'laporan', label: 'Laporan', icon: FileText },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ] as const;

  return (
    <aside className="w-48 bg-[#0b1329] border-r border-slate-800/80 flex flex-col justify-between p-3 select-none shrink-0 min-h-full">
      {/* Top Nav Buttons */}
      <div className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-bold text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-[#39d353] text-slate-950 shadow-[0_2px_12px_rgba(57,211,83,0.35)] translate-x-1'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Keluar Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-bold text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>

      {/* Bottom Promo Graphic: "SPORTS LIVE BETTER" matching the screenshot */}
      <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-3.5 border border-slate-800/80 shadow-lg">
        {/* Neon accent slash */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#39d353]/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-20 h-20 opacity-30">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#39d353]">
            <polygon points="20,100 70,0 100,0 50,100" fill="currentColor" opacity="0.4" />
            <polygon points="0,100 40,20 60,20 20,100" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-[15px] font-black italic tracking-tighter text-white font-display leading-tight uppercase">
            Sports
          </div>
          <div className="text-[16px] font-black italic tracking-tight text-[#39d353] font-display leading-none uppercase">
            Live Better
          </div>

          {/* Running Athlete Silhouette */}
          <div className="mt-2 flex items-center justify-center py-1">
            <svg viewBox="0 0 120 100" className="w-24 h-20 text-[#39d353] drop-shadow-[0_0_8px_rgba(57,211,83,0.5)]" fill="currentColor">
              {/* Runner silhouette */}
              <circle cx="75" cy="18" r="9" fill="#39d353" />
              <path
                d="M68 28 L54 44 L40 40 L34 46 L46 54 L58 46 L62 58 L46 76 L52 82 L72 64 L74 48 L84 56 L94 50 L90 42 L80 46 L72 32 Z"
                fill="#39d353"
              />
              <path
                d="M64 58 L78 78 L80 94 L88 94 L86 76 L72 58 Z"
                fill="#39d353"
              />
              {/* Motion lines */}
              <line x1="10" y1="45" x2="32" y2="45" stroke="#39d353" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <line x1="18" y1="60" x2="42" y2="60" stroke="#39d353" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              <line x1="28" y1="75" x2="48" y2="75" stroke="#39d353" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>

          <div className="text-[10px] text-slate-400 font-medium text-center">
            Performa Maksimal Setiap Hari
          </div>
        </div>
      </div>
    </aside>
  );
};
