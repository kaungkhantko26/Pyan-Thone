"use client";

import { useEffect, useState } from "react";

export type Role = "buyer" | "seller" | "admin";

const KEY = "pyt.role";
const EVT = "pyt.role.change";

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  try {
    const r = localStorage.getItem(KEY);
    return r === "buyer" || r === "seller" || r === "admin" ? r : null;
  } catch {
    return null;
  }
}

export function setRole(role: Role | null) {
  try {
    if (role) localStorage.setItem(KEY, role);
    else localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVT));
}

export function signOut() {
  setRole(null);
}

/** Reactive role reader. `ready` is false until the first client read completes. */
export function useRole(): { role: Role | null; ready: boolean } {
  const [role, setRoleState] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setRoleState(getRole());
      setReady(true);
    };
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { role, ready };
}
