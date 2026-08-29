import { MarketplaceNav } from "./MarketplaceNav";
import { TrustScoreCard } from "./TrustScoreCard";
import { ProductCard } from "./ProductCard";
import { Stars } from "./ui";
import { PRODUCTS, REVIEWS, SELLER } from "@/lib/data";

export function SellerProfile() {
  const listings = PRODUCTS.filter((p) => p.seller === SELLER.name).slice(0, 3);
  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="pyt-card p-6">
            <div className="flex items-center gap-5">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-action-soft text-[28px] font-bold text-action">
                {SELLER.name.split(" ").map((s) => s[0]).join("")}
              </span>
              <div>
                <h1 className="text-[26px] font-extrabold tracking-tight text-ink">{SELLER.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-[13px] text-trust">
                  <span className="h-1.5 w-1.5 rounded-full bg-trust" /> Verified seller
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
          <h2 className="pyt-section-title">Active listings</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {listings.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
