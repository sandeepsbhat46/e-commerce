import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Truck, Undo2 } from "lucide-react";
import Button from "@mui/material/Button";
import { StoreLayout } from "@/components/common/StoreLayout";
import { ProductCard } from "@/components/common/ProductCard";
import { RatingStars } from "@/components/common/RatingStars";
import { useCategories, useProducts, useTestimonials } from "@/hooks/use-catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kestrel Marketplace — Shop considered goods online" },
      {
        name: "description",
        content:
          "Browse 20+ curated products across electronics, clothing, home, books and sports from independent sellers. Free shipping over $200.",
      },
      { property: "og:title", content: "Kestrel Marketplace" },
      {
        property: "og:description",
        content: "Curated goods across electronics, clothing, home, books and sports.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();
  const { data: testimonials = [] } = useTestimonials();
  const featured = products.slice(0, 8);
  const newArrivals = [...products].reverse().slice(0, 10);

  return (
    <StoreLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-accent via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5 text-primary" /> Summer edit is live
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Considered goods,
              <br />
              from sellers who care.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground">
              Thousands of products across six categories, hand-checked by our team. Free shipping
              over $200 and 30-day returns on everything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                component={Link}
                to="/products"
                size="large"
                variant="contained"
                endIcon={<ArrowRight className="size-4" />}
              >
                Shop now
              </Button>
              <Button component={Link} to="/seller/dashboard" size="large" variant="outlined">
                Sell on Kestrel
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-primary" /> Free delivery
              </span>
              <span className="flex items-center gap-2">
                <Undo2 className="size-4 text-primary" /> 30-day returns
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> Secure payments
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((p, i) => (
              <img
                key={p.id}
                src={p.images[0]}
                alt={p.name}
                className={`aspect-square w-full rounded-2xl object-cover shadow-sm ${i % 2 ? "translate-y-6" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.name }}
              className="group flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="pb-4 text-center text-sm font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Deals banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-primary p-10 text-primary-foreground lg:col-span-2">
            <p className="text-sm font-medium opacity-80">Limited time</p>
            <h3 className="mt-2 text-3xl font-semibold">Up to 25% off summer essentials</h3>
            <p className="mt-2 max-w-md text-sm opacity-85">
              Use code SUMMER25 at checkout on orders over $120.
            </p>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              color="inherit"
              className="mt-6"
            >
              Shop the sale
            </Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-10">
            <p className="text-sm font-medium text-muted-foreground">New customer?</p>
            <h3 className="mt-2 text-2xl font-semibold">10% off your first order</h3>
            <p className="mt-2 text-sm text-muted-foreground">Code WELCOME10</p>
            <Button component={Link} to="/register" variant="outlined" className="mt-6">
              Create account
            </Button>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">New arrivals</h2>
        <div className="no-scrollbar mt-6 flex snap-x gap-5 overflow-x-auto pb-2">
          {newArrivals.map((p) => (
            <div key={p.id} className="w-64 shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">What people say</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <RatingStars value={5} />
                <blockquote className="mt-4 text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm font-medium">
                  {t.name}
                  <span className="block text-xs font-normal text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
