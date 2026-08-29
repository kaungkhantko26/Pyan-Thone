import { MarketplaceNav } from "@/components/MarketplaceNav";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui";
import { PRODUCTS, SELLER, SELLER_METRICS, SELLER_ORDERS, TRUST_SCORE } from "@/lib/data";

export default function SellerDashboard() {
  const listings = PRODUCTS.filter((p) => p.seller === SELLER.name || p.category === "Home").slice(0, 4);
  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-extrabold tracking-tight text-ink">Seller Dashboard</h1>
            <p className="mt-1 text-[14px] text-ink-secondary">
              Good morning, {SELLER.name} · {SELLER.shop}
            </p>
          </div>
          <Button href="/seller/listing-preview">+ Add product</Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SELLER_METRICS.map((m) => (
            <div key={m.label} className="pyt-card p-5">
              <p className="text-[13px] font-semibold text-ink-secondary">{m.label}</p>
              <p className="mt-1 text-[26px] font-extrabold tracking-tight text-ink">{m.value}</p>
              <p className="mt-1 text-[12px] text-trust">{m.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="pyt-card p-6">
            <p className="text-[15px] font-bold text-ink">Trust Score</p>
            <p className="mt-2 text-[40px] font-extrabold leading-none text-trust">
              {TRUST_SCORE.score} <span className="text-[18px] text-ink-muted">/ 100</span>
            </p>
            <p className="mt-2 text-[13px] font-semibold text-trust">↑ +{TRUST_SCORE.delta} this month</p>
            <dl className="mt-3 space-y-1 text-[12px] text-ink-secondary">
              {TRUST_SCORE.breakdown.map((b) => (
                <div key={b.label} className="flex justify-between">
                  <dt>{b.label}</dt>
                  <dd className="font-semibold text-ink">{b.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pyt-card p-6">
            <p className="text-[15px] font-bold text-ink">Active orders</p>
            <ul className="mt-3 divide-y divide-line">
              {SELLER_ORDERS.map((o) => (
                <li key={o.item} className="flex items-center justify-between py-3 text-[14px]">
                  <span className="text-ink">
                    {o.item} <span className="text-ink-muted">· {o.buyer}</span>
                  </span>
                  <span className="text-[12px] font-semibold text-action">{o.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="pyt-section-title">Your listings</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {listings.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
