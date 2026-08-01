import type { Address, Category, Coupon, Order, Product, Review, Role, User } from "@/types";

// Backend is a separate static-data Express server (see /server) — no database.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request to ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface DailyRevenuePoint {
  day: string;
  revenue: number;
  orders: number;
}

export interface TrafficSource {
  name: string;
  value: number;
}

export const api = {
  categories: () => request<Category[]>("/api/categories"),
  brands: () => request<string[]>("/api/brands"),

  products: () => request<Product[]>("/api/products"),
  product: (slug: string) => request<Product>(`/api/products/${slug}`),
  productReviews: (productId: string) => request<Review[]>(`/api/products/${productId}/reviews`),

  users: () => request<User[]>("/api/users"),
  login: (email: string, role: Role = "customer") =>
    request<User>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }),

  orders: () => request<Order[]>("/api/orders"),
  addresses: () => request<Address[]>("/api/addresses"),
  coupons: () => request<Coupon[]>("/api/coupons"),
  reviews: () => request<Review[]>("/api/reviews"),
  testimonials: () => request<Testimonial[]>("/api/testimonials"),

  analytics: {
    revenueByMonth: () => request<RevenuePoint[]>("/api/analytics/revenue-by-month"),
    dailyRevenue: () => request<DailyRevenuePoint[]>("/api/analytics/daily-revenue"),
    trafficSources: () => request<TrafficSource[]>("/api/analytics/traffic-sources"),
  },
};
