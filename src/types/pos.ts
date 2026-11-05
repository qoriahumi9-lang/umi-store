export type Category = 'Semua' | 'Sepatu' | 'Baju' | 'Jersey' | 'Celana' | 'Jaket' | 'Aksesoris';

export type PaymentMethod = 'tunai' | 'transfer' | 'qris';

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'Semua'>;
  price: number;
  stock: number;
  sku: string;
  sizes: string[];
  defaultSize: string;
  image: string;
  description?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: Exclude<Category, 'Semua'>;
  size: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Transaction {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  cashier: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  change: number;
  status: 'Lunas' | 'Dibatalkan';
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  address: string;
  phone: string;
  taxRate: number; // e.g. 11%
  enableTax: boolean;
  cashierName: string;
  receiptFooter: string;
}
