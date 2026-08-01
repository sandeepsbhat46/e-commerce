import { createFileRoute } from "@tanstack/react-router";
import { StoreLayout, PageHeader } from "@/components/common/StoreLayout";
import { CatalogView } from "@/components/common/CatalogView";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All products — Kestrel Marketplace" },
      { name: "description", content: "Filter by category, brand, price and rating across the full Kestrel catalog of curated products." },
      { property: "og:title", content: "All products — Kestrel Marketplace" },
      { property: "og:description", content: "Browse and filter the full Kestrel catalog." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { category } = Route.useSearch();
  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          title={category ?? "All products"}
          description="Curated goods from independent sellers, updated weekly."
        />
        <CatalogView initialCategory={category} />
      </div>
    </StoreLayout>
  );
}
