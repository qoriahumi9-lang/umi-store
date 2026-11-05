import { Product, CartItem, Transaction, StoreSettings } from '../types/pos';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nike-air-max',
    name: 'Nike Air Max',
    category: 'Sepatu',
    price: 1250000,
    stock: 12,
    sku: 'NK-AM-90',
    sizes: ['39', '40', '41', '42', '43', '44'],
    defaultSize: '42',
    image: '/src/assets/images/nike_air_max_1793836773065.jpg',
    description: 'Sepatu lari ikonik dengan bantalan udara Air Max yang empuk dan sol karet tahan lama.'
  },
  {
    id: 'adidas-ultraboost',
    name: 'Adidas Ultraboost',
    category: 'Sepatu',
    price: 1850000,
    stock: 8,
    sku: 'AD-UB-21',
    sizes: ['39', '40', '41', '42', '43', '44'],
    defaultSize: '41',
    image: '/src/assets/images/adidas_ultraboost_1793836774063.jpg',
    description: 'Kenyamanan luar biasa dengan midsole Boost responsif dan Primeknit fleksibel.'
  },
  {
    id: 'nike-drifit-tee',
    name: 'Nike Dri-FIT Tee',
    category: 'Baju',
    price: 350000,
    stock: 20,
    sku: 'NK-DF-01',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    image: '/src/assets/images/nike_drifit_tee_1793836774530.jpg',
    description: 'Bahan teknologi Dri-FIT yang menyerap keringat dan menjaga tubuh tetap sejuk saat berolahraga.'
  },
  {
    id: 'jersey-barcelona',
    name: 'Jersey Barcelona',
    category: 'Jersey',
    price: 275000,
    stock: 25,
    sku: 'FCB-HM-25',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    image: '/src/assets/images/barcelona_jersey_1793836775572.jpg',
    description: 'Jersey home resmi klub FC Barcelona dengan motif garis biru merah khas Catalan.'
  },
  {
    id: 'sport-shorts',
    name: 'Sport Shorts',
    category: 'Celana',
    price: 220000,
    stock: 16,
    sku: 'SPT-SH-09',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    image: '/src/assets/images/sport_shorts_1793836775341.jpg',
    description: 'Celana pendek olahraga ringan dengan kantong samping dan pinggang elastis bertali.'
  },
  {
    id: 'training-jacket',
    name: 'Training Jacket',
    category: 'Jaket',
    price: 550000,
    stock: 9,
    sku: 'TRN-JK-88',
    sizes: ['M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    image: '/src/assets/images/training_jacket_1793836777004.jpg',
    description: 'Jaket windbreaker training berresleting dengan hoodie dan bahan windproof premium.'
  },
  {
    id: 'puma-suede-classic',
    name: 'Puma Suede Classic',
    category: 'Sepatu',
    price: 975000,
    stock: 7,
    sku: 'PM-SD-02',
    sizes: ['39', '40', '41', '42', '43', '44'],
    defaultSize: '40',
    image: '/src/assets/images/puma_suede_1793836776948.jpg',
    description: 'Sneaker retro legendaris berbahan suede merah halus dengan formstrip kulit putih ikonik.'
  },
  {
    id: 'sport-socks',
    name: 'Sport Socks',
    category: 'Aksesoris',
    price: 85000,
    stock: 30,
    sku: 'NK-SK-WH',
    sizes: ['All Size'],
    defaultSize: 'All',
    image: '/src/assets/images/sport_socks_1793836775282.jpg',
    description: 'Kaos kaki crew sport empuk dengan bantalan tumit dan elastisitas antiselip.'
  }
];

