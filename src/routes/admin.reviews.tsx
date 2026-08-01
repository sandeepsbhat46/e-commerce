import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useReviews } from "@/hooks/use-catalog";
export const Route = createFileRoute("/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Kestrel admin" },
      {
        name: "description",
        content: "Approve, reject or delete customer reviews across the marketplace.",
      },
      { property: "og:title", content: "Reviews — Kestrel admin" },
      {
        property: "og:description",
        content: "Approve, reject or delete customer reviews across the marketplace.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminReviews,
});

function AdminReviews() {
  const { data: reviews = [] } = useReviews();
  return (
    <DashboardShell
      title="Review moderation"
      subtitle="Approve, reject or remove reviews."
      items={adminNav}
      label="Admin"
    >
      <div className="rounded-2xl border border-border bg-card p-6">
        <DataTable
          columns={[
            { key: "author", label: "Reviewer" },
            { key: "title", label: "Title" },
            { key: "rating", label: "Rating", render: (r) => `${r.rating}★` },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]}
          rows={reviews}
        />
      </div>
    </DashboardShell>
  );
}
