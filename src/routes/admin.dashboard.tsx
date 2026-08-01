import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MonthlyRevenueChart } from "@/components/common/Charts";
import { useOrders, useProducts } from "@/hooks/use-catalog";
import { money } from "@/store";
import { Boxes, DollarSign, ShoppingBag, Users } from "lucide-react";
export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Kestrel" },
      {
        name: "description",
        content: "Marketplace-wide revenue, orders, users and low stock alerts.",
      },
      { property: "og:title", content: "Admin dashboard — Kestrel" },
      {
        property: "og:description",
        content: "Marketplace-wide revenue, orders, users and low stock alerts.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();
  return (
    <DashboardShell
      title="Admin dashboard"
      subtitle="Marketplace health at a glance."
      items={adminNav}
      label="Admin"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total revenue"
          value="$751,600"
          icon={DollarSign}
          hint="+12.4% vs last year"
        />
        <StatCard label="Total orders" value="5,365" icon={ShoppingBag} />
        <StatCard label="Total users" value="8,412" icon={Users} hint="24 new today" />
        <StatCard label="Total products" value="20" icon={Boxes} hint="3 low stock" />
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Revenue, last 12 months</h2>
        <MonthlyRevenueChart />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
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
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Low stock</h2>
          <DataTable
            columns={[
              { key: "name", label: "Product" },
              { key: "stock", label: "Stock" },
            ]}
            rows={products.filter((p) => p.stock <= 5)}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
