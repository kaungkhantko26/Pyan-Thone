import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { TrustScoreCard } from "@/components/TrustScoreCard";
import { ConditionReport, Gallery } from "@/components/interactive";
import { Badge } from "@/components/ui";
import { AddToCart } from "@/components/AddToCart";
import { PRODUCTS, CONDITION_REPORT, conditionTone } from "@/lib/data";
import { cx, mmk } from "@/lib/util";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <nav className="text-[13px] text-ink-muted">
          <Link href="/buyer/marketplace" className="hover:text-ink">
            Marketplace
          </Link>{" "}
          / <span className="text-ink-secondary">{product.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
          <Gallery />

          <div>
            <h1 className="text-[28px] font-extrabold tracking-tight text-ink">{product.title}</h1>
            <p className="mt-3 text-[24px] font-bold text-ink">{mmk(product.price)}</p>
            <p className="mt-2 text-[13px] text-ink-muted">
              Posted 2 hours ago · 📍 {product.distanceKm} km away
            </p>

            <div className="mt-5 rounded-card bg-warning-soft p-4">
              <p className={cx("text-[14px] font-semibold", "text-warning")}>● Condition · {product.condition}</p>
              <ul className="mt-2 space-y-0.5 text-[13px] text-ink-secondary">
                <li>Minor scratches</li>
                <li>Battery health: 89%</li>
                <li>No repair history</li>
              </ul>
            </div>

            <div className="mt-5">
              <AddToCart product={product} />
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="pyt-section-title">Full condition report</h2>
          <p className="mt-1 text-[14px] text-ink-secondary">
            Transparent evidence from the seller, all on the product page.
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
            <ConditionReport />
            <div className="pyt-card p-5">
              <p className="text-[15px] font-bold text-ink">Electronics diagnostics</p>
              <p className="mt-1 text-[13px] text-ink-secondary">{CONDITION_REPORT.diagnostics}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {CONDITION_REPORT.photos.map((label) => (
                  <div key={label} className="rounded-control bg-page p-2 text-center text-[11px] text-ink-muted">
                    <div className="mb-1 aspect-square rounded bg-action-soft" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="pyt-section-title">Seller</h2>
          <div className="mt-4 max-w-md">
            <TrustScoreCard />
          </div>
        </section>
      </main>
    </div>
  );
}
