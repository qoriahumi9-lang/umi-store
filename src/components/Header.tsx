import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Minus, Square, X, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { StoreSettings } from '../types/pos';

interface HeaderProps {
  settings: StoreSettings;
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Indonesian 24h time format HH:mm:ss
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);

      // Indonesian date formatting
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      
      const dayName = days[now.getDay()];
      const dayNum = String(now.getDate()).padStart(2, '0');
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();
      
      setDateStr(`${dayName}, ${dayNum} ${monthName} ${year}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="bg-[#0b1329] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-white select-none">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        {/* Sneaker outline logo icon */}
        <div className="w-12 h-12 flex items-center justify-center bg-slate-900/80 border border-slate-700/60 rounded-lg p-1.5 shadow-inner">
          <svg viewBox="0 0 64 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
            <path
              d="M3 24C3 24 10 16 19 14C23 13 28 8 36 6C42 4.5 48 5 52 9C55 12 56 16 58 19C60 22 62 25 61 28C60 30 55 31 46 31C32 31 16 31 4 31C3 31 2.5 28 3 24Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 24C16 23 28 23 44 23C51 23 58 24 60 26"
              stroke="#39d353"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 10L30 14M38 12L34 16M42 14L38 18"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M20 20C24 17 32 17 38 21"
              stroke="#39d353"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl md:text-2xl font-black italic tracking-wide text-white font-display">
              SPORTWEAR
            </span>
            <span className="text-xl md:text-2xl font-black italic tracking-wide text-[#39d353] font-display">
              STORE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
            {settings.storeTagline}
          </p>
        </div>
      </div>

      {/* Center: Showcase Banner (Sneaker & Sport Gear showcase preview as seen in screenshot) */}
      <div className="hidden lg:flex items-center gap-4 px-4 py-1 bg-slate-900/60 rounded-lg border border-slate-800/80 max-w-md">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/nike_air_max_1793836773065.jpg"
            alt="Showcase Sneaker"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain rounded bg-white/90 p-0.5 border border-slate-700"
          />
          <img
            src="/src/assets/images/nike_drifit_tee_1793836774530.jpg"
            alt="Showcase Apparel"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain rounded bg-white/90 p-0.5 border border-slate-700"
          />
          <img
            src="/src/assets/images/barcelona_jersey_1793836775572.jpg"
            alt="Showcase Jersey"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain rounded bg-white/90 p-0.5 border border-slate-700"
          />
        </div>
        <div className="text-xs border-l border-slate-700 pl-3">
          <div className="text-[#39d353] font-bold">Koleksi Original 100%</div>
          <div className="text-slate-400 text-[11px]">Garansi Resmi & Stok Real-Time</div>
        </div>
      </div>

      {/* Right: Window Controls, Status, Date & Clock */}
      <div className="flex flex-col items-end gap-1.5">
        {/* Top Mini Window Control Bar */}
        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Suara Dinonaktifkan' : 'Suara Aktif'}
            className="hover:text-white p-1 rounded transition-colors"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            onClick={toggleFullscreen}
            title="Layar Penuh"
            className="hover:text-white p-1 rounded transition-colors"
          >
            {isFullscreen ? <Square size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            onClick={() => {}}
            title="Minimize"
            className="hover:text-white p-1 rounded transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => {}}
            title="Tutup Kasir"
            className="hover:text-red-400 p-1 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Status, Date, & Time */}
        <div className="flex items-center gap-4 text-xs">
          {/* Active Status Indicator */}
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39d353] shadow-[0_0_8px_#39d353] animate-pulse"></span>
            <span className="text-slate-200">Sistem Aktif</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-slate-300">
            <Calendar size={13} className="text-slate-400" />
            <span className="font-mono">{dateStr || 'Sen, 03 Nov 2025'}</span>
          </div>

          {/* Live Clock */}
          <div className="flex items-center gap-1 text-slate-200 font-bold font-mono">
            <Clock size={13} className="text-[#39d353]" />
            <span className="tracking-wider">{time || '20:15:32'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
