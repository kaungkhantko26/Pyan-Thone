"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui";
import { Brand } from "./Brand";
import { useRole } from "@/lib/session";
import { cx } from "@/lib/util";

export function MarketplaceNav() {
  const pathname = usePathname();
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  const isSeller = role === "seller";
  const links = [
    { label: "Marketplace", href: "/buyer/marketplace" },
    { label: "Categories", href: "/buyer/marketplace" },
    ...(isSeller ? [{ label: "Seller Dashboard", href: "/seller/dashboard" }] : []),
  ];
  const sellHref = isSeller ? "/seller/dashboard" : "/seller/login";
  const sellLabel = isSeller ? "Dashboard" : "Sell an item";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-content items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Brand href="/" size={30} />

        <nav className="ml-4 hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={cx(
                "text-[14px] font-medium transition hover:text-ink",
                pathname?.startsWith(l.href) ? "text-ink" : "text-ink-secondary",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden min-w-0 flex-1 justify-center px-4 lg:flex">
          <label className="w-full max-w-md">
            <input
              className="h-10 w-full rounded-pill border border-line bg-page px-4 text-[14px] outline-none focus:border-action focus:bg-white"
              placeholder="Search phones, laptops, furniture…"
              aria-label="Search products"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          {role && (
            <Link href="/buyer/chat" className="hidden text-[14px] text-ink-secondary hover:text-ink sm:block">
              Chat
            </Link>
          )}
          {role && (
            <Link href="/buyer/delivery" className="hidden text-[14px] text-ink-secondary hover:text-ink sm:block">
              Orders
            </Link>
          )}
          <Button href={sellHref} size="sm" className="hidden sm:inline-flex">
            {sellLabel}
          </Button>
          <button
            aria-label="Menu"
            className="rounded-control border border-line p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-surface px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block rounded-control px-2 py-2 text-[15px] text-ink-secondary hover:bg-page"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {role && (
            <Link
              href="/buyer/chat"
              className="block rounded-control px-2 py-2 text-[15px] text-ink-secondary hover:bg-page"
              onClick={() => setOpen(false)}
            >
              Chat
            </Link>
          )}
          {role && (
            <Link
              href="/buyer/delivery"
              className="block rounded-control px-2 py-2 text-[15px] text-ink-secondary hover:bg-page"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>
          )}
          <Button href={sellHref} full className="mt-2">
            {sellLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
