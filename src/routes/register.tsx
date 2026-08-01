import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { AuthShell } from "@/components/common/AuthShell";
import { useAuth } from "@/store";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create an account — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Join Kestrel as a customer or seller. Free to start, no listing fees for your first 30 days.",
      },
      { property: "og:title", content: "Create an account — Kestrel Marketplace" },
      { property: "og:description", content: "Join Kestrel as a customer or a seller." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [role, setRole] = useState<Role>("customer");
  const [terms, setTerms] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Please enter your full name.");
    if (!form.email.includes("@")) return toast.error("Please enter a valid email.");
    if (form.password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return toast.error("Passwords do not match.");
    if (!terms) return toast.error("Please accept the terms and conditions.");
    await login(form.email, role);
    toast.success("Account created");
    navigate({ to: role === "seller" ? "/seller/dashboard" : "/account" });
  };

  return (
    <AuthShell title="Create your account" subtitle="It takes less than a minute.">
      <form onSubmit={submit} className="space-y-4">
        <TextField
          id="name"
          label="Full name"
          fullWidth
          value={form.name}
          onChange={set("name")}
          placeholder="Jules Navarro"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={form.email}
          onChange={set("email")}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={set("password")}
          />
          <TextField
            id="confirm"
            label="Confirm"
            type="password"
            fullWidth
            value={form.confirm}
            onChange={set("confirm")}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">I want to</p>
          <RadioGroup
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="grid grid-cols-2 gap-3"
          >
            {(["customer", "seller"] as Role[]).map((r) => (
              <label
                key={r}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm capitalize",
                  role === r && "border-primary bg-accent",
                )}
              >
                <Radio value={r} /> {r === "customer" ? "Shop" : "Sell"}
              </label>
            ))}
          </RadioGroup>
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-0.5"
          />
          I agree to the Terms of Service and Privacy Policy.
        </label>
        <Button type="submit" variant="contained" className="w-full">
          Create account
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
