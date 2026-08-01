import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/common/DashboardShell";
import { sellerNav } from "@/config/nav";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RevenueChart } from "@/components/common/Charts";
import { useOrders, useProducts } from "@/hooks/use-catalog";
import { money } from "@/store";
import { Boxes, CheckCircle2, Clock, DollarSign, ShoppingBag } from "lucide-react";
export const Route = createFileRoute("/seller/dashboard")({
  head: () => ({
    meta: [
      { title: "Seller dashboard — Kestrel" },
      {
        name: "description",
        content: "Revenue, orders and top products for your Kestrel storefront.",
      },
      { property: "og:title", content: "Seller dashboard — Kestrel" },
      {
        property: "og:description",
        content: "Revenue, orders and top products for your Kestrel storefront.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SellerDashboard,
});

function SellerDashboard() {
  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();
  return (
    <DashboardShell
      title="Seller dashboard"
      subtitle="Performance across the last 30 days."
      items={sellerNav}
      label="Seller"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total products" value="20" icon={Boxes} />
        <StatCard label="Active listings" value="19" icon={CheckCircle2} />
        <StatCard label="Total sales" value="1,284" icon={ShoppingBag} />
        <StatCard label="Revenue" value="$84,300" icon={DollarSign} />
        <StatCard label="Pending orders" value="3" icon={Clock} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Revenue, last 30 days</h2>
          <RevenueChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Top selling</h2>
          <ul className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <img src={p.images[0]} alt="" className="size-10 rounded-lg object-cover" />
                <span className="line-clamp-1 flex-1 text-sm">{p.name}</span>
                <span className="text-sm font-medium">{money(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Recent orders</h2>
        <DataTable
          columns={[
            { key: "id", label: "Order" },
            { key: "customer", label: "Customer" },
            { key: "status", label: "Status", render: (o) => <StatusBadge status={o.status} /> },
            { key: "total", label: "Total", render: (o) => money(o.total) },
          ]}
          rows={orders.slice(0, 6)}
        />
      </div>
    </DashboardShell>
  );
}
