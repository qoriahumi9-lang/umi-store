import React from 'react';
import { X, Printer, Check, QrCode } from 'lucide-react';
import { CartItem, PaymentMethod, StoreSettings } from '../types/pos';
import { formatRupiah } from '../data/initialData';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: StoreSettings;
  orderNumber: string;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  dateTimeStr?: string;
  onNewTransaction?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  orderNumber,
  paymentMethod,
  amountPaid,
  dateTimeStr,
  onNewTransaction,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = settings.enableTax ? Math.round(subtotal * (settings.taxRate / 100)) : 0;
  const total = subtotal + tax;
  const change = Math.max(0, amountPaid - total);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl p-5 text-white shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Printer size={18} className="text-[#39d353]" />
            <h3 className="text-base font-bold text-white font-display">
              Struk Pembayaran Thermal (80mm)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Printable Thermal Receipt Card */}
        <div className="my-4 overflow-y-auto pr-1 flex justify-center">
          <div
            id="printable-receipt"
            className="w-full max-w-[360px] bg-white text-slate-900 p-5 rounded-lg shadow-xl font-mono text-xs border border-slate-300"
          >
            {/* Store Lockup */}
            <div className="text-center pb-3 border-b border-dashed border-slate-400">
              <div className="font-black text-lg tracking-wider text-black">
                {settings.storeName}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                {settings.storeTagline}
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                {settings.address}
              </div>
              <div className="text-[10px] text-slate-600">
                Telp: {settings.phone}
              </div>
            </div>

            {/* Transaction Metadata */}
            <div className="py-2.5 border-b border-dashed border-slate-400 text-[11px] space-y-0.5">
              <div className="flex justify-between">
                <span className="text-slate-600">No. Trx:</span>
                <span className="font-bold">{orderNumber || 'TRX-20251103-0012'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Waktu:</span>
                <span>{dateTimeStr || '03 Nov 2025 20:15:32'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Kasir:</span>
                <span className="font-semibold">{settings.cashierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Metode:</span>
                <span className="font-bold uppercase">{paymentMethod}</span>
              </div>
            </div>

            {/* Itemized List */}
            <div className="py-2.5 border-b border-dashed border-slate-400 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="text-[11px]">
                  <div className="font-bold flex justify-between">
                    <span>{item.name}</span>
                    <span>{formatRupiah(item.total)}</span>
                  </div>
                  <div className="text-slate-600 text-[10px] flex justify-between">
                    <span>
                      Ukuran: {item.size} • {item.quantity} x {formatRupiah(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="py-2.5 border-b border-dashed border-slate-400 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal:</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {settings.enableTax && (
                <div className="flex justify-between text-slate-700">
                  <span>PPN ({settings.taxRate}%):</span>
                  <span>{formatRupiah(tax)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-slate-300">
                <span>TOTAL:</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-600">Bayar ({paymentMethod.toUpperCase()}):</span>
                <span>{formatRupiah(amountPaid || total)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-600">Kembalian:</span>
                <span>{formatRupiah(change)}</span>
              </div>
            </div>

            {/* Barcode & Footer note */}
            <div className="text-center pt-3 text-[10px] space-y-2 text-slate-600">
              {/* Simulated barcode */}
              <div className="flex justify-center items-center py-1">
                <div className="h-8 flex items-center gap-[2px]">
                  {[3,1,2,4,1,3,2,1,4,2,3,1,2,4,1,3,1,2,3,4,1,2,3,1].map((w, i) => (
                    <div
                      key={i}
                      className="bg-black h-7"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="font-mono text-[9px] tracking-widest text-slate-500">
                *{orderNumber}*
              </div>

              <p className="whitespace-pre-line text-slate-700 leading-relaxed font-sans text-[10px]">
                {settings.receiptFooter}
              </p>
              <div className="font-bold text-slate-900 text-[10px]">
                *** LUNAS ***
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
          {onNewTransaction && (
            <button
              onClick={() => {
                onClose();
                onNewTransaction();
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
            >
              Transaksi Baru
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-[#39d353] hover:bg-[#2fc047] text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-[0_2px_12px_rgba(57,211,83,0.3)] transition-all cursor-pointer"
            >
              <Printer size={15} />
              <span>Cetak Struk Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
