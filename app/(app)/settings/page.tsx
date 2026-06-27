import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/settings-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Find the first organization owned by this user
  const organization = await prisma.organization.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!organization) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Kelola informasi perusahaan dan keamanan akun Anda.
        </p>
      </div>
      <SettingsForm user={user} organization={organization} />
    </div>
  );
}
