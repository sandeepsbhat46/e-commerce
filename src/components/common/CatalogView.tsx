import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Drawer from "@mui/material/Drawer";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { RatingStars } from "./RatingStars";
import { EmptyState } from "./EmptyState";
import { useBrands, useCategories, useProducts } from "@/hooks/use-catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const PER_PAGE = 8;

export function CatalogView({
  source,
  initialCategory,
  emptyTitle = "No products found",
}: {
  source?: Product[];
  initialCategory?: string;
  emptyTitle?: string;
}) {
  const { data: allProducts = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();
  const source_ = source ?? allProducts;

  const [cats, setCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 600]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const out = source_.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (brandSel.length === 0 || brandSel.includes(p.brand)) &&
        p.price >= price[0] &&
        p.price <= price[1] &&
        p.rating >= minRating &&
        (!inStock || p.stock > 0),
    );
    switch (sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      case "rating":
        return [...out].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...out].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      default:
        return out;
    }
  }, [source_, cats, brandSel, price, minRating, inStock, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (isLoading && !source) {
    return <CatalogSkeleton />;
  }

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <FormControlLabel
              key={c.id}
              className="flex items-center gap-2.5 text-sm"
              control={
                <Checkbox
                  size="small"
                  checked={cats.includes(c.name)}
                  onChange={() => toggle(cats, setCats, c.name)}
                />
              }
              label={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Price range</h3>
        <Slider
          value={price}
          min={0}
          max={600}
          step={10}
          onChange={(_, v) => {
            setPrice(v as number[]);
            setPage(1);
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Brand</h3>
        <div className="space-y-1">
          {brands.map((b) => (
            <FormControlLabel
              key={b}
              className="flex items-center gap-2.5 text-sm"
              control={
                <Checkbox
                  size="small"
                  checked={brandSel.includes(b)}
                  onChange={() => toggle(brandSel, setBrandSel, b)}
                />
              }
              label={b}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 0].map((r) => (
            <button
              key={r}
              onClick={() => {
                setMinRating(r);
                setPage(1);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                minRating === r ? "bg-accent text-accent-foreground" : "hover:bg-muted",
              )}
            >
              <RatingStars value={r || 5} />
              <span>{r === 0 ? "All ratings" : `${r}+ & up`}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="stock" className="text-sm font-semibold">
          In stock only
        </label>
        <Switch
          id="stock"
          checked={inStock}
          onChange={(e) => {
            setInStock(e.target.checked);
            setPage(1);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">{filters}</aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Showing {current.length} of {filtered.length} products
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              className="lg:hidden"
              startIcon={<SlidersHorizontal className="size-4" />}
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </Button>
            <Drawer anchor="left" open={filtersOpen} onClose={() => setFiltersOpen(false)}>
              <div className="w-80 overflow-y-auto p-6">
                <div className="mt-6">{filters}</div>
              </div>
            </Drawer>

            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              size="small"
              className="w-44"
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-asc">Price: low to high</MenuItem>
              <MenuItem value="price-desc">Price: high to low</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="rating">Top rated</MenuItem>
            </Select>

            <div className="flex rounded-lg border border-border p-0.5">
              {(["grid", "list"] as const).map((v) => (
                <IconButton
                  key={v}
                  className="size-8"
                  color={view === v ? "primary" : "default"}
                  aria-label={`${v} view`}
                  onClick={() => setView(v)}
                >
                  {v === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
                </IconButton>
              ))}
            </div>
          </div>
        </div>

        {current.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            description="Try removing a filter or widening your price range."
            action={
              <Button
                variant="outlined"
                onClick={() => {
                  setCats([]);
                  setBrandSel([]);
                  setPrice([0, 600]);
                  setMinRating(0);
                  setInStock(false);
                }}
              >
                Clear all filters
              </Button>
            }
          />
        ) : (
          <div
            className={cn(
              view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4" : "flex flex-col gap-4",
            )}
          >
            {current.map((p) => (
              <ProductCard key={p.id} product={p} view={view} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <Pagination className="mt-10" count={pages} page={page} onChange={(_, v) => setPage(v)} />
        )}
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
