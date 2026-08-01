import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/common/DashboardShell";
import { accountNav } from "@/config/nav";
import { ProfileForm } from "@/components/common/ProfileForm";
export const Route = createFileRoute("/account/profile")({
  head: () => ({
    meta: [
      { title: "Profile settings — Kestrel" },
      {
        name: "description",
        content: "Update your name, email, phone, avatar and password on Kestrel.",
      },
      { property: "og:title", content: "Profile settings — Kestrel" },
      {
        property: "og:description",
        content: "Update your name, email, phone, avatar and password on Kestrel.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfileSettings,
});

function ProfileSettings() {
  return (
    <DashboardShell
      title="Profile settings"
      subtitle="Update your details and password."
      items={accountNav}
      label="Account"
    >
      <ProfileForm />
    </DashboardShell>
  );
}
