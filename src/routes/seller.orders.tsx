import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { sellerNav } from "@/config/nav";
import { OrdersList } from "@/components/common/OrdersList";
export const Route = createFileRoute("/seller/orders")({
  head: () => ({
    meta: [
      { title: "Seller orders — Kestrel" },
      { name: "description", content: "Fulfil orders, update statuses and add tracking numbers." },
      { property: "og:title", content: "Seller orders — Kestrel" },
      {
        property: "og:description",
        content: "Fulfil orders, update statuses and add tracking numbers.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SellerOrders,
});

function SellerOrders() {
  return (
    <DashboardShell
      title="Orders"
      subtitle="Update status and add tracking."
      items={sellerNav}
      label="Seller"
    >
      <OrdersList seller />
    </DashboardShell>
  );
}
