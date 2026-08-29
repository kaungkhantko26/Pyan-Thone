"use client";

import { usePathname } from "next/navigation";
import { RouteGuard } from "@/components/RouteGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/admin/login")) return <>{children}</>;
  return (
    <RouteGuard allow={["admin"]} redirectTo="/admin/login">
      {children}
    </RouteGuard>
  );
}
