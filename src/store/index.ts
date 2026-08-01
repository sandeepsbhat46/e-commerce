import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import type { CartItem, Role, User } from "@/types";

interface AuthState {
  user: User | null;
  login: (email: string, role?: Role) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, role = "customer") => {
        const user = await api.login(email, role);
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    { name: "mkt-auth" },
  ),
);

interface CartState {
  items: CartItem[];
  coupon: string | null;
  add: (item: CartItem) => void;
  remove: (productId: string, variant?: string) => void;
  setQty: (productId: string, qty: number, variant?: string) => void;
  applyCoupon: (code: string | null) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex(
            (i) => i.productId === item.productId && i.variant === item.variant,
          );
          if (idx > -1) {
            const items = [...s.items];
            items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
            return { items };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, variant) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.productId === productId && i.variant === variant)),
        })),
      setQty: (productId, qty, variant) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, qty: Math.max(1, qty) }
              : i,
          ),
        })),
      applyCoupon: (code) => set({ coupon: code }),
      clear: () => set({ items: [], coupon: null }),
    }),
    { name: "mkt-cart" },
  ),
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((s) => ({ ids: s.ids.filter((i) => i !== id) })),
    }),
    { name: "mkt-wishlist" },
  ),
);

export const cartTotals = (items: CartItem[], coupon: string | null, shipping = 0) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;
  if (coupon === "WELCOME10") discount = subtotal * 0.1;
  if (coupon === "SUMMER25" && subtotal >= 120) discount = subtotal * 0.25;
  if (coupon === "BOOKS15") discount = subtotal * 0.15;
  const taxed = Math.max(0, subtotal - discount);
  const tax = taxed * 0.08;
  return {
    subtotal,
    discount,
    tax,
    shipping,
    total: taxed + tax + shipping,
  };
};

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
