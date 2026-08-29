"use client";

import { usePathname } from "next/navigation";
import { RouteGuard } from "@/components/RouteGuard";

/** Pages that need any signed-in account (buyer, seller or admin). */
const PROTECTED = ["/buyer/chat", "/buyer/checkout", "/buyer/delivery", "/buyer/profile"];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    return (
      <RouteGuard allow={["buyer", "seller", "admin"]} redirectTo="/buyer/login">
        {children}
      </RouteGuard>
    );
  }
  return <>{children}</>;
}
