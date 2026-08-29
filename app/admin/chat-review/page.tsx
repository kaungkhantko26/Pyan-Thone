"use client";

import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui";
import { FLAGGED_CHATS } from "@/lib/data";
import { cx } from "@/lib/util";

const TRANSCRIPT = [
  { who: "Buyer", text: "The delivery arrived, but the battery health is lower than the listing." },
  { who: "Seller", text: "I updated the price in chat. I can refund the difference." },
  { who: "Flagged", text: "Buyer reports the item condition did not match the description." },
];

export default function ChatReview() {
  const [active, setActive] = useState(0);

  return (
    <AdminShell title="Chat review" active="Chat review">
      <p className="rounded-card bg-warning-soft p-3 text-[13px] text-ink-secondary">
        Admin visibility is limited to reports, disputes, and safety investigations. Every view is recorded ·
        Case #RPT-1028
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
        <aside className="pyt-card p-3">
          <p className="px-2 py-1 text-[14px] font-bold text-ink">Flagged conversations</p>
          <ul className="mt-1 space-y-1">
            {FLAGGED_CHATS.map((c, i) => (
              <li key={c.pair}>
                <button
                  onClick={() => setActive(i)}
                  className={cx(
                    "w-full rounded-control px-3 py-2.5 text-left transition",
                    i === active ? "bg-action-soft" : "hover:bg-page",
                  )}
                >
                  <span className="block text-[13px] font-semibold text-ink">{c.pair}</span>
                  <span className="block text-[12px] text-ink-muted">
                    {c.reason} · {c.ago}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="pyt-card p-5">
          <p className="text-[15px] font-bold text-ink">MacBook Air M1 · 535,000 MMK</p>
          <p className="text-[12px] text-ink-muted">Ko Aung (Seller) ↔ Ma Su (Buyer)</p>
          <div className="mt-4 space-y-3">
            {TRANSCRIPT.map((m, i) => (
              <div
                key={i}
                className={cx(
                  "rounded-card border p-3 text-[13px]",
                  m.who === "Flagged"
                    ? "border-warning/40 bg-warning-soft text-ink"
                    : "border-line bg-page text-ink-secondary",
                )}
              >
                <span className="font-semibold text-ink">{m.who}: </span>
                {m.text}
              </div>
            ))}
          </div>
        </section>

        <aside className="pyt-card h-fit p-5">
          <p className="text-[15px] font-bold text-ink">Investigation</p>
          <dl className="mt-3 space-y-2 text-[12px] text-ink-secondary">
            <div>
              <dt className="text-ink-muted">Access reason</dt>
              <dd className="font-semibold text-ink">Buyer dispute review</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Opened by</dt>
              <dd className="font-semibold text-ink">Admin Aye Aye</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Seller trust score</dt>
              <dd className="font-semibold text-ink">92 / 100</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Previous reports</dt>
              <dd className="font-semibold text-ink">0 active</dd>
            </div>
          </dl>
          <div className="mt-4 space-y-3">
            <Button full variant="secondary" href="/admin/email">
              Email participants
            </Button>
            <Button full variant="danger" href="/admin/ban">
              Ban seller account
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-ink-muted">Admin cannot edit or delete messages.</p>
        </aside>
      </div>
    </AdminShell>
  );
}
