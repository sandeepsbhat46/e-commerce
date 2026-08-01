import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { adminNav } from "@/config/nav";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useUsers } from "@/hooks/use-catalog";
export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Kestrel admin" },
      {
        name: "description",
        content: "Search, filter and moderate customers, sellers and admins.",
      },
      { property: "og:title", content: "Users — Kestrel admin" },
      {
        property: "og:description",
        content: "Search, filter and moderate customers, sellers and admins.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const { data: users = [] } = useUsers();
  return (
    <DashboardShell
      title="Users"
      subtitle="Manage roles, bans and invitations."
      items={adminNav}
      label="Admin"
    >
      <div className="rounded-2xl border border-border bg-card p-6">
        <DataTable
          columns={[
            {
              key: "name",
              label: "Name",
              render: (u) => (
                <span className="flex items-center gap-2">
                  <img src={u.avatar} alt="" className="size-7 rounded-full object-cover" />
                  {u.name}
                </span>
              ),
            },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status", render: (u) => <StatusBadge status={u.status} /> },
            { key: "joinedAt", label: "Joined" },
          ]}
          rows={users}
        />
      </div>
    </DashboardShell>
  );
}
