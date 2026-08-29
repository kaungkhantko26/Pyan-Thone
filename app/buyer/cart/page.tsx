"use client";

import Link from "next/link";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { Button, PhotoTile } from "@/components/ui";
import { useCart, removeFromCart, clearCart } from "@/lib/cart";
import { conditionTone } from "@/lib/data";
import { cx, mmk } from "@/lib/util";

export default function CartPage() {
  const items = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[28px] font-extrabold tracking-tight text-ink">Your cart</h1>
          {items.length > 0 && (
            <button onClick={() => clearCart()} className="text-[13px] font-semibold text-ink-muted hover:text-ink">
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-card border border-line bg-surface p-10 text-center">
            <p className="text-[15px] text-ink-secondary">Your cart is empty.</p>
            <Button href="/buyer/marketplace" className="mt-5">
              Browse marketplace
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <ul className="divide-y divide-line rounded-card border border-line bg-surface">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-4">
                  <PhotoTile className="h-16 w-20 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/buyer/product/${item.id}`}
                      className="block truncate text-[15px] font-semibold text-ink hover:text-action"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-[12px] text-ink-muted">
                      <span className={cx("rounded-pill px-2 py-0.5 font-semibold", conditionTone(item.condition))}>
                        {item.condition}
                      </span>
                      <span>Seller: {item.seller}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-bold text-ink">{mmk(item.price)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-1 text-[12px] font-semibold text-ink-muted hover:text-[#d63c3c]"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="pyt-card h-fit p-6">
              <h2 className="text-[18px] font-bold text-ink">Summary</h2>
              <div className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between text-ink-secondary">
                  <span>
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                  <span>{mmk(subtotal)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-[15px] font-bold text-ink">
                  <span>Subtotal</span>
                  <span>{mmk(subtotal)}</span>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-ink-muted">Delivery and protection are calculated at checkout.</p>
              <div className="mt-4 space-y-3">
                <Button full href="/buyer/checkout">
                  Proceed to checkout
                </Button>
                <Button full variant="secondary" href="/buyer/marketplace">
                  Continue shopping
                </Button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
