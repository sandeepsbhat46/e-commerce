import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { StoreLayout } from "@/components/common/StoreLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { cartTotals, money, useCart } from "@/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Complete your Kestrel order: shipping address, delivery speed, payment and review — all in four steps.",
      },
      { property: "og:title", content: "Checkout — Kestrel Marketplace" },
      { property: "og:description", content: "Secure four-step checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Shipping address", "Delivery", "Payment", "Review"];

const shippingOptions = [
  { id: "standard", label: "Standard", price: 0, eta: "Arrives Aug 6 – Aug 9" },
  { id: "express", label: "Express", price: 9.99, eta: "Arrives Aug 4 – Aug 5" },
  { id: "overnight", label: "Overnight", price: 19.99, eta: "Arrives Aug 3" },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, coupon, clear } = useCart();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("standard");
  const [address, setAddress] = useState({
    fullName: "Jules Navarro",
    email: "jules@shoppers.test",
    phone: "+1 503 555 0142",
    line1: "1180 SE Ash Street",
    line2: "Apt 4B",
    city: "Portland",
    state: "OR",
    zip: "97214",
    country: "United States",
  });
  const [card, setCard] = useState({
    number: "4242 4242 4242 4242",
    expiry: "12/28",
    cvv: "123",
    name: "Jules Navarro",
  });

  const shipping = shippingOptions.find((o) => o.id === method)!.price;
  const totals = cartTotals(items, coupon, shipping);

  const set = (k: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((a) => ({ ...a, [k]: e.target.value }));

  const placeOrder = () => {
    const id = `ORD-${Math.floor(3000 + Math.random() * 6000)}`;
    clear();
    toast.success("Payment approved (test mode)");
    navigate({ to: "/order-confirmation/$id", params: { id } });
  };

  if (items.length === 0) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <EmptyState
            title="Nothing to check out"
            description="Add a product to your cart to start the checkout flow."
            action={
              <Button component={Link} to="/products" variant="contained">
                Browse products
              </Button>
            }
          />
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Checkout</h1>

        <ol className="mt-8 flex flex-wrap gap-4">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
                  i < step
                    ? "bg-success text-success-foreground"
                    : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cn("text-sm", i === step ? "font-medium" : "text-muted-foreground")}>
                {s}
              </span>
              {i < steps.length - 1 && <span className="hidden h-px w-8 bg-border sm:block" />}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value={address.fullName} onChange={set("fullName")} />
                <Field label="Email" value={address.email} onChange={set("email")} />
                <Field label="Phone" value={address.phone} onChange={set("phone")} />
                <Field label="Address line 1" value={address.line1} onChange={set("line1")} />
                <Field label="Address line 2" value={address.line2} onChange={set("line2")} />
                <Field label="City" value={address.city} onChange={set("city")} />
                <Field label="State" value={address.state} onChange={set("state")} />
                <Field label="ZIP code" value={address.zip} onChange={set("zip")} />
                <Field label="Country" value={address.country} onChange={set("country")} />
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <Checkbox defaultChecked /> Save this address for next time
                </label>
              </div>
            )}

            {step === 1 && (
              <RadioGroup
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="space-y-3"
              >
                {shippingOptions.map((o) => (
                  <label
                    key={o.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4",
                      method === o.id && "border-primary bg-accent",
                    )}
                  >
                    <Radio value={o.id} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{o.label}</p>
                      <p className="text-xs text-muted-foreground">{o.eta}</p>
                    </div>
                    <span className="text-sm font-semibold">
                      {o.price === 0 ? "Free" : money(o.price)}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-primary" />
                  <p className="text-sm font-medium">Card details</p>
                  <span className="ml-auto rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning-foreground ring-1 ring-inset ring-warning/30">
                    Test mode
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <TextField
                      label="Card number"
                      fullWidth
                      value={card.number}
                      inputMode="numeric"
                      onChange={(e) =>
                        setCard((c) => ({
                          ...c,
                          number: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16)
                            .replace(/(.{4})/g, "$1 ")
                            .trim(),
                        }))
                      }
                    />
                  </div>
                  <Field
                    label="Expiry"
                    value={card.expiry}
                    onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                  />
                  <Field
                    label="CVV"
                    value={card.cvv}
                    onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Cardholder name"
                      value={card.name}
                      onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                    />
                  </div>
                </div>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="size-3.5" /> Payments are simulated — no card is ever charged.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-semibold">Shipping to</p>
                  <p className="mt-1 text-muted-foreground">
                    {address.fullName}, {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                    {address.zip}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Delivery</p>
                  <p className="mt-1 text-muted-foreground">
                    {shippingOptions.find((o) => o.id === method)!.label} ·{" "}
                    {shippingOptions.find((o) => o.id === method)!.eta}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Payment</p>
                  <p className="mt-1 text-muted-foreground">
                    Visa •••• {card.number.slice(-4)} · {card.expiry}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Items</p>
                  <ul className="mt-2 space-y-2">
                    {items.map((i) => (
                      <li
                        key={`${i.productId}-${i.variant}`}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>
                          {i.name} × {i.qty}
                        </span>
                        <span>{money(i.price * i.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <Divider />
            <div className="flex justify-between">
              <Button
                variant="outlined"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button variant="contained" onClick={() => setStep((s) => s + 1)}>
                  Continue
                </Button>
              ) : (
                <Button variant="contained" size="large" onClick={placeOrder}>
                  Place order
                </Button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variant}`} className="flex gap-3">
                  <img src={i.image} alt="" className="size-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                  </div>
                  <span className="text-sm font-medium">{money(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <Divider className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{money(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>−{money(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{money(totals.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{money(totals.tax)}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{money(totals.total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </StoreLayout>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <TextField label={label} fullWidth size="small" value={value} onChange={onChange} />
    </div>
  );
}
