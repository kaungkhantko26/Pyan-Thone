"use client";

import Link from "next/link";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui";
import { signOut } from "@/lib/session";
import { BUYER, BUYER_ORDERS, PRODUCTS } from "@/lib/data";
import { cx } from "@/lib/util";

export default function BuyerProfile() {
  const saved = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="pyt-card p-6">
          <div className="flex flex-wrap items-center gap-5">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-action-soft text-[24px] font-bold text-action">
              {BUYER.name.split(" ").map((s) => s[0]).join("")}
            </span>
            <div className="min-w-0">
              <h1 className="text-[24px] font-extrabold tracking-tight text-ink">{BUYER.name}</h1>
              <p className="mt-1 text-[13px] text-ink-muted">
                Buyer · {BUYER.city} · Member since {BUYER.memberSince}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BUYER.verifications.map((v) => (
                  <span key={v} className="flex items-center gap-1 text-[12px] text-trust">
                    <span className="h-1.5 w-1.5 rounded-full bg-trust" />
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button href="/buyer/marketplace" variant="secondary" size="sm">
                Keep shopping
              </Button>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
            {BUYER.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[12px] text-ink-muted">{s.label}</dt>
                <dd className="text-[20px] font-extrabold tracking-tight text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="pyt-card p-6">
            <h2 className="text-[16px] font-bold text-ink">Account details</h2>
            <dl className="mt-3 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Full name</dt>
                <dd className="font-semibold text-ink">{BUYER.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Phone</dt>
                <dd className="font-semibold text-ink">{BUYER.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Email</dt>
                <dd className="font-semibold text-ink">{BUYER.email}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">
                Edit profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut();
                  window.location.assign("/");
                }}
              >
                Sign out
              </Button>
            </div>
          </div>

          <div className="pyt-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-ink">Recent orders</h2>
              <Link href="/buyer/delivery" className="text-[13px] font-semibold text-action">
                Track
              </Link>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {BUYER_ORDERS.map((o) => (
                <li key={o.ref} className="flex items-center justify-between py-3 text-[14px]">
                  <span className="text-ink">
                    {o.item}
                    <span className="block text-[12px] text-ink-muted">
                      #{o.ref} · {o.seller}
                    </span>
                  </span>
                  <span
                    className={cx(
                      "text-[12px] font-semibold",
                      o.status === "Delivered" ? "text-trust" : "text-action",
                    )}
                  >
                    {o.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="pyt-section-title">Saved items</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
