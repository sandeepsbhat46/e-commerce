import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { accountNav } from "@/config/nav";
import { WishlistGrid } from "@/components/common/WishlistGrid";
export const Route = createFileRoute("/account/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Kestrel" },
      { name: "description", content: "Products you've saved on Kestrel for later." },
      { property: "og:title", content: "Wishlist — Kestrel" },
      { property: "og:description", content: "Products you've saved on Kestrel for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  return (
    <DashboardShell
      title="Wishlist"
      subtitle="Saved products, ready when you are."
      items={accountNav}
      label="Account"
    >
      <WishlistGrid />
    </DashboardShell>
  );
}
