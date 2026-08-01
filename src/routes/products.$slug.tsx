import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShieldCheck, ShoppingCart, ThumbsUp, Truck } from "lucide-react";
import { toast } from "sonner";
import { StoreLayout } from "@/components/common/StoreLayout";
import { ProductCard } from "@/components/common/ProductCard";
import { RatingStars } from "@/components/common/RatingStars";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { api } from "@/lib/api";
import { useProductReviews, useProducts } from "@/hooks/use-catalog";
import type { Product } from "@/types";
import { money, useCart, useWishlist } from "@/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    const product = await api.product(params.slug).catch(() => null);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Kestrel" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Kestrel Marketplace` },
        {
          name: "description",
          content: `${p.name} by ${p.brand}. ${money(p.price)} with free returns for 30 days. Rated ${p.rating}/5 by ${p.reviewCount} buyers.`,
        },
        { property: "og:title", content: p.name },
        {
          property: "og:description",
          content: `${p.brand} · ${money(p.price)} on Kestrel Marketplace.`,
        },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const wishlist = useWishlist((s) => s.ids);
  const toggleWish = useWishlist((s) => s.toggle);

  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.sizes?.[2]);
  const [color, setColor] = useState(product.colors?.[0].name);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  const { data: reviews = [] } = useProductReviews(product.id);
  const { data: allProducts = [] } = useProducts();
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
  const variant = [size, color].filter(Boolean).join(" / ") || undefined;

  const addToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      qty,
      variant,
    });
    toast.success("Added to cart", { description: `${product.name} × ${qty}` });
  };

  const stockLabel =
    product.stock === 0
      ? "Out of stock"
      : product.stock <= 5
        ? `Only ${product.stock} left`
        : "In stock";

  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Breadcrumbs className="mb-6">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <span className="text-foreground">{product.name}</span>
        </Breadcrumbs>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src={product.images[image]}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImage(i)}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition-colors",
                    i === image ? "border-primary" : "border-transparent hover:border-border",
                  )}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand} · SKU {product.sku}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.name}</h1>
            <a href="#reviews" className="mt-3 flex items-center gap-2 text-sm hover:underline">
              <RatingStars value={product.rating} size={16} />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </a>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{money(product.price)}</span>
              {product.compareAt && (
                <span className="text-lg text-muted-foreground line-through">
                  {money(product.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.sizes && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <Button
                      key={s}
                      size="small"
                      variant={size === s ? "contained" : "outlined"}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Color: {color}</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      aria-label={c.name}
                      onClick={() => setColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={cn(
                        "size-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                        color === c.name ? "ring-primary" : "ring-border",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="size-4" />
                </IconButton>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <IconButton onClick={() => setQty((q) => q + 1)}>
                  <Plus className="size-4" />
                </IconButton>
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  product.stock === 0
                    ? "text-destructive"
                    : product.stock <= 5
                      ? "text-warning"
                      : "text-success",
                )}
              >
                {stockLabel}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="large"
                variant="contained"
                className="flex-1"
                disabled={product.stock === 0}
                onClick={addToCart}
                startIcon={<ShoppingCart className="size-4" />}
              >
                Add to cart
              </Button>
              <Button
                size="large"
                variant="outlined"
                className="flex-1"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart();
                  navigate({ to: "/checkout" });
                }}
              >
                Buy now
              </Button>
              <IconButton aria-label="Wishlist" onClick={() => toggleWish(product.id)}>
                <Heart
                  className={cn(
                    "size-4",
                    wishlist.includes(product.id) && "fill-destructive text-destructive",
                  )}
                />
              </IconButton>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-primary" /> Free shipping over $200
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> 2-year warranty
              </span>
            </div>
          </div>
        </div>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} className="mt-14 border-b border-border">
          <Tab value="description" label="Description" />
          <Tab value="specs" label="Specifications" />
          <Tab value="reviews" label={`Reviews (${reviews.length})`} />
        </Tabs>

        {tab === "description" && (
          <div className="max-w-3xl pt-6 text-sm leading-relaxed text-muted-foreground">
            <p>{product.description}</p>
            <p className="mt-4">
              Every item is inspected before dispatch and ships in recyclable packaging. If it isn't
              right, returns are free within 30 days of delivery.
            </p>
          </div>
        )}

        {tab === "specs" && (
          <div className="pt-6">
            <dl className="max-w-2xl divide-y divide-border rounded-xl border border-border">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {tab === "reviews" && (
          <div id="reviews" className="pt-6">
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <p className="text-4xl font-semibold">{product.rating}</p>
                <RatingStars value={product.rating} size={18} className="mt-2" />
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </p>
                <div className="mt-5 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = [62, 21, 9, 5, 3][5 - star];
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs">
                        <span className="w-6 text-muted-foreground">{star}★</span>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          className="h-2 flex-1 rounded-full"
                        />
                        <span className="w-8 text-right text-muted-foreground">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  variant="outlined"
                  className="mt-6 w-full"
                  onClick={() => toast.success("Review form opened (mock)")}
                >
                  Write a review
                </Button>
              </div>

              <div className="space-y-6 lg:col-span-2">
                {reviews.length === 0 && (
                  <p className="text-sm text-muted-foreground">No reviews yet — be the first.</p>
                )}
                {reviews.map((r) => (
                  <article key={r.id} className="rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                      <Avatar src={r.avatar} sx={{ width: 36, height: 36 }}>
                        {r.author[0]}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{r.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(r.date).toLocaleDateString()}
                        </p>
                      </div>
                      <RatingStars value={r.rating} className="ml-auto" />
                    </div>
                    <h4 className="mt-4 text-sm font-semibold">{r.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                    {r.sellerReply && (
                      <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
                        <p className="font-medium">Seller response</p>
                        <p className="text-muted-foreground">{r.sellerReply}</p>
                      </div>
                    )}
                    <Button
                      variant="text"
                      size="small"
                      className="mt-3 text-muted-foreground"
                      startIcon={<ThumbsUp className="size-3.5" />}
                    >
                      Helpful ({r.helpful})
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">Related products</h2>
            <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2">
              {related.map((p) => (
                <div key={p.id} className="w-64 shrink-0">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </StoreLayout>
  );
}
