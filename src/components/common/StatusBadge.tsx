import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const map: Record<string, string> = {
  pending: "bg-warning/15 text-warning-foreground ring-warning/30",
  processing: "bg-primary/10 text-primary ring-primary/25",
  shipped: "bg-chart-2/15 text-chart-2 ring-chart-2/30",
  delivered: "bg-success/15 text-success ring-success/30",
  cancelled: "bg-destructive/10 text-destructive ring-destructive/25",
  active: "bg-success/15 text-success ring-success/30",
  draft: "bg-muted text-muted-foreground ring-border",
  archived: "bg-muted text-muted-foreground ring-border",
  banned: "bg-destructive/10 text-destructive ring-destructive/25",
  approved: "bg-success/15 text-success ring-success/30",
  rejected: "bg-destructive/10 text-destructive ring-destructive/25",
};

export function StatusBadge({
  status,
  className,
}: {
  status: OrderStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        map[status] ?? "bg-muted text-muted-foreground ring-border",
        className,
      )}
    >
      {status}
    </span>
  );
}
