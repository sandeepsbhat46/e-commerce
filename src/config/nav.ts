import {
  BarChart3,
  Boxes,
  ClipboardList,
  FolderTree,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Tags,
  User,
  Users,
} from "lucide-react";
import type { NavItem } from "@/components/common/DashboardShell";

export const accountNav: NavItem[] = [
  { label: "Dashboard", to: "/account", icon: LayoutDashboard },
  { label: "My orders", to: "/account/orders", icon: Package },
  { label: "Wishlist", to: "/account/wishlist", icon: Heart },
  { label: "Addresses", to: "/account/addresses", icon: MapPin },
  { label: "Profile settings", to: "/account/profile", icon: User },
];

export const sellerNav: NavItem[] = [
  { label: "Dashboard", to: "/seller/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/seller/products", icon: Boxes },
  { label: "Add product", to: "/seller/products/new", icon: ShoppingBag },
  { label: "Orders", to: "/seller/orders", icon: ClipboardList },
  { label: "Analytics", to: "/seller/analytics", icon: BarChart3 },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Products", to: "/admin/products", icon: Boxes },
  { label: "Orders", to: "/admin/orders", icon: ClipboardList },
  { label: "Categories", to: "/admin/categories", icon: FolderTree },
  { label: "Coupons", to: "/admin/coupons", icon: Tags },
  { label: "Reviews", to: "/admin/reviews", icon: MessageSquare },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];
