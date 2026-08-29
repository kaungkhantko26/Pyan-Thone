"use client";

import { useState } from "react";
import { MarketplaceNav } from "./MarketplaceNav";
import { Button } from "./ui";
import { OfferCard } from "./interactive";
import { CONVERSATIONS } from "@/lib/data";
import { cx, mmk } from "@/lib/util";

type Msg = { from: "me" | "them"; text: string };

export function ChatWorkspace({ role }: { role: "buyer" | "seller" }) {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [price, setPrice] = useState(550_000);
  const [draftPrice, setDraftPrice] = useState("535000");
  const [updated, setUpdated] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "them", text: "Is this still available?" },
    { from: "me", text: "Yes, still available. Battery is at 89%." },
  ]);
  const [draft, setDraft] = useState("");

  const active = CONVERSATIONS.find((c) => c.id === activeId)!;

  function send() {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "me", text: draft.trim() }]);
    setDraft("");
  }

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-card border border-line bg-surface shadow-subtle md:grid-cols-[300px_1fr]">
          {/* conversation list */}
          <aside className="border-b border-line md:border-b-0 md:border-r">
            <h2 className="px-4 pb-2 pt-5 text-[18px] font-bold text-ink">Messages</h2>
            <ul>
              {CONVERSATIONS.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={cx(
                      "flex w-full flex-col gap-0.5 border-l-2 px-4 py-3 text-left transition",
                      c.id === activeId ? "border-action bg-action-soft" : "border-transparent hover:bg-page",
                    )}
                  >
                    <span className="text-[14px] font-semibold text-ink">{c.name}</span>
                    <span className="text-[12px] text-ink-muted">
                      {c.item} · {c.note}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* conversation */}
          <section className="flex min-h-[560px] flex-col">
            <header className="border-b border-line px-5 py-4">
              <p className="text-[15px] font-bold text-ink">{active.item}</p>
              <p className="text-[12px] text-ink-muted">
                {mmk(price)} · Good{role === "seller" && " · Edit price below"}
              </p>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cx(
                    "max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px]",
                    m.from === "me" ? "ml-auto bg-action text-white" : "bg-page text-ink",
                  )}
                >
                  {m.text}
                </div>
              ))}

              <OfferCard amount={520_000} />

              {role === "seller" && (
                <div className="max-w-lg rounded-card border border-line bg-page p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Update listing price
                  </p>
                  <p className="mt-2 text-[13px] text-ink-secondary">
                    Current price <span className="font-bold text-ink">{mmk(price)}</span>
                  </p>
                  <div className="mt-3 flex gap-2">
                    <div className="flex flex-1 items-center rounded-control border border-line bg-white px-3">
                      <span className="text-[12px] text-ink-muted">MMK</span>
                      <input
                        value={draftPrice}
                        onChange={(e) => setDraftPrice(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-transparent px-2 py-2.5 text-[15px] font-semibold outline-none"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setPrice(Number(draftPrice) || price);
                        setUpdated(true);
                      }}
                    >
                      Update price
                    </Button>
                  </div>
                  <p className="mt-2 text-[12px] text-ink-muted">
                    Updating changes the listing price and notifies this buyer.
                  </p>
                  {updated && (
                    <p className="mt-2 rounded-control bg-[#e6f4ec] px-3 py-2 text-[12px] font-semibold text-trust">
                      ✓ Listing price updated to {mmk(price)} · Buyer notified
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-line px-5 py-2 text-[12px] text-warning">
              ▲ Keep payments and conversations inside Pyan Thone. Never share OTPs or passwords.
            </div>
            <form
              className="flex items-center gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message…"
                className="h-10 flex-1 rounded-pill border border-line bg-page px-4 text-[14px] outline-none focus:border-action focus:bg-white"
              />
              <Button size="sm" variant="secondary" type="button">
                Make offer
              </Button>
              <Button size="sm" type="submit">
                Send →
              </Button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
