"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole, type Role } from "@/lib/session";

/**
 * Client-side route restriction for the static demo. Users can only stay on a
 * guarded page if their stored role is in `allow`; otherwise they are redirected
 * to `redirectTo` (the matching sign-in screen).
 */
export function RouteGuard({
  allow,
  redirectTo,
  children,
}: {
  allow: Role[];
  redirectTo: string;
  children: React.ReactNode;
}) {
  const { role, ready } = useRole();
  const router = useRouter();
  const ok = role !== null && allow.includes(role);

  useEffect(() => {
    if (ready && !ok) router.replace(redirectTo);
  }, [ready, ok, redirectTo, router]);

  if (!ready) return <div className="min-h-dvh bg-page" />;
  if (!ok) {
    return (
      <div className="grid min-h-dvh place-items-center bg-page px-4 text-center text-[14px] text-ink-muted">
        Sign in to continue…
      </div>
    );
  }
  return <>{children}</>;
}
