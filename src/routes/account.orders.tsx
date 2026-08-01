import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { accountNav } from "@/config/nav";
import { OrdersList } from "@/components/common/OrdersList";
export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "My orders — Kestrel" },
      {
        name: "description",
        content: "Track, cancel or review every order you've placed on Kestrel.",
      },
      { property: "og:title", content: "My orders — Kestrel" },
      {
        property: "og:description",
        content: "Track, cancel or review every order you've placed on Kestrel.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyOrders,
});

function MyOrders() {
  return (
    <DashboardShell
      title="My orders"
      subtitle="Filter by status and track deliveries."
      items={accountNav}
      label="Account"
    >
      <OrdersList />
    </DashboardShell>
  );
}
