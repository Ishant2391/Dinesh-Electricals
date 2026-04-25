import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  subCategory?: string;
  brand?: string;
  stock: number;
  rating: number;
  reviews: number;
  features: string[];
  specifications?: Record<string, string>;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  isSale: boolean;
  saleEnds?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
    type?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  orders: string[];
  createdAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: CartItem['selectedVariant']) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, variant) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity, selectedVariant: variant }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'dinesh-electricals-cart',
    }
  )
);

interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      isInWishlist: (productId) => get().items.includes(productId),
      toggleItem: (productId) => {
        if (get().isInWishlist(productId)) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },
    }),
    {
      name: 'dinesh-electricals-wishlist',
    }
  )
);

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  updateAddress: (addressId: string, address: Partial<Address>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addAddress: (address) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, addresses: [...user.addresses, address] } });
        }
      },
      removeAddress: (addressId) => {
        const user = get().user;
        if (user) {
          set({
            user: {
              ...user,
              addresses: user.addresses.filter((a) => a.id !== addressId),
            },
          });
        }
      },
      updateAddress: (addressId, address) => {
        const user = get().user;
        if (user) {
          set({
            user: {
              ...user,
              addresses: user.addresses.map((a) =>
                a.id === addressId ? { ...a, ...address } : a
              ),
            },
          });
        }
      },
    }),
    {
      name: 'dinesh-electricals-user',
    }
  )
);

interface SearchStore {
  query: string;
  results: Product[];
  recentSearches: string[];
  setQuery: (query: string) => void;
  setResults: (results: Product[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      query: '',
      results: [],
      recentSearches: [],
      setQuery: (query) => set({ query }),
      setResults: (results) => set({ results }),
      addRecentSearch: (query) => {
        const recent = get().recentSearches.filter((s) => s !== query);
        set({ recentSearches: [query, ...recent].slice(0, 10) });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'dinesh-electricals-search',
    }
  )
);

interface UIStore {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleCart: () => void;
  toggleLoginModal: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  isLoginModalOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  openQuickView: (product) => set({ isQuickViewOpen: true, quickViewProduct: product }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),
}));

// Admin Product Store for managing products
interface AdminProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useAdminProductStore = create<AdminProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        set({ products: [...get().products, product] });
      },
      updateProduct: (id, updatedProduct) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        });
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'dinesh-electricals-admin-products',
    }
  )
);