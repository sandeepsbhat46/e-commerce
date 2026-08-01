import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthShell } from "@/components/common/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Kestrel Marketplace" },
      {
        name: "description",
        content: "Enter your email and we'll send a link to reset your Kestrel account password.",
      },
      { property: "og:title", content: "Reset your password — Kestrel" },
      { property: "og:description", content: "Send yourself a password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <AuthShell title="Forgot password" subtitle="We'll email you a link to set a new one.">
      {sent ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
            <MailCheck className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for <strong className="text-foreground">{email}</strong>, a reset
            link is on its way.
          </p>
          <Button component={Link} to="/login" variant="outlined" className="w-full">
            Back to sign in
          </Button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" className="w-full">
            Send reset link
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-medium text-primary hover:underline">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
