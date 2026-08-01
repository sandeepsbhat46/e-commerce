import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { AuthShell } from "@/components/common/AuthShell";
import { useAuth } from "@/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Kestrel Marketplace" },
      {
        name: "description",
        content:
          "Sign in to your Kestrel account to track orders, manage your wishlist and check out faster.",
      },
      { property: "og:title", content: "Sign in — Kestrel Marketplace" },
      { property: "og:description", content: "Access your Kestrel orders, wishlist and account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("jules@shoppers.test");
  const [password, setPassword] = useState("password");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    await login(email);
    toast.success("Welcome back!");
    navigate({ to: "/account" });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue shopping.">
      <form onSubmit={submit} className="space-y-4">
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="contained" className="w-full">
          Sign in
        </Button>
        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-card px-2">or</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <Button
          type="button"
          variant="outlined"
          className="w-full"
          startIcon={<Store className="size-4" />}
          onClick={async () => {
            await login("jules@shoppers.test");
            toast.success("Signed in with Google (mock)");
            navigate({ to: "/account" });
          }}
        >
          Continue with Google
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
