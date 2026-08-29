import Link from "next/link";
import { MarketplaceNav } from "./MarketplaceNav";
import { TrustScoreCard } from "./TrustScoreCard";
import { ProductCard } from "./ProductCard";
import { Stars, Badge, PhotoTile } from "./ui";
import { PRODUCTS, REVIEWS, SELLER, SOLD_LISTINGS } from "@/lib/data";
import { mmk } from "@/lib/util";

export function SellerProfile({ owner = false }: { owner?: boolean }) {
  const listings = PRODUCTS.filter((p) => p.seller === SELLER.name).slice(0, 3);

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        {owner && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-card border border-action/20 bg-action-soft px-5 py-3">
            <p className="text-[13px] font-semibold text-action">
              This is your public profile — buyers see exactly this.
            </p>
            <Link href="/seller/setup" className="text-[13px] font-semibold text-action underline">
              Edit shop details
            </Link>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="pyt-card p-6">
            <div className="flex items-center gap-5">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-action-soft text-[28px] font-bold text-action">
                {SELLER.name.split(" ").map((s) => s[0]).join("")}
              </span>
              <div>
                <h1 className="text-[26px] font-extrabold tracking-tight text-ink">{SELLER.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-[13px] text-trust">
                  <span className="h-1.5 w-1.5 rounded-full bg-trust" /> Verified seller · {SELLER.shop}
                </p>
                <p className="mt-1 text-[13px] text-ink-muted">Member since {SELLER.memberSince}</p>
                <p className="mt-1 text-[13px] font-semibold text-ink">
                  ★ {SELLER.rating} Rating · {SELLER.sales} Sales · {SELLER.success}% Success
                </p>
                <p className="mt-1 text-[12px] text-ink-muted">{SELLER.verifications.join(" · ")}</p>
              </div>
            </div>
          </div>
          <TrustScoreCard />
        </div>

        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="pyt-section-title">Sold items</h2>
            <span className="text-[13px] text-ink-muted">Completed &amp; confirmed sales</span>
          </div>
          <p className="mt-1 text-[13px] text-ink-secondary">
            Proof of track record — each sale was paid through Pyan Thone and confirmed by the buyer.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOLD_LISTINGS.map((s) => (
              <div key={s.id} className="overflow-hidden rounded-card border border-line bg-surface shadow-subtle">
                <div className="relative">
                  <PhotoTile className="aspect-[4/3] w-full rounded-none opacity-90" />
                  <span className="absolute left-2 top-2">
                    <Badge tone="trust">Sold</Badge>
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 className="text-[14px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-[14px] font-bold text-ink">{mmk(s.price)}</p>
                  <p className="mt-1 text-[12px] text-ink-muted">
                    {s.condition} · sold {s.soldWhen}
                  </p>
                  <p className="mt-1 text-[12px] text-trust">
                    <Stars n={s.rating} /> <span className="text-ink-muted">by {s.buyer}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="pyt-section-title">Buyer reviews</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.author} className="pyt-card p-5 text-[13px]">
                <Stars n={r.stars} />
                <p className="mt-2 text-ink">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-2 text-ink-muted">
                  {r.author} · {r.when}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="pyt-section-title">Active listings</h2>
            {owner && (
              <Link href="/seller/products/new" className="text-[13px] font-semibold text-action">
                + Add product
              </Link>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {listings.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                href={owner ? `/seller/products/${p.id}/edit` : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
