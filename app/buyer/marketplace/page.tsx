"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MarketplaceNav } from "@/components/MarketplaceNav";
import { ProductCard } from "@/components/ProductCard";
import { Button, Chip } from "@/components/ui";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/data";

function matchesQuery(product: Product, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [product.title, product.seller, product.category, product.condition].join(" ").toLowerCase();
  return haystack.includes(q);
}

function MarketplaceResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"reco" | "low" | "high">("reco");

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && matchesQuery(p, query));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort, query]);

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />

      <section className="border-b border-line bg-action-soft">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-action">
              Buy local · Reuse more
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Give your belongings a new life.
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-secondary">
              Buy and sell trusted second-hand products from people around you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#results">Explore marketplace</Button>
              <Button href="/seller/setup" variant="secondary">
                Sell something
              </Button>
            </div>
          </div>
          <div className="self-center rounded-card bg-surface p-5 text-[13px] font-semibold text-ink-secondary shadow-subtle">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-trust" /> 2,840 verified sellers
            </p>
            <p className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-trust" /> 12,600 items reused
            </p>
            <p className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-trust" /> 4.8 average rating
            </p>
          </div>
        </div>
      </section>

      <main id="results" className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="pyt-section-title">Browse categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Chip key={c} active={c === cat} onClick={() => setCat(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[20px] font-bold text-ink">
            {query.trim() ? `Results for “${query.trim()}”` : "Recommended for you"}
          </h3>
          <label className="flex items-center gap-2 text-[13px] text-ink-muted">
            {products.length} products · Sort:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-control border border-line bg-surface px-2 py-1 font-semibold text-ink"
            >
              <option value="reco">Recommended</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>

        {products.length === 0 ? (
          <p className="mt-8 rounded-card border border-line bg-surface px-4 py-8 text-center text-[15px] text-ink-secondary">
            No products match “{query.trim()}”. Try another search or category.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Marketplace() {
  return (
    <Suspense>
      <MarketplaceResults />
    </Suspense>
  );
}
