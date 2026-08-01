export type Role = "customer" | "seller" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "banned";
  avatar: string;
  joinedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  children: { id: string; name: string; slug: string }[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
  status: "pending" | "approved" | "rejected";
  sellerReply?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  sku: string;
  category: string;
  sellerId: string;
  sellerName: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  status: "active" | "draft" | "archived";
  images: string[];
  description: string;
  specs: Record<string, string>;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  createdAt: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  variant?: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  payment: string;
  tracking?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  used: number;
  maxUses: number;
  expiry: string;
  active: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  qty: number;
  variant?: string;
}
