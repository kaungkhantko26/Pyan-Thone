import Link from "next/link";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { ConditionReport, Gallery } from "@/components/interactive";
import { TrustScoreCard } from "@/components/TrustScoreCard";
import { Button } from "@/components/ui";
import { CONDITION_REPORT, PRODUCTS } from "@/lib/data";
import { mmk } from "@/lib/util";

export default function ListingPreview() {
  const product = PRODUCTS.find((p) => p.id === "iphone-14-pro")!;
  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <div className="bg-action-soft">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 text-[13px] sm:px-6 lg:px-8">
          <span className="font-semibold text-action">Preview · This is how buyers see your listing</span>
          <Link href="/seller/dashboard" className="font-semibold text-action underline">
            Back to dashboard
          </Link>
        </div>
      </div>
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
          <Gallery />
          <div>
            <h1 className="text-[28px] font-extrabold tracking-tight text-ink">{product.title}</h1>
            <p className="mt-3 text-[24px] font-bold text-ink">{mmk(product.price)}</p>
            <p className="mt-2 text-[13px] text-ink-muted">Draft · visible to you only</p>
            <div className="mt-5 rounded-card bg-warning-soft p-4 text-[13px] text-warning">
              ● Condition · {product.condition} — Minor scratches · Battery health 89% · No repair history
            </div>
            <div className="mt-5 space-y-3">
              <Button full href={`/seller/products/${product.id}/edit`}>
                Continue editing
              </Button>
              <Button full variant="secondary" href="/buyer/product/iphone-14-pro">
                View live listing
              </Button>
            </div>
          </div>
        </div>
        <section className="mt-16">
          <h2 className="pyt-section-title">Full condition report</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
            <ConditionReport />
            <div className="pyt-card p-5">
              <p className="text-[15px] font-bold text-ink">Electronics diagnostics</p>
              <p className="mt-1 text-[13px] text-ink-secondary">{CONDITION_REPORT.diagnostics}</p>
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
