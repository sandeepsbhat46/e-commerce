import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { OrdersList } from "@/components/common/OrdersList";
export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Kestrel admin" },
      { name: "description", content: "Every marketplace order with filters and CSV export." },
      { property: "og:title", content: "Orders — Kestrel admin" },
      {
        property: "og:description",
        content: "Every marketplace order with filters and CSV export.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

function AdminOrders() {
  return (
    <DashboardShell
      title="All orders"
      subtitle="Every order across the marketplace."
      items={adminNav}
      label="Admin"
    >
      <OrdersList seller />
    </DashboardShell>
  );
}
