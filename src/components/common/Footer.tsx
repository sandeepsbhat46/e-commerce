import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Store, Twitter, Youtube } from "lucide-react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";

const columns = [
  { title: "Shop", links: ["All products", "New arrivals", "Deals", "Gift cards"] },
  { title: "Support", links: ["Help center", "Shipping", "Returns", "Track order"] },
  { title: "Company", links: ["About", "Careers", "Press", "Sustainability"] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="size-4" />
            </span>
            <span className="text-lg font-semibold">Kestrel</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A marketplace for considered goods — from independent sellers who care about how things
            are made.
          </p>
          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're subscribed to the newsletter.");
            }}
          >
            <TextField
              type="email"
              required
              size="small"
              placeholder="you@example.com"
              className="flex-1"
            />
            <Button type="submit" variant="contained">
              Subscribe
            </Button>
          </form>
          <div className="mt-6 flex gap-2">
            {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
              <IconButton
                key={i}
                className="rounded-full border border-border"
                aria-label="Social link"
              >
                <Icon className="size-4" />
              </IconButton>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/products"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Kestrel Marketplace. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
