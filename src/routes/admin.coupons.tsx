import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useCoupons } from "@/hooks/use-catalog";
import { money } from "@/store";
export const Route = createFileRoute("/admin/coupons")({
  head: () => ({
    meta: [
      { title: "Coupons — Kestrel admin" },
      {
        name: "description",
        content: "Create and manage discount codes, usage limits and expiry dates.",
      },
      { property: "og:title", content: "Coupons — Kestrel admin" },
      {
        property: "og:description",
        content: "Create and manage discount codes, usage limits and expiry dates.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCoupons,
});

function AdminCoupons() {
  const { data: coupons = [] } = useCoupons();
  return (
    <DashboardShell
      title="Discounts & coupons"
      subtitle="Create and manage discount codes."
      items={adminNav}
      label="Admin"
    >
      <div className="rounded-2xl border border-border bg-card p-6">
        <DataTable
          columns={[
            { key: "code", label: "Code" },
            { key: "type", label: "Type" },
            {
              key: "value",
              label: "Value",
              render: (c) => (c.type === "percent" ? `${c.value}%` : money(c.value)),
            },
            { key: "used", label: "Usage", render: (c) => `${c.used} / ${c.maxUses}` },
            { key: "expiry", label: "Expires" },
            {
              key: "active",
              label: "Status",
              render: (c) => <StatusBadge status={c.active ? "active" : "draft"} />,
            },
          ]}
          rows={coupons}
        />
      </div>
    </DashboardShell>
  );
}
