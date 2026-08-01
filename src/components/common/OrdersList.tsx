import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { EmptyState } from "./EmptyState";
import { useOrders } from "@/hooks/use-catalog";
import { money } from "@/store";

const tabs = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

export function OrdersList({ seller = false }: { seller?: boolean }) {
  const [tab, setTab] = useState("all");
  const { data: orders = [] } = useOrders();
  const list = orders.filter((o) => tab === "all" || o.status === tab);

  return (
    <div>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
        {tabs.map((t) => (
          <Tab key={t} value={t} label={t} className="capitalize" />
        ))}
      </Tabs>

      {list.length === 0 ? (
        <EmptyState title="No orders here" description="Try a different status filter." />
      ) : (
        <div className="mt-6 space-y-4">
          {list.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.date).toLocaleDateString()} ·{" "}
                    {seller ? o.customer : `${o.items.length} items`}
                  </p>
                </div>
                <StatusBadge status={o.status} />
                <span className="ml-auto font-semibold">{money(o.total)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                {o.items.map((i) => (
                  <img
                    key={i.productId}
                    src={i.image}
                    alt=""
                    className="size-12 rounded-lg object-cover"
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outlined" size="small">
                  View details
                </Button>
                {o.tracking && (
                  <Button variant="outlined" size="small">
                    Track order
                  </Button>
                )}
                {seller ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => toast.success(`${o.id} marked as shipped`)}
                  >
                    Update status
                  </Button>
                ) : (
                  <>
                    {o.status === "pending" && (
                      <Button
                        variant="text"
                        size="small"
                        color="error"
                        onClick={() => toast("Order cancelled")}
                      >
                        Cancel order
                      </Button>
                    )}
                    {o.status === "delivered" && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => toast.success("Review form opened (mock)")}
                      >
                        Write a review
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
