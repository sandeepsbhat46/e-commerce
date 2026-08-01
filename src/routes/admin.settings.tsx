import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { SettingsForm } from "@/components/common/SettingsForm";
export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Kestrel admin" },
      {
        name: "description",
        content: "Store details, notifications, payment gateway and tax configuration.",
      },
      { property: "og:title", content: "Settings — Kestrel admin" },
      {
        property: "og:description",
        content: "Store details, notifications, payment gateway and tax configuration.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <DashboardShell
      title="Settings"
      subtitle="Store, payments, notifications and tax."
      items={adminNav}
      label="Admin"
    >
      <SettingsForm />
    </DashboardShell>
  );
}
