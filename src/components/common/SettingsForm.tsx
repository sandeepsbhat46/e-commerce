import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function SettingsForm() {
  return (
    <form
      className="grid gap-6 xl:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Settings saved");
      }}
    >
      <Card title="Store">
        <TextField label="Store name" defaultValue="Kestrel Marketplace" fullWidth />
        <TextField label="Logo URL" defaultValue="/favicon.ico" fullWidth />
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select label="Currency" defaultValue="usd">
            <MenuItem value="usd">USD ($)</MenuItem>
            <MenuItem value="eur">EUR (€)</MenuItem>
            <MenuItem value="gbp">GBP (£)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Timezone</InputLabel>
          <Select label="Timezone" defaultValue="pt">
            <MenuItem value="pt">America/Los_Angeles</MenuItem>
            <MenuItem value="et">America/New_York</MenuItem>
            <MenuItem value="utc">UTC</MenuItem>
          </Select>
        </FormControl>
      </Card>

      <Card title="Email notifications">
        {[
          "Order confirmations",
          "Shipping updates",
          "Weekly seller digest",
          "Low stock alerts",
        ].map((l) => (
          <label key={l} className="flex items-center justify-between text-sm">
            {l} <Switch defaultChecked />
          </label>
        ))}
      </Card>

      <Card title="Payments">
        <TextField label="Stripe publishable key" defaultValue="pk_test_•••••••••••" fullWidth />
        <TextField
          label="Stripe secret key"
          type="password"
          defaultValue="sk_test_placeholder"
          fullWidth
        />
        <label className="flex items-center justify-between text-sm">
          Test mode <Switch defaultChecked />
        </label>
      </Card>

      <Card title="Shipping & tax">
        <TextField label="Free shipping threshold" defaultValue="200" fullWidth />
        <TextField label="Default tax rate (%)" defaultValue="8" fullWidth />
        <TextField label="Shipping zones" defaultValue="US, CA, EU" fullWidth />
      </Card>

      <div className="xl:col-span-2">
        <Button type="submit" variant="contained">
          Save settings
        </Button>
      </div>
    </form>
  );
}
