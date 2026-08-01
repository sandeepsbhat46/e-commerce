import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDailyRevenue, useRevenueByMonth, useTrafficSources } from "@/hooks/use-catalog";

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };

export function RevenueChart() {
  const { data: dailyRevenue = [] } = useDailyRevenue();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={dailyRevenue}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="day" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} width={48} />
        <Tooltip />
        <Area
          dataKey="revenue"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OrdersChart() {
  const { data: dailyRevenue = [] } = useDailyRevenue();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={dailyRevenue}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="day" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} width={40} />
        <Tooltip />
        <Bar dataKey="orders" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyRevenueChart() {
  const { data: revenueByMonth = [] } = useRevenueByMonth();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} width={60} />
        <Tooltip />
        <Bar dataKey="revenue" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

export function TrafficChart() {
  const { data: trafficSources = [] } = useTrafficSources();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={trafficSources}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
        >
          {trafficSources.map((_, i) => (
            <Cell key={i} fill={pieColors[i % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
