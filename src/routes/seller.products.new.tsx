import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { sellerNav } from "@/config/nav";
import { ProductForm } from "@/components/common/ProductForm";
export const Route = createFileRoute("/seller/products/new")({
  head: () => ({
    meta: [
      { title: "Add a product — Kestrel" },
      {
        name: "description",
        content: "Create a new listing with media, pricing, inventory, variants and SEO.",
      },
      { property: "og:title", content: "Add a product — Kestrel" },
      {
        property: "og:description",
        content: "Create a new listing with media, pricing, inventory, variants and SEO.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewProduct,
});

function NewProduct() {
  return (
    <DashboardShell
      title="Add product"
      subtitle="Create a new listing."
      items={sellerNav}
      label="Seller"
    >
      <ProductForm />
    </DashboardShell>
  );
}
