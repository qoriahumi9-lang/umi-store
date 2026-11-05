import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { StoreSettings } from '../../types/pos';
import { INITIAL_SETTINGS } from '../../data/initialData';

interface SettingsViewProps {
  settings: StoreSettings;
  setSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, setSettings }) => {
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    setFormData(INITIAL_SETTINGS);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-110px)] text-white max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black font-display text-white">
            Pengaturan Sistem Kasir
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Konfigurasi identitas toko, pajak pertambahan nilai (PPN), dan format struk cetak
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold animate-in fade-in">
            <CheckCircle size={15} />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0f1a36] border border-slate-800/80 rounded-xl p-5 shadow-lg space-y-5 text-xs">
        {/* Store Identity */}
        <div>
          <h3 className="text-sm font-bold text-white font-display pb-2 border-b border-slate-800 flex items-center gap-2">
            <Settings size={16} className="text-[#39d353]" />
            <span>Identitas Toko & Kasir</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Nama Toko</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold focus:outline-none focus:border-[#39d353]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tagline / Slogan</label>
              <input
                type="text"
                value={formData.storeTagline}
                onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Nama Kasir Bertugas</label>
              <input
                type="text"
                value={formData.cashierName}
                onChange={(e) => setFormData({ ...formData, cashierName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold focus:outline-none focus:border-[#39d353]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#39d353]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-bold mb-1">Alamat Lengkap Toko</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#39d353]"
              />
            </div>
          </div>
        </div>

        {/* Tax Configuration */}
        <div>
          <h3 className="text-sm font-bold text-white font-display pb-2 border-b border-slate-800">
            Pajak Pertambahan Nilai (PPN)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div>
                <div className="font-bold text-white">Aktifkan Pajak (PPN)</div>
                <div className="text-[11px] text-slate-400">Hitung otomatis pada keranjang belanja</div>
              </div>
              <input
                type="checkbox"
                checked={formData.enableTax}
                onChange={(e) => setFormData({ ...formData, enableTax: e.target.checked })}
                className="w-5 h-5 accent-[#39d353] rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tarif Pajak (%)</label>
              <input
                type="number"
                min={0}
                max={50}
                value={formData.taxRate}
                disabled={!formData.enableTax}
                onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-[#39d353] disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Receipt Footer Message */}
        <div>
          <h3 className="text-sm font-bold text-white font-display pb-2 border-b border-slate-800">
            Catatan Kaki Struk (Footer Struk)
          </h3>

          <div className="mt-3">
            <label className="block text-slate-300 font-bold mb-1">Pesan Penutup / Syarat Garansi</label>
            <textarea
              rows={3}
              value={formData.receiptFooter}
              onChange={(e) => setFormData({ ...formData, receiptFooter: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-[#39d353]"
            />
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw size={14} />
            <span>Reset Default</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39d353] hover:bg-[#2fc047] text-slate-950 text-xs font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Save size={15} />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
