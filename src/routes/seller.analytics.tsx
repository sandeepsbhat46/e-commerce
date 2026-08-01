import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { sellerNav } from "@/config/nav";
import { DataTable } from "@/components/common/DataTable";
import { OrdersChart, RevenueChart, TrafficChart } from "@/components/common/Charts";
import { useProducts } from "@/hooks/use-catalog";
import { money } from "@/store";
export const Route = createFileRoute("/seller/analytics")({
  head: () => ({
    meta: [
      { title: "Seller analytics — Kestrel" },
      {
        name: "description",
        content: "Revenue trends, order volume, top products and traffic sources.",
      },
      { property: "og:title", content: "Seller analytics — Kestrel" },
      {
        property: "og:description",
        content: "Revenue trends, order volume, top products and traffic sources.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SellerAnalytics,
});

function SellerAnalytics() {
  const { data: products = [] } = useProducts();
  return (
    <DashboardShell
      title="Analytics"
      subtitle="Revenue, orders and traffic."
      items={sellerNav}
      label="Seller"
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Revenue over time</h2>
          <RevenueChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Orders over time</h2>
          <OrdersChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Traffic sources</h2>
          <TrafficChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Top products</h2>
          <DataTable
            columns={[
              { key: "name", label: "Product" },
              { key: "rating", label: "Rating" },
              { key: "price", label: "Price", render: (p) => money(p.price) },
            ]}
            rows={products.slice(0, 6)}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
