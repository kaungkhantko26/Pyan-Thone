"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { cx } from "@/lib/util";

export function CartButton({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const items = useCart();
  const count = items.length;

  return (
    <Link
      href="/buyer/cart"
      aria-label={`Cart${count ? ` (${count} item${count > 1 ? "s" : ""})` : ""}`}
      className={cx(
        "relative inline-flex items-center gap-2 rounded-control text-ink-secondary transition hover:text-ink",
        withLabel ? "px-2 py-2 text-[15px]" : "p-1.5",
        className,
      )}
    >
      <span className="relative">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h2l.4 2M7 13h10l3.5-8H5.4M7 13 5.4 5M7 13l-2 4h12" />
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="17" cy="20" r="1.4" />
        </svg>
        {count > 0 && (
          <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-pill bg-action px-1 text-[10px] font-bold leading-none text-white">
            {count}
          </span>
        )}
      </span>
      {withLabel && <span>Cart</span>}
    </Link>
  );
}
