"use client";

import Link from "next/link";
import { useState } from "react";
import { Brand } from "./Brand";
import { ADMIN_NAV } from "@/lib/data";
import { cx } from "@/lib/util";

const HREF: Record<string, string> = {
  Overview: "/admin/console",
  "Chat review": "/admin/chat-review",
  "Email center": "/admin/email",
};

export function AdminShell({ title, active, children }: { title: string; active: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-page">
      <header className="flex h-[68px] items-center justify-between border-b border-line bg-surface px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-control border border-line p-2 lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <Link href="/admin/console" className="flex items-center gap-2">
            <Brand href={null} size={26} wordmark={false} />
            <span className="text-[16px] font-extrabold text-ink">Pyan Thone Admin</span>
          </Link>
        </div>
        <p className="text-[13px] text-ink-muted">Admin Aye Aye · Secure session</p>
      </header>

      <div className="mx-auto flex max-w-shell">
        <aside
          className={cx(
            "w-60 shrink-0 border-r border-line bg-surface p-4 lg:block",
            open ? "block" : "hidden",
          )}
        >
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item}
                href={HREF[item] ?? "/admin/console"}
                className={cx(
                  "block rounded-control px-3 py-2.5 text-[13px] font-medium transition",
                  item === active ? "bg-action-soft text-action" : "text-ink-secondary hover:bg-page",
                )}
              >
                {item}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <h1 className="text-[28px] font-extrabold tracking-tight text-ink">{title}</h1>
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
