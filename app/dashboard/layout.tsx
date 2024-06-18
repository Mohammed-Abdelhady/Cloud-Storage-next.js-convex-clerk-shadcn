import AuthWrapper from "@/components/layout/wrappers/auth-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloudix Dashboard",
  description: "Manage Storage files",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
}
