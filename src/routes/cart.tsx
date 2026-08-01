import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { StoreLayout, PageHeader } from "@/components/common/StoreLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { cartTotals, money, useCart } from "@/store";
import { useCoupons } from "@/hooks/use-catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Review the items in your Kestrel cart, apply a discount code and continue to secure checkout.",
      },
      { property: "og:title", content: "Your cart — Kestrel Marketplace" },
      { property: "og:description", content: "Review your items and check out securely." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, coupon, setQty, remove, applyCoupon } = useCart();
  const { data: coupons = [] } = useCoupons();
  const [code, setCode] = useState("");
  const shipping = items.length ? 9.99 : 0;
  const totals = cartTotals(items, coupon, shipping);

  const apply = () => {
    const found = coupons.find((c) => c.code === code.toUpperCase() && c.active);
    if (!found) return toast.error("That discount code isn't valid.");
    applyCoupon(found.code);
    toast.success(`${found.code} applied`);
  };

  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          title="Shopping cart"
          description={`${items.length} item${items.length === 1 ? "" : "s"} in your cart`}
        />

        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Once you add products they'll show up here."
            icon={<ShoppingBag className="size-6" />}
            action={
              <Button component={Link} to="/products" variant="contained">
                Continue shopping
              </Button>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-24 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: item.slug }}
                      className="font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">{money(item.price)} each</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border">
                        <IconButton
                          className="size-8"
                          onClick={() => setQty(item.productId, item.qty - 1, item.variant)}
                        >
                          <Minus className="size-3.5" />
                        </IconButton>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <IconButton
                          className="size-8"
                          onClick={() => setQty(item.productId, item.qty + 1, item.variant)}
                        >
                          <Plus className="size-3.5" />
                        </IconButton>
                      </div>
                      <Button
                        variant="text"
                        size="small"
                        className="text-muted-foreground"
                        startIcon={<Trash2 className="size-4" />}
                        onClick={() => {
                          remove(item.productId, item.variant);
                          toast("Removed from cart");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold">{money(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-4 flex gap-2">
                <TextField
                  size="small"
                  fullWidth
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Discount code"
                />
                <Button variant="outlined" onClick={apply}>
                  Apply
                </Button>
              </div>
              <div className="mt-5 space-y-2.5 text-sm">
                <Row label="Subtotal" value={money(totals.subtotal)} />
                {totals.discount > 0 && (
                  <Row label={`Discount (${coupon})`} value={`−${money(totals.discount)}`} accent />
                )}
                <Row label="Estimated shipping" value={money(totals.shipping)} />
                <Row label="Tax" value={money(totals.tax)} />
                <Divider className="my-3" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{money(totals.total)}</span>
                </div>
              </div>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                size="large"
                className="mt-6 w-full"
              >
                Proceed to checkout
              </Button>
              <Button component={Link} to="/products" variant="text" className="mt-2 w-full">
                Continue shopping
              </Button>
            </aside>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-medium text-success" : "font-medium"}>{value}</span>
    </div>
  );
}
