"use client";

import { useState } from "react";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { Button, Field } from "@/components/ui";
import { useCart, clearCart } from "@/lib/cart";
import { PRODUCTS } from "@/lib/data";
import { mmk, cx } from "@/lib/util";

const STEPS = ["Delivery", "Review", "Confirmation"];
const DELIVERY_FEE = 3500;

export default function Checkout() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"standard" | "meet">("standard");

  const items = cart.length ? cart : [PRODUCTS.find((p) => p.id === "macbook-air-m1")!];
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const fee = method === "standard" ? DELIVERY_FEE : 0;

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[28px] font-extrabold tracking-tight text-ink">Checkout</h1>
        <ol className="mt-2 flex gap-4 text-[13px]">
          {STEPS.map((s, i) => (
            <li key={s} className={cx("font-semibold", i <= step ? "text-action" : "text-ink-muted")}>
              {i + 1} {s}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="pyt-card p-6">
            {step === 0 && (
              <>
                <h2 className="text-[18px] font-bold text-ink">Delivery information</h2>
                <div className="mt-4 grid gap-4">
                  <Field label="Full name" defaultValue="Ma Su" />
                  <Field label="Phone" defaultValue="+95 9 765 432 100" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="City" defaultValue="Yangon" />
                    <Field label="Township" defaultValue="Hlaing" />
                  </div>
                  <Field label="Address" defaultValue="No. 24, Insein Road, Hlaing" />
                </div>
                <p className="mt-6 text-[14px] font-semibold text-ink">Delivery method</p>
                <div className="mt-2 space-y-3">
                  {(
                    [
                      { id: "standard", title: "Standard delivery", sub: "2–3 days · 3,500 MMK" },
                      { id: "meet", title: "Meet seller", sub: "Arrange safely in chat" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={cx(
                        "flex w-full items-center gap-3 rounded-card border p-4 text-left transition",
                        method === m.id ? "border-action bg-action-soft" : "border-line hover:border-action/40",
                      )}
                    >
                      <span
                        className={cx(
                          "grid h-4 w-4 place-items-center rounded-full border-2",
                          method === m.id ? "border-action" : "border-line",
                        )}
                      >
                        {method === m.id && <span className="h-2 w-2 rounded-full bg-action" />}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-ink">{m.title}</span>
                        <span className="block text-[12px] text-ink-muted">{m.sub}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-[18px] font-bold text-ink">Review your order</h2>
                <ul className="mt-4 divide-y divide-line">
                  {items.map((i) => (
                    <li key={i.id} className="flex justify-between py-3 text-[14px]">
                      <span className="text-ink">
                        {i.title}
                        <span className="block text-[12px] text-ink-muted">
                          Condition: {i.condition} · Seller: {i.seller}
                        </span>
                      </span>
                      <span className="font-semibold text-ink">{mmk(i.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-ink-secondary">
                  Delivery: {method === "standard" ? "Standard (2–3 days)" : "Meet seller"}
                </p>
              </>
            )}

            {step === 2 && (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6f4ec] text-[26px] text-trust">
                  ✓
                </div>
                <h2 className="mt-4 text-[20px] font-bold text-ink">Order placed</h2>
                <p className="mt-1 text-[14px] text-ink-secondary">
                  Order #PYT-20491 · Payment is protected until you confirm the item.
                </p>
                <Button href="/buyer/delivery" className="mt-6">
                  Track delivery
                </Button>
              </div>
            )}
          </div>

          <aside className="pyt-card h-fit p-6">
            <h2 className="text-[18px] font-bold text-ink">Order summary</h2>
            <div className="mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between text-ink-secondary">
                <span>Item{items.length > 1 ? "s" : ""}</span>
                <span>{mmk(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Delivery</span>
                <span>{mmk(fee)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-[15px] font-bold text-ink">
                <span>Total</span>
                <span>{mmk(subtotal + fee)}</span>
              </div>
            </div>
            <p className="mt-3 text-[12px] text-ink-muted">Payment is protected until buyer confirmation.</p>

            <div className="mt-4 space-y-3">
              {step < 2 ? (
                <Button
                  full
                  onClick={() => {
                    if (step === 1) clearCart();
                    setStep((s) => s + 1);
                  }}
                >
                  {step === 0 ? "Continue to review" : "Place order"}
                </Button>
              ) : null}
              {step > 0 && step < 2 && (
                <Button full variant="secondary" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              )}
              {step === 0 && (
                <Button full variant="secondary" href="/buyer/marketplace">
                  Back to marketplace
                </Button>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
