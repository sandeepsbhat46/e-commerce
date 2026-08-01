import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { StoreLayout } from "@/components/common/StoreLayout";
import { CatalogView } from "@/components/common/CatalogView";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useProducts } from "@/hooks/use-catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search results — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Search the Kestrel catalog by product name, brand or category and filter the results.",
      },
      { property: "og:title", content: "Search — Kestrel Marketplace" },
      { property: "og:description", content: "Find products by name, brand or category." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(q);
  const { data: products = [] } = useProducts();

  const results = products.filter((p) =>
    `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <form
          className="mb-8 flex max-w-xl gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: term } });
          }}
        >
          <TextField
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products"
            size="small"
            className="flex-1"
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
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>

        <h1 className="mb-6 text-2xl font-semibold tracking-tight">
          {q ? `Results for “${q}”` : "Search the catalog"}
        </h1>

        <CatalogView
          source={results}
          emptyTitle={q ? `No results for “${q}”` : "Start typing to search"}
        />
      </div>
    </StoreLayout>
  );
}
