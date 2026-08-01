import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/common/DashboardShell";
import { accountNav } from "@/config/nav";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useOrders } from "@/hooks/use-catalog";
import { money } from "@/store";
import { CheckCircle2, Clock, Heart, Package } from "lucide-react";
export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [
      { title: "My account — Kestrel" },
      {
        name: "description",
        content: "Your Kestrel account dashboard: order stats, recent orders and quick links.",
      },
      { property: "og:title", content: "My account — Kestrel" },
      {
        property: "og:description",
        content: "Your Kestrel account dashboard: order stats, recent orders and quick links.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountDashboard,
});

function AccountDashboard() {
  const { data: orders = [] } = useOrders();
  return (
    <DashboardShell
      title="Welcome back, Jules"
      subtitle="Here's what's happening with your orders."
      items={accountNav}
      label="Account"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value="10" icon={Package} />
        <StatCard label="Pending" value="2" icon={Clock} />
        <StatCard label="Delivered" value="3" icon={CheckCircle2} />
        <StatCard label="Wishlist items" value="4" icon={Heart} />
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Recent orders</h2>
        <DataTable
          columns={[
            { key: "id", label: "Order" },
            { key: "date", label: "Date", render: (o) => new Date(o.date).toLocaleDateString() },
            { key: "status", label: "Status", render: (o) => <StatusBadge status={o.status} /> },
            { key: "total", label: "Total", render: (o) => money(o.total) },
          ]}
          rows={orders.slice(0, 5)}
        />
        <Link
          to="/account/orders"
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          View all orders
        </Link>
      </div>
    </DashboardShell>
  );
}
