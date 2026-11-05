import React, { useState, useId } from 'react';
import { ShoppingCart, Trash2, CreditCard, QrCode, ArrowLeftRight, CheckCircle2, Printer, Plus, Minus } from 'lucide-react';
import { CartItem, PaymentMethod, StoreSettings } from '../types/pos';
import { formatRupiah } from '../data/initialData';

interface CartPanelProps {
  cart: CartItem[];
  settings: StoreSettings;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  cashReceived: number;
  setCashReceived: (amount: number) => void;
  onUpdateQty: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenReceipt: () => void;
  onProcessPayment: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({
  cart,
  settings,
  paymentMethod,
  setPaymentMethod,
  cashReceived,
  setCashReceived,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenReceipt,
  onProcessPayment,
}) => {
  const [cashInput, setCashInput] = useState<string>(cashReceived ? cashReceived.toString() : '');
  const cashInputId = useId();

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = settings.enableTax ? Math.round(subtotal * (settings.taxRate / 100)) : 0;
  const total = subtotal + tax;

  const change = Math.max(0, cashReceived - total);
  const isInsufficient = paymentMethod === 'tunai' && cashReceived < total && total > 0;

  const handleCashChange = (val: string) => {
    const rawVal = val.replace(/\D/g, '');
    setCashInput(rawVal);
    setCashReceived(Number(rawVal) || 0);
  };

  const handlePresetCash = (amount: number) => {
    setCashInput(amount.toString());
    setCashReceived(amount);
  };

  return (
    <div className="w-full xl:w-[450px] bg-[#0c162f] border-l border-slate-800/80 flex flex-col justify-between p-3.5 select-none shrink-0 text-white min-h-[calc(100vh-62px)]">
      {/* Top Cart Header */}
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-[#39d353]" size={20} />
            <h2 className="text-base font-extrabold tracking-wider uppercase font-display text-white">
              Keranjang Belanja
            </h2>
            <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClearCart}
            disabled={cart.length === 0}
            title="Kosongkan Keranjang"
            className="p-1.5 rounded-md text-red-400 hover:text-white hover:bg-red-500/80 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Cart Items Table */}
        <div className="mt-2.5 max-h-[260px] overflow-y-auto pr-1">
          {cart.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center">
              <ShoppingCart size={36} className="text-slate-600 mb-2 stroke-[1.5]" />
              <p className="text-sm font-medium">Keranjang masih kosong</p>
              <p className="text-xs text-slate-600 mt-1">Pilih produk di samping untuk menambah</p>
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 font-semibold text-[11px]">
                  <th className="pb-2 text-left w-6">No</th>
                  <th className="pb-2 text-left">Nama Produk</th>
                  <th className="pb-2 text-center w-12">Ukuran</th>
                  <th className="pb-2 text-right">Harga</th>
                  <th className="pb-2 text-center w-20">Qty</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cart.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 text-slate-400 font-mono">{index + 1}</td>
                    <td className="py-2.5 pr-1">
                      <div className="font-semibold text-slate-200 line-clamp-1">{item.name}</div>
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="bg-slate-800/90 text-slate-300 font-mono px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {item.size}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-300">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 bg-slate-900/90 border border-slate-700/60 rounded px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-bold text-slate-100 font-mono w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-100">
                      {formatRupiah(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Cart Summary & Checkout Controls */}
      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2.5">
        {/* Subtotal & Tax */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-400 font-medium">
            <span>Subtotal</span>
            <span className="font-mono text-slate-200">{formatRupiah(subtotal)}</span>
          </div>
          {settings.enableTax && (
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Pajak ({settings.taxRate}%)</span>
              <span className="font-mono text-slate-200">{formatRupiah(tax)}</span>
            </div>
          )}
        </div>

        {/* Total Belanja Highlight Banner */}
        <div className="bg-[#b7ff36] text-slate-950 px-3.5 py-2.5 rounded-lg flex items-center justify-between shadow-[0_2px_12px_rgba(183,255,54,0.3)]">
          <span className="font-black text-sm uppercase tracking-wide font-display">
            Total Belanja
          </span>
          <span className="font-black text-xl md:text-2xl font-mono tracking-tight">
            {formatRupiah(total)}
          </span>
        </div>

        {/* Payment Method Selector */}
        <div className="pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold mb-1.5">
            <CreditCard size={14} className="text-[#39d353]" />
            <span>Metode Pembayaran :</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Tunai */}
            <button
              onClick={() => {
                setPaymentMethod('tunai');
                if (cashReceived === 0) {
                  setCashReceived(total);
                  setCashInput(total.toString());
                }
              }}
              className={`py-2 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'tunai'
                  ? 'bg-slate-800 border-[#39d353] text-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                paymentMethod === 'tunai' ? 'border-[#39d353] bg-[#39d353]' : 'border-slate-600'
              }`}>
                {paymentMethod === 'tunai' && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </span>
              <span>Tunai</span>
            </button>

            {/* Transfer */}
            <button
              onClick={() => setPaymentMethod('transfer')}
              className={`py-2 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'transfer'
                  ? 'bg-slate-800 border-[#39d353] text-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                paymentMethod === 'transfer' ? 'border-[#39d353] bg-[#39d353]' : 'border-slate-600'
              }`}>
                {paymentMethod === 'transfer' && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </span>
              <span>Transfer</span>
            </button>

            {/* QRIS */}
            <button
              onClick={() => setPaymentMethod('qris')}
              className={`py-2 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'qris'
                  ? 'bg-slate-800 border-[#39d353] text-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <QrCode size={13} />
              <span>QRIS</span>
            </button>
          </div>
        </div>

        {/* Cash Calculation Fields */}
        {paymentMethod === 'tunai' && (
          <div className="space-y-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            {/* Uang Diterima Input */}
            <div className="flex items-center justify-between gap-2">
              <label htmlFor={cashInputId} className="flex items-center gap-1.5 text-xs text-slate-300 font-bold whitespace-nowrap">
                <span className="w-4 h-4 rounded bg-[#39d353]/20 text-[#39d353] flex items-center justify-center text-[10px] font-black">
                  Rp
                </span>
                <span>Uang Diterima :</span>
              </label>
              <div className="relative flex-1 max-w-[190px]">
                <input
                  id={cashInputId}
                  type="text"
                  value={cashInput}
                  onChange={(e) => handleCashChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white text-slate-900 text-right px-2.5 py-1.5 rounded font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#39d353]"
                />
              </div>
            </div>

            {/* Quick Bill Presets */}
            <div className="flex flex-wrap items-center gap-1.5 justify-end pt-1">
              <button
                type="button"
                onClick={() => handlePresetCash(total)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                Uang Pas
              </button>
              <button
                type="button"
                onClick={() => handlePresetCash(500000)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                500rb
              </button>
              <button
                type="button"
                onClick={() => handlePresetCash(1000000)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                1 Juta
              </button>
              <button
                type="button"
                onClick={() => handlePresetCash(2000000)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                2 Juta
              </button>
            </div>

            {/* Kembalian Row */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                <ArrowLeftRight size={13} className="text-[#39d353]" />
                <span>Kembalian :</span>
              </div>
              <div className={`font-mono font-black text-base ${isInsufficient ? 'text-amber-400' : 'text-[#39d353]'}`}>
                {isInsufficient ? `Kurang ${formatRupiah(total - cashReceived)}` : formatRupiah(change)}
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Info Box */}
        {paymentMethod === 'transfer' && (
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>BCA :</span>
              <span className="font-mono font-bold text-white">8800-1234-5678</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Mandiri :</span>
              <span className="font-mono font-bold text-white">137-00-9876543-2</span>
            </div>
            <div className="text-[11px] text-emerald-400 pt-1 text-center font-medium">
              Verifikasi transfer otomatis via sistem kasir
            </div>
          </div>
        )}

        {/* QRIS Info Box */}
        {paymentMethod === 'qris' && (
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-xs text-center space-y-1">
            <div className="text-slate-300 font-bold">QRIS GPN Nasional Aktif</div>
            <div className="text-[11px] text-slate-400">
              Klik &quot;Proses Pembayaran&quot; untuk menampilkan kode QR dinamis
            </div>
          </div>
        )}

        {/* Bottom Action Buttons: Cetak Struk & Proses Pembayaran */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Cetak Struk */}
          <button
            onClick={onOpenReceipt}
            disabled={cart.length === 0}
            className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <Printer size={15} />
            <span>Cetak Struk</span>
          </button>

          {/* Proses Pembayaran */}
          <button
            onClick={onProcessPayment}
            disabled={cart.length === 0 || isInsufficient}
            className={`py-2.5 px-3 rounded-lg font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
              cart.length === 0 || isInsufficient
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                : 'bg-[#39d353] hover:bg-[#2fc047] active:scale-[0.98] text-slate-950 shadow-[0_2px_12px_rgba(57,211,83,0.35)]'
            }`}
          >
            <CheckCircle2 size={16} className="stroke-[2.5]" />
            <span>Proses Pembayaran</span>
          </button>
        </div>
      </div>
    </div>
  );
};
