import React, { useState, useEffect } from 'react';
import { X, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '../data/initialData';

interface QRISModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export const QRISModal: React.FC<QRISModalProps> = ({ isOpen, onClose, total, onSuccess }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 minutes
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(300);
      setIsProcessing(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulateScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-sm rounded-2xl p-5 text-white shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* QRIS Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="bg-white text-slate-950 font-black px-2 py-0.5 rounded text-xs tracking-tighter">
            QRIS
          </div>
          <span className="text-xs text-slate-400 font-bold">Standar Pembayaran Nasional</span>
        </div>

        <h3 className="text-lg font-black font-display text-white mt-1">
          SPORTWEAR STORE
        </h3>
        <p className="text-[11px] text-slate-400 font-mono">
          NMID: ID1020304050607 • Terminal 01
        </p>

        {/* Amount Box */}
        <div className="my-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
          <span className="text-[11px] text-slate-400 font-medium">Nominal Transaksi:</span>
          <div className="text-xl font-black text-[#39d353] font-mono mt-0.5">
            {formatRupiah(total)}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mx-auto my-1 border-2 border-slate-200">
          <div className="w-48 h-48 relative flex items-center justify-center">
            {/* SVG Authentic QRIS Style QR Code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              {/* Corner 1 */}
              <rect x="0" y="0" width="28" height="28" fill="black" />
              <rect x="4" y="4" width="20" height="20" fill="white" />
              <rect x="8" y="8" width="12" height="12" fill="black" />
              {/* Corner 2 */}
              <rect x="72" y="0" width="28" height="28" fill="black" />
              <rect x="76" y="4" width="20" height="20" fill="white" />
              <rect x="80" y="8" width="12" height="12" fill="black" />
              {/* Corner 3 */}
              <rect x="0" y="72" width="28" height="28" fill="black" />
              <rect x="4" y="76" width="20" height="20" fill="white" />
              <rect x="8" y="80" width="12" height="12" fill="black" />

              {/* Data modules */}
              <rect x="36" y="8" width="6" height="6" fill="black" />
              <rect x="48" y="8" width="6" height="6" fill="black" />
              <rect x="58" y="8" width="6" height="6" fill="black" />
              <rect x="36" y="20" width="6" height="6" fill="black" />
              <rect x="48" y="20" width="6" height="6" fill="black" />

              <rect x="8" y="36" width="6" height="6" fill="black" />
              <rect x="20" y="36" width="6" height="6" fill="black" />
              <rect x="8" y="48" width="6" height="6" fill="black" />
              <rect x="20" y="48" width="6" height="6" fill="black" />
              <rect x="8" y="58" width="6" height="6" fill="black" />

              <rect x="36" y="36" width="6" height="6" fill="black" />
              <rect x="48" y="36" width="6" height="6" fill="black" />
              <rect x="58" y="36" width="6" height="6" fill="black" />
              <rect x="72" y="36" width="6" height="6" fill="black" />
              <rect x="84" y="36" width="6" height="6" fill="black" />

              <rect x="36" y="48" width="6" height="6" fill="black" />
              <rect x="58" y="48" width="6" height="6" fill="black" />
              <rect x="72" y="48" width="6" height="6" fill="black" />
              <rect x="84" y="48" width="6" height="6" fill="black" />

              <rect x="36" y="58" width="6" height="6" fill="black" />
              <rect x="48" y="58" width="6" height="6" fill="black" />
              <rect x="84" y="58" width="6" height="6" fill="black" />

              <rect x="36" y="72" width="6" height="6" fill="black" />
              <rect x="48" y="72" width="6" height="6" fill="black" />
              <rect x="58" y="72" width="6" height="6" fill="black" />
              <rect x="72" y="72" width="6" height="6" fill="black" />
              <rect x="84" y="72" width="6" height="6" fill="black" />

              <rect x="36" y="84" width="6" height="6" fill="black" />
              <rect x="58" y="84" width="6" height="6" fill="black" />
              <rect x="72" y="84" width="6" height="6" fill="black" />
              <rect x="84" y="84" width="6" height="6" fill="black" />
            </svg>

            {/* Center QRIS icon badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-red-600 flex items-center justify-center shadow-md">
                <span className="text-[8px] font-black text-red-600 leading-none">Q</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timer & Supported e-wallets */}
        <div className="mt-2 text-xs text-slate-400">
          Berlaku hingga: <span className="text-white font-mono font-bold">{timerStr}</span>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, Dana</span>
        </div>

        {/* Simulate Payment Button */}
        <button
          onClick={handleSimulateScan}
          disabled={isProcessing}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#39d353] hover:bg-[#2fc047] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(57,211,83,0.3)] transition-all cursor-pointer"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Memverifikasi Pembayaran...</span>
            </span>
          ) : (
            <>
              <CheckCircle size={15} />
              <span>Simulasikan Scan & Bayar Sukses</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
