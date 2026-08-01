import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  size = 14,
  className,
  onChange,
}: {
  value: number;
  size?: number;
  className?: string;
  onChange?: (v: number) => void;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          onClick={onChange ? () => onChange(i) : undefined}
          className={cn(
            i <= Math.round(value)
              ? "fill-warning text-warning"
              : "fill-muted text-muted-foreground/40",
            onChange && "cursor-pointer transition-transform hover:scale-110",
          )}
        />
      ))}
    </div>
  );
}
