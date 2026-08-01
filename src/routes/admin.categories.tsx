import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { useCategories } from "@/hooks/use-catalog";
import Button from "@mui/material/Button";
export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Kestrel admin" },
      { name: "description", content: "Manage the marketplace category tree and subcategories." },
      { property: "og:title", content: "Categories — Kestrel admin" },
      {
        property: "og:description",
        content: "Manage the marketplace category tree and subcategories.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories = [] } = useCategories();
  return (
    <DashboardShell
      title="Categories"
      subtitle="Parent categories and subcategories."
      items={adminNav}
      label="Admin"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-medium">{c.name}</p>
            <p className="text-xs text-muted-foreground">/{c.slug}</p>
            <ul className="mt-3 space-y-1.5 border-l border-border pl-3 text-sm text-muted-foreground">
              {c.children.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button variant="outlined" size="small">
                Edit
              </Button>
              <Button variant="text" size="small" color="error">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
