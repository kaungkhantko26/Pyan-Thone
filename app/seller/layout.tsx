"use client";

import { usePathname } from "next/navigation";
import { RouteGuard } from "@/components/RouteGuard";

const OPEN = ["/seller/login", "/seller/signup"];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (OPEN.some((p) => pathname.startsWith(p))) return <>{children}</>;
  return (
    <RouteGuard allow={["seller"]} redirectTo="/seller/login">
      {children}
    </RouteGuard>
  );
}
