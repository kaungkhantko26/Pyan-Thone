"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const register = () => {
      navigator.serviceWorker.register(`${bp}/sw.js`, { scope: `${bp}/` }).catch(() => {
        /* offline support is progressive — ignore failures */
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
