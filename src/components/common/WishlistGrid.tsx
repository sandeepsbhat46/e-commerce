import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import Button from "@mui/material/Button";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { useProducts } from "@/hooks/use-catalog";
import { useWishlist } from "@/store";
import { useHydrated } from "@/hooks/use-hydrated";

export function WishlistGrid() {
  const ids = useWishlist((s) => s.ids);
  const hydrated = useHydrated();
  const { data: products = [] } = useProducts();
  const saved = products.filter((p) => ids.includes(p.id));

  if (!hydrated) return null;

  if (saved.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Tap the heart on any product to save it here."
        icon={<Heart className="size-6" />}
        action={
          <Button component={Link} to="/products" variant="contained">
            Browse products
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {saved.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
