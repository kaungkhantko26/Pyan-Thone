"use client";

import { useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui";
import { ADMIN_ACCOUNTS, ADMIN_STATS } from "@/lib/data";
import { cx } from "@/lib/util";

const TABS = ["All", "Buyers", "Sellers", "Pending verification", "Banned"];
const TONE: Record<string, string> = {
  action: "text-action",
  trust: "text-trust",
  warning: "text-warning",
  danger: "text-[#d63c3c]",
};

export default function AdminConsole() {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    return ADMIN_ACCOUNTS.filter((a) => {
      if (tab === "All") return true;
      if (tab === "Buyers") return a.role === "Buyer";
      if (tab === "Sellers") return a.role === "Seller";
      if (tab === "Pending verification") return a.verification.toLowerCase().includes("pending");
      if (tab === "Banned") return a.status === "Banned";
      return true;
    });
  }, [tab]);

  function toggle(name: string) {
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));
  }

  return (
    <AdminShell title="Marketplace overview" active="Overview">
      <p className="text-[14px] text-ink-secondary">
        Moderate accounts, review seller identity, and contact users.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((s) => (
          <div key={s.label} className="pyt-card p-5">
            <p className="text-[13px] font-semibold text-ink-secondary">{s.label}</p>
            <p className={cx("mt-1 text-[28px] font-extrabold tracking-tight", TONE[s.tone])}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-ink">Users and sellers</h2>
        <div className="flex gap-2">
          <Button href="/admin/email" size="sm" variant="secondary">
            Send email
          </Button>
          <Button href="/admin/ban" size="sm" disabled={selected.length === 0}>
            Ban selected{selected.length ? ` (${selected.length})` : ""}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              "rounded-pill px-3 py-1.5 text-[12px] font-semibold transition",
              t === tab ? "bg-action text-white" : "border border-line bg-surface text-ink-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="border-b border-line text-[12px] uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Account</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Verification</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Reports</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((a) => (
              <tr key={a.name} className="hover:bg-page">
                <td className="px-4 py-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-line"
                      checked={selected.includes(a.name)}
                      onChange={() => toggle(a.name)}
                    />
                    <span className="font-semibold text-ink">{a.name}</span>
                  </label>
                </td>
                <td className="px-4 py-4 text-ink-secondary">{a.role}</td>
                <td className="px-4 py-4 text-ink-secondary">{a.verification}</td>
                <td className="px-4 py-4">
                  <span
                    className={cx(
                      "font-semibold",
                      a.status === "Active" && "text-trust",
                      a.status === "Restricted" && "text-warning",
                      a.status === "Banned" && "text-[#d63c3c]",
                    )}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-ink-secondary">{a.reports}</td>
                <td className="px-4 py-4">
                  <span className="text-action">{a.action}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-card bg-warning-soft p-4 text-[13px] text-ink-secondary">
        All bans, unbans, emails, and chat access events are recorded in the admin audit log.
      </p>
    </AdminShell>
  );
}
