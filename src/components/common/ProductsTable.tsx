import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";
import { DataTable } from "./DataTable";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useProducts } from "@/hooks/use-catalog";
import { money } from "@/store";
import type { Product } from "@/types";

export function ProductsTable({ showSeller = false }: { showSeller?: boolean }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const { data: products = [] } = useProducts();
  const rows = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) && (status === "all" || p.status === status),
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-5 flex flex-wrap gap-2">
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name"
          size="small"
          className="max-w-xs"
        />
        {["all", "active", "draft"].map((s) => (
          <Button
            key={s}
            size="small"
            variant={status === s ? "contained" : "outlined"}
            className="capitalize"
            onClick={() => setStatus(s)}
          >
            {s}
          </Button>
        ))}
        <Button
          size="small"
          variant="text"
          color="error"
          className="ml-auto"
          onClick={() => toast("Bulk delete (mock)")}
        >
          Bulk delete
        </Button>
      </div>
      <DataTable<Product>
        rows={rows}
        columns={[
          {
            key: "name",
            label: "Product",
            render: (p) => (
              <span className="flex items-center gap-2">
                <img src={p.images[0]} alt="" className="size-9 rounded-lg object-cover" />
                <span className="line-clamp-1 max-w-56">{p.name}</span>
              </span>
            ),
          },
          ...(showSeller ? [{ key: "sellerName", label: "Seller" }] : []),
          { key: "category", label: "Category" },
          { key: "price", label: "Price", render: (p: Product) => money(p.price) },
          { key: "stock", label: "Stock" },
          {
            key: "status",
            label: "Status",
            render: (p: Product) => <StatusBadge status={p.status} />,
          },
        ]}
      />
    </div>
  );
}
