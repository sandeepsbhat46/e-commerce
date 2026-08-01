import { useState } from "react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { useUsers } from "@/hooks/use-catalog";

export function ProfileForm() {
  const { data: users = [] } = useUsers();
  const me = users[3];
  const [password, setPassword] = useState("");
  const strength = Math.min(100, password.length * 12);

  if (!me) return null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form
        className="space-y-4 rounded-2xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Profile updated");
        }}
      >
        <h2 className="text-base font-semibold">Profile</h2>
        <div className="flex items-center gap-4">
          <Avatar src={me.avatar} sx={{ width: 64, height: 64 }}>
            {me.name[0]}
          </Avatar>
          <Button type="button" variant="outlined" size="small">
            Upload new photo
          </Button>
        </div>
        <TextField label="Full name" defaultValue={me.name} fullWidth />
        <TextField label="Email" defaultValue={me.email} fullWidth />
        <TextField label="Phone" defaultValue="+1 503 555 0142" fullWidth />
        <Button type="submit" variant="contained">
          Save changes
        </Button>
      </form>

      <form
        className="space-y-4 rounded-2xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Password changed");
        }}
      >
        <h2 className="text-base font-semibold">Change password</h2>
        <TextField label="Current password" type="password" fullWidth />
        <div className="space-y-2">
          <TextField
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <LinearProgress variant="determinate" value={strength} className="h-1.5 rounded-full" />
          <p className="text-xs text-muted-foreground">
            {strength < 40 ? "Weak" : strength < 75 ? "Good" : "Strong"} password
          </p>
        </div>
        <TextField label="Confirm new password" type="password" fullWidth />
        <Divider />
        <Button type="submit" variant="contained">
          Update password
        </Button>
      </form>
    </div>
  );
}
