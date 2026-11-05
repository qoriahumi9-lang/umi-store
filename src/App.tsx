/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { ProductCatalog } from './components/ProductCatalog';
import { CartPanel } from './components/CartPanel';
import { FooterBar } from './components/FooterBar';
import { SizeSelectModal } from './components/SizeSelectModal';
import { ReceiptModal } from './components/ReceiptModal';
import { QRISModal } from './components/QRISModal';
import { DashboardView } from './components/views/DashboardView';
import { ProductView } from './components/views/ProductView';
import { ReportView } from './components/views/ReportView';
import { SettingsView } from './components/views/SettingsView';
import {
  INITIAL_PRODUCTS,
  INITIAL_CART,
  INITIAL_SETTINGS,
  INITIAL_TRANSACTIONS,
  formatRupiah,
} from './data/initialData';
import { Product, CartItem, PaymentMethod, Transaction, StoreSettings } from './types/pos';
import { sounds } from './utils/sound';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

export default function App() {
  // Core state
  const [activeTab, setActiveTab] = useState<TabType>('kasir');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Cart & Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('tunai');
  const [cashReceived, setCashReceived] = useState<number>(2000000); // 2.000.000 as in screenshot

  // Daily statistics matching the screenshot
  const [todayTransactionCount, setTodayTransactionCount] = useState<number>(12);
  const [todaySalesRevenue, setTodaySalesRevenue] = useState<number>(5250000);

  // Modals
  const [selectedProductForSize, setSelectedProductForSize] = useState<Product | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [isQRISOpen, setIsQRISOpen] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lastOrderNumber, setLastOrderNumber] = useState<string>('TRX-20251103-0012');

  // Add product to cart handler
  const handleAddToCartClick = (product: Product) => {
    sounds.playAddToCart();
    // If product has multiple sizes, open size modal
    if (product.sizes.length > 1) {
      setSelectedProductForSize(product);
    } else {
      // Single size (e.g. All Size), add directly
      handleConfirmAdd(product, product.defaultSize || 'All', 1);
    }
  };

  const handleConfirmAdd = (product: Product, selectedSize: string, quantity: number) => {
    sounds.playAddToCart();
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        const current = next[existingIndex];
        const newQty = current.quantity + quantity;
        next[existingIndex] = {
          ...current,
          quantity: newQty,
          total: newQty * current.price,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          name: product.name,
          category: product.category,
          size: selectedSize,
          price: product.price,
          quantity: quantity,
          total: product.price * quantity,
          image: product.image,
        };
        return [...prev, newItem];
      }
    });
  };

  // Update item quantity
  const handleUpdateQty = (itemId: string, delta: number) => {
    sounds.playAddToCart();
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              total: newQty * item.price,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm('Kosongkan semua item di keranjang belanja?')) {
      setCart([]);
      setCashReceived(0);
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = settings.enableTax ? Math.round(subtotal * (settings.taxRate / 100)) : 0;
  const total = subtotal + tax;

  // Process payment flow
  const handleProcessPayment = () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'qris') {
      setIsQRISOpen(true);
      return;
    }

    finalizeTransaction();
  };

  const finalizeTransaction = () => {
    sounds.playSuccess();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#39d353', '#ffffff', '#22c55e', '#3b82f6'],
      });
    } catch {
      // Confetti fallback
    }

    const orderNum = `TRX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(
      todayTransactionCount + 1
    ).padStart(4, '0')}`;
    setLastOrderNumber(orderNum);

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = now.toTimeString().slice(0, 8);

    const newTx: Transaction = {
      id: `trx-${Date.now()}`,
      orderNumber: orderNum,
      date: dateStr,
      time: timeStr,
      cashier: settings.cashierName,
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod,
      amountPaid: paymentMethod === 'tunai' ? cashReceived : total,
      change: paymentMethod === 'tunai' ? Math.max(0, cashReceived - total) : 0,
      status: 'Lunas',
    };

    // Update sales metrics
    setTodayTransactionCount((prev) => prev + 1);
    setTodaySalesRevenue((prev) => prev + total);

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItemsForProd = cart.filter((ci) => ci.productId === prod.id);
        const qtyDeducted = cartItemsForProd.reduce((sum, ci) => sum + ci.quantity, 0);
        return {
          ...prod,
          stock: Math.max(0, prod.stock - qtyDeducted),
        };
      })
    );

    // Add to transactions log
    setTransactions((prev) => [newTx, ...prev]);

    // Open receipt modal
    setIsReceiptOpen(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setCashReceived(0);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070d1d] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <Header settings={settings} />

      {/* Main Center Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={() => setIsLocked(true)}
        />

        {/* Dynamic Center Content according to activeTab */}
        <main className="flex-1 flex overflow-hidden bg-[#0a1226]">
          {activeTab === 'kasir' && (
            <>
              {/* Product Catalog & Filter */}
              <ProductCatalog
                products={products}
                onAddToCart={handleAddToCartClick}
              />

              {/* Right Shopping Cart Panel */}
              <CartPanel
                cart={cart}
                settings={settings}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                cashReceived={cashReceived}
                setCashReceived={setCashReceived}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onOpenReceipt={() => setIsReceiptOpen(true)}
                onProcessPayment={handleProcessPayment}
              />
            </>
          )}

          {activeTab === 'dashboard' && (
            <div className="flex-1 overflow-auto">
              <DashboardView transactions={transactions} products={products} />
            </div>
          )}

          {activeTab === 'produk' && (
            <div className="flex-1 overflow-auto">
              <ProductView products={products} setProducts={setProducts} />
            </div>
          )}

          {activeTab === 'laporan' && (
            <div className="flex-1 overflow-auto">
              <ReportView transactions={transactions} settings={settings} />
            </div>
          )}

          {activeTab === 'pengaturan' && (
            <div className="flex-1 overflow-auto">
              <SettingsView settings={settings} setSettings={setSettings} />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Status Footer */}
      <FooterBar
        cashierName={settings.cashierName}
        todayCount={todayTransactionCount}
        todayRevenue={todaySalesRevenue}
      />

      {/* Size Selection Modal */}
      <SizeSelectModal
        product={selectedProductForSize}
        onClose={() => setSelectedProductForSize(null)}
        onConfirm={handleConfirmAdd}
      />

      {/* Thermal Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        items={cart.length > 0 ? cart : INITIAL_CART}
        settings={settings}
        orderNumber={lastOrderNumber}
        paymentMethod={paymentMethod}
        amountPaid={paymentMethod === 'tunai' ? cashReceived : total}
        onNewTransaction={handleNewTransaction}
      />

      {/* QRIS Payment Modal */}
      <QRISModal
        isOpen={isQRISOpen}
        onClose={() => setIsQRISOpen(false)}
        total={total}
        onSuccess={() => {
          setIsQRISOpen(false);
          finalizeTransaction();
        }}
      />

      {/* Cashier Lock Screen Modal */}
      {isLocked && (
        <div className="fixed inset-0 z-50 bg-[#070d1d]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 max-w-sm w-full rounded-2xl p-6 text-center text-white shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#39d353]/20 text-[#39d353] flex items-center justify-center mx-auto mb-3">
              <Lock size={26} />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Sesi Kasir Dikunci</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Shift kasir aktif: <strong className="text-white">{settings.cashierName}</strong>
            </p>

            <button
              onClick={() => setIsLocked(false)}
              className="w-full py-2.5 rounded-xl bg-[#39d353] hover:bg-[#2fc047] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <LogIn size={15} />
              <span>Buka Kunci Kasir</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
