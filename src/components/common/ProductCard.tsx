import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { RatingStars } from "./RatingStars";
import { cn } from "@/lib/utils";
import { money, useCart, useWishlist } from "@/store";
import type { Product } from "@/types";

export function ProductCard({
  product,
  view = "grid",
}: {
  product: Product;
  view?: "grid" | "list";
}) {
  const add = useCart((s) => s.add);
  const wishlist = useWishlist((s) => s.ids);
  const toggle = useWishlist((s) => s.toggle);
  const saved = wishlist.includes(product.id);
  const onSale = !!product.compareAt && product.compareAt > product.price;

  const addToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      qty: 1,
    });
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5",
        view === "list" && "flex",
      )}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className={cn(
          "block overflow-hidden bg-muted",
          view === "list" ? "w-48 shrink-0" : "aspect-square",
        )}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="absolute left-3 top-3 flex gap-1.5">
        {onSale && (
          <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
            Sale
          </span>
        )}
        {product.stock === 0 && (
          <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-semibold text-background">
            Sold out
          </span>
        )}
      </div>

      <IconButton
        aria-label="Toggle wishlist"
        onClick={() => toggle(product.id)}
        className="absolute right-3 top-3 shadow-sm"
        sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "background.paper" } }}
      >
        <Heart className={cn("size-4", saved && "fill-destructive text-destructive")} />
      </IconButton>

      <div className={cn("flex flex-1 flex-col p-4", view === "list" && "justify-center")}>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="mt-1 line-clamp-2 font-medium leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <RatingStars value={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        {view === "list" && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold">{money(product.price)}</span>
          {onSale && (
            <span className="text-sm text-muted-foreground line-through">
              {money(product.compareAt!)}
            </span>
          )}
        </div>
        <Button
          variant="contained"
          className="mt-4 w-full"
          disabled={product.stock === 0}
          onClick={addToCart}
          startIcon={<ShoppingCart className="size-4" />}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Skeleton variant="rectangular" className="aspect-square w-full" />
      <div className="space-y-2 p-4">
        <Skeleton width="4rem" height="0.75rem" />
        <Skeleton height="1rem" />
        <Skeleton width="6rem" height="0.75rem" />
        <Skeleton variant="rounded" height="2.25rem" />
      </div>
    </div>
  );
}