export const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'nike-air-max',
    name: 'Nike Air Max',
    category: 'Sepatu',
    size: '42',
    price: 1250000,
    quantity: 1,
    total: 1250000,
    image: '/src/assets/images/nike_air_max_1793836773065.jpg'
  },
  {
    id: 'cart-2',
    productId: 'jersey-barcelona',
    name: 'Jersey Barcelona',
    category: 'Jersey',
    size: 'L',
    price: 275000,
    quantity: 1,
    total: 275000,
    image: '/src/assets/images/barcelona_jersey_1793836775572.jpg'
  },
  {
    id: 'cart-3',
    productId: 'sport-socks',
    name: 'Sport Socks',
    category: 'Aksesoris',
    size: 'All',
    price: 85000,
    quantity: 2,
    total: 170000,
    image: '/src/assets/images/sport_socks_1793836775282.jpg'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'SPORTWEAR STORE',
  storeTagline: 'Sepatu • Baju Olahraga • Perlengkapan Sport',
  address: 'Jl. Olahraga Sentosa No. 88, Menteng, Jakarta Pusat',
  phone: '0812-9876-5432',
  taxRate: 11,
  enableTax: true,
  cashierName: 'Admin',
  receiptFooter: 'Terima kasih telah berbelanja di SPORTWEAR STORE!\nBarang yang sudah dibeli dapat ditukar maksimal 3 hari dengan menyertakan struk pembelian.'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-1011',
    orderNumber: 'TRX-20251103-0009',
    date: '03 Nov 2025',
    time: '14:20:10',
    cashier: 'Admin',
    items: [
      {
        id: 'ci-1',
        productId: 'nike-drifit-tee',
        name: 'Nike Dri-FIT Tee',
        category: 'Baju',
        size: 'M',
        price: 350000,
        quantity: 2,
        total: 700000,
        image: '/src/assets/images/nike_drifit_tee_1793836774530.jpg'
      },
      {
        id: 'ci-2',
        productId: 'sport-shorts',
        name: 'Sport Shorts',
        category: 'Celana',
        size: 'L',
        price: 220000,
        quantity: 1,
        total: 220000,
        image: '/src/assets/images/sport_shorts_1793836775341.jpg'
      }
    ],
    subtotal: 920000,
    tax: 101200,
    total: 1021200,
    paymentMethod: 'qris',
    amountPaid: 1021200,
    change: 0,
    status: 'Lunas'
  },
  {
    id: 'TRX-1012',
    orderNumber: 'TRX-20251103-0010',
    date: '03 Nov 2025',
    time: '16:45:00',
    cashier: 'Admin',
    items: [
      {
        id: 'ci-3',
        productId: 'adidas-ultraboost',
        name: 'Adidas Ultraboost',
        category: 'Sepatu',
        size: '43',
        price: 1850000,
        quantity: 1,
        total: 1850000,
        image: '/src/assets/images/adidas_ultraboost_1793836774063.jpg'
      }
    ],
    subtotal: 1850000,
    tax: 203500,
    total: 2053500,
    paymentMethod: 'transfer',
    amountPaid: 2053500,
    change: 0,
    status: 'Lunas'
  },
  {
    id: 'TRX-1013',
    orderNumber: 'TRX-20251103-0011',
    date: '03 Nov 2025',
    time: '18:30:15',
    cashier: 'Admin',
    items: [
      {
        id: 'ci-4',
        productId: 'training-jacket',
        name: 'Training Jacket',
        category: 'Jaket',
        size: 'XL',
        price: 550000,
        quantity: 1,
        total: 550000,
        image: '/src/assets/images/training_jacket_1793836777004.jpg'
      },
      {
        id: 'ci-5',
        productId: 'puma-suede-classic',
        name: 'Puma Suede Classic',
        category: 'Sepatu',
        size: '41',
        price: 975000,
        quantity: 1,
        total: 975000,
        image: '/src/assets/images/puma_suede_1793836776948.jpg'
      }
    ],
    subtotal: 1525000,
    tax: 167750,
    total: 1692750,
    paymentMethod: 'tunai',
    amountPaid: 1700000,
    change: 7250,
    status: 'Lunas'
  }
];

export const CATEGORIES: { label: string; value: string }[] = [
  { label: 'Semua', value: 'Semua' },
  { label: 'Sepatu', value: 'Sepatu' },
  { label: 'Baju', value: 'Baju' },
  { label: 'Jersey', value: 'Jersey' },
  { label: 'Celana', value: 'Celana' },
  { label: 'Jaket', value: 'Jaket' },
  { label: 'Aksesoris', value: 'Aksesoris' }
];

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
