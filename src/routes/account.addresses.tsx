import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { accountNav } from "@/config/nav";
import { useAddresses } from "@/hooks/use-catalog";
import { StatusBadge } from "@/components/common/StatusBadge";
import Button from "@mui/material/Button";
export const Route = createFileRoute("/account/addresses")({
  head: () => ({
    meta: [
      { title: "Addresses — Kestrel" },
      { name: "description", content: "Manage your saved shipping addresses on Kestrel." },
      { property: "og:title", content: "Addresses — Kestrel" },
      { property: "og:description", content: "Manage your saved shipping addresses on Kestrel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AddressesPage,
});

function AddressesPage() {
  const { data: addresses = [] } = useAddresses();
  return (
    <DashboardShell
      title="Addresses"
      subtitle="Manage where your orders are delivered."
      items={accountNav}
      label="Account"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <p className="font-medium">{a.label}</p>
              {a.isDefault && (
                <StatusBadge
                  status="default"
                  className="bg-primary/10 text-primary ring-primary/25"
                />
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {a.fullName}
              <br />
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ""}
              <br />
              {a.city}, {a.state} {a.zip}
              <br />
              {a.phone}
            </p>
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
        <button className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border text-sm font-medium text-muted-foreground hover:bg-muted/50">
          + Add new address
        </button>
      </div>
    </DashboardShell>
  );
}
