import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { StoreLayout } from "@/components/common/StoreLayout";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { money } from "@/store";
import { useOrders } from "@/hooks/use-catalog";

export const Route = createFileRoute("/order-confirmation/$id")({
  head: () => ({
    meta: [
      { title: "Order confirmed — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Your Kestrel order is confirmed. View your items, shipping address and estimated delivery date.",
      },
      { property: "og:title", content: "Order confirmed — Kestrel" },
      { property: "og:description", content: "Thanks for your order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { id } = Route.useParams();
  const { data: orders = [] } = useOrders();
  const sample = orders[0];

  if (!sample) return null;

  return (
    <StoreLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-7" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">Order placed!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks — a confirmation email is on its way.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
            Order {id}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Items</h2>
          <div className="mt-4 space-y-4">
            {sample.items.map((i) => (
              <div key={i.productId} className="flex gap-3">
                <img src={i.image} alt="" className="size-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.variant} · Qty {i.qty}
                  </p>
                </div>
                <span className="text-sm font-medium">{money(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <Divider className="my-5" />
          <div className="grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold">Shipping address</p>
              <p className="mt-1 text-muted-foreground">
                {sample.address.fullName}
                <br />
                {sample.address.line1}, {sample.address.city}, {sample.address.state}{" "}
                {sample.address.zip}
              </p>
            </div>
            <div>
              <p className="font-semibold">Estimated delivery</p>
              <p className="mt-1 text-muted-foreground">Aug 6 – Aug 9, 2026</p>
              <p className="mt-3 font-semibold">Total paid</p>
              <p className="mt-1 text-muted-foreground">{money(sample.total)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button component={Link} to="/account/orders" variant="contained">
            Track order
          </Button>
          <Button component={Link} to="/products" variant="outlined">
            Continue shopping
          </Button>
        </div>
      </div>
    </StoreLayout>
  );
}
