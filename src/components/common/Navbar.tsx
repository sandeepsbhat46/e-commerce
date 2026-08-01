import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Store,
  User as UserIcon,
} from "lucide-react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Drawer from "@mui/material/Drawer";
import Menu2 from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { useAuth, useCart, useWishlist } from "@/store";
import { useHydrated } from "@/hooks/use-hydrated";
import { useProducts } from "@/hooks/use-catalog";

const nav = [
  { label: "Shop", to: "/products" },
  { label: "Deals", to: "/products", search: { sale: true } },
  { label: "New arrivals", to: "/products", search: { sort: "newest" } },
];

export function Navbar() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const { data: products = [] } = useProducts();

  const suggestions =
    q.length > 1
      ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
      : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <IconButton className="lg:hidden" aria-label="Menu" onClick={() => setMobileOpen(true)}>
          <Menu className="size-5" />
        </IconButton>
        <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <nav className="flex w-72 flex-col gap-4 p-6 pt-10">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/account"
              className="text-base font-medium"
              onClick={() => setMobileOpen(false)}
            >
              My account
            </Link>
            <Link
              to="/seller/dashboard"
              className="text-base font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Seller portal
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-base font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Admin panel
            </Link>
          </nav>
        </Drawer>

        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="size-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Kestrel</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} className="relative ml-auto hidden max-w-md flex-1 md:block">
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands and categories"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="size-4 text-muted-foreground" />
                  </InputAdornment>
                ),
              },
            }}
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setQ("")}
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent"
                >
                  <img src={p.images[0]} alt="" className="size-8 rounded object-cover" />
                  <span className="line-clamp-1">{p.name}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <IconButton component={Link} to="/account/wishlist" aria-label="Wishlist">
            <Badge badgeContent={hydrated && wishCount > 0 ? wishCount : 0} color="primary">
              <Heart className="size-5" />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/cart" aria-label="Cart">
            <Badge badgeContent={hydrated && cartCount > 0 ? cartCount : 0} color="primary">
              <ShoppingCart className="size-5" />
            </Badge>
          </IconButton>

          <IconButton aria-label="Account" onClick={(e) => setMenuAnchor(e.currentTarget)}>
            {hydrated && user ? (
              <Avatar src={user.avatar} sx={{ width: 28, height: 28 }}>
                {user.name[0]}
              </Avatar>
            ) : (
              <UserIcon className="size-5" />
            )}
          </IconButton>
          <Menu2 anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
            {hydrated && user
              ? [
                  <MenuItem key="info" disabled divider>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </MenuItem>,
                  <MenuItem
                    key="dashboard"
                    component={Link}
                    to="/account"
                    onClick={() => setMenuAnchor(null)}
                  >
                    <LayoutDashboard className="mr-2 size-4" /> Dashboard
                  </MenuItem>,
                  <MenuItem
                    key="orders"
                    component={Link}
                    to="/account/orders"
                    onClick={() => setMenuAnchor(null)}
                  >
                    <Package className="mr-2 size-4" /> My orders
                  </MenuItem>,
                  <MenuItem
                    key="seller"
                    component={Link}
                    to="/seller/dashboard"
                    onClick={() => setMenuAnchor(null)}
                  >
                    <Store className="mr-2 size-4" /> Seller portal
                  </MenuItem>,
                  <MenuItem
                    key="admin"
                    component={Link}
                    to="/admin/dashboard"
                    onClick={() => setMenuAnchor(null)}
                  >
                    <LayoutDashboard className="mr-2 size-4" /> Admin panel
                  </MenuItem>,
                  <Divider key="divider" />,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      logout();
                      setMenuAnchor(null);
                    }}
                  >
                    <LogOut className="mr-2 size-4" /> Log out
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    component={Link}
                    to="/login"
                    onClick={() => setMenuAnchor(null)}
                  >
                    Sign in
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    component={Link}
                    to="/register"
                    onClick={() => setMenuAnchor(null)}
                  >
                    Create account
                  </MenuItem>,
                ]}
          </Menu2>
        </div>
      </div>
    </header>
  );
}
