import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { ProductsTable } from "@/components/common/ProductsTable";
export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products — Kestrel admin" },
      {
        name: "description",
        content: "Review, approve and moderate every listing across all sellers.",
      },
      { property: "og:title", content: "Products — Kestrel admin" },
      {
        property: "og:description",
        content: "Review, approve and moderate every listing across all sellers.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <DashboardShell
      title="All products"
      subtitle="Across every seller on the marketplace."
      items={adminNav}
      label="Admin"
    >
      <ProductsTable showSeller />
    </DashboardShell>
  );
}
