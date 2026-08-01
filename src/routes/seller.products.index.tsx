import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { sellerNav } from "@/config/nav";
import { ProductsTable } from "@/components/common/ProductsTable";
import Button from "@mui/material/Button";
export const Route = createFileRoute("/seller/products/")({
  head: () => ({
    meta: [
      { title: "Seller products — Kestrel" },
      {
        name: "description",
        content: "Manage your product listings, stock levels and publication status.",
      },
      { property: "og:title", content: "Seller products — Kestrel" },
      {
        property: "og:description",
        content: "Manage your product listings, stock levels and publication status.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SellerProducts,
});

function SellerProducts() {
  return (
    <DashboardShell
      title="Products"
      subtitle="Manage listings, stock and status."
      items={sellerNav}
      label="Seller"
    >
      <ProductsTable />
      <div className="mt-4">
        <Button component={Link} to="/seller/products/new" variant="contained">
          Add new product
        </Button>
      </div>
    </DashboardShell>
  );
}
