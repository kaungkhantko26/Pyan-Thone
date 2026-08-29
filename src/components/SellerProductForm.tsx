"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketplaceNav } from "./MarketplaceNav";
import { Button, Field, PhotoTile } from "./ui";
import { UploadTile } from "./interactive";
import { CATEGORIES, type Condition, type Product } from "@/lib/data";
import { cx, mmk } from "@/lib/util";

const CONDITIONS: Condition[] = ["Like New", "Good", "Fair"];
const CATS = CATEGORIES.filter((c) => c !== "All");

type Draft = {
  title: string;
  price: string;
  category: string;
  condition: Condition;
  location: string;
  description: string;
  appearance: number;
  functionality: number;
  battery: number;
  diagnostics: string;
};

export function SellerProductForm({
  mode,
  product,
}: {
  mode: "new" | "edit";
  product?: Product;
}) {
  const [d, setD] = useState<Draft>({
    title: product?.title ?? "",
    price: product ? String(product.price) : "",
    category: product?.category ?? CATS[0],
    condition: product?.condition ?? "Good",
    location: product ? `${product.distanceKm} km away` : "Yangon",
    description: "",
    appearance: 8,
    functionality: 9,
    battery: 8,
    diagnostics: "Battery health 89% · No repair history · All ports tested",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<"idle" | "draft" | "published">("idle");

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const priceNum = Number(d.price) || 0;
  const canPublish = d.title.trim() !== "" && priceNum > 0;

  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <nav className="text-[13px] text-ink-muted">
          <Link href="/seller/dashboard" className="hover:text-ink">
            Seller Dashboard
          </Link>{" "}
          / <span className="text-ink-secondary">{mode === "new" ? "New product" : `Edit · ${product?.title}`}</span>
        </nav>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[28px] font-extrabold tracking-tight text-ink">
            {mode === "new" ? "Add a product" : "Edit listing"}
          </h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowPreview((v) => !v)}>
              {showPreview ? "Hide preview" : "Preview"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatus("draft")}
              disabled={!d.title.trim()}
            >
              Save draft
            </Button>
            <Button size="sm" onClick={() => setStatus("published")} disabled={!canPublish}>
              {mode === "new" ? "Publish listing" : "Save & publish"}
            </Button>
          </div>
        </div>

        {status !== "idle" && (
          <div
            className={cx(
              "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-card border p-4 text-[13px] font-semibold",
              status === "published"
                ? "border-trust/30 bg-[#e6f4ec]/60 text-trust"
                : "border-warning/30 bg-warning-soft/60 text-warning",
            )}
          >
            <span>
              {status === "published"
                ? "✓ Listing published — buyers can now find it in the marketplace."
                : "Draft saved. It stays private until you publish."}
            </span>
            <span className="flex gap-2">
              {status === "published" && product && (
                <Link href={`/buyer/product/${product.id}`} className="underline">
                  View public listing
                </Link>
              )}
              <Link href="/seller/dashboard" className="underline">
                Back to dashboard
              </Link>
            </span>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <section className="pyt-card p-6">
              <h2 className="text-[16px] font-bold text-ink">Basics</h2>
              <div className="mt-4 space-y-4">
                <Field
                  label="Title"
                  value={d.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Apple iPhone 14 Pro"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Price (MMK)"
                    inputMode="numeric"
                    value={d.price}
                    onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))}
                    placeholder="1250000"
                  />
                  <label className="block">
                    <span className="pyt-label">Category</span>
                    <select
                      className="pyt-input"
                      value={d.category}
                      onChange={(e) => set("category", e.target.value)}
                    >
                      {CATS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <span className="pyt-label">Condition</span>
                  <div className="flex flex-wrap gap-2">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => set("condition", c)}
                        className={cx(
                          "rounded-pill border px-3.5 py-2 text-[13px] font-semibold transition",
                          d.condition === c
                            ? "border-action bg-action text-white"
                            : "border-line text-ink-secondary hover:border-action/40",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <Field
                  label="Location"
                  value={d.location}
                  onChange={(e) => set("location", e.target.value)}
                />
                <label className="block">
                  <span className="pyt-label">Description</span>
                  <textarea
                    className="pyt-input h-28 resize-none py-3"
                    value={d.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="What you're selling, why, and anything a buyer should know."
                  />
                </label>
              </div>
            </section>

            <section className="pyt-card p-6">
              <h2 className="text-[16px] font-bold text-ink">Condition report</h2>
              <p className="mt-1 text-[13px] text-ink-secondary">
                Buyers see this evidence on the product page. Be accurate.
              </p>
              <div className="mt-4 space-y-4">
                {(
                  [
                    ["appearance", "Appearance"],
                    ["functionality", "Functionality"],
                    ["battery", "Battery health"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-[13px]">
                      <span className="text-ink-secondary">{label}</span>
                      <span className="font-semibold text-ink">{d[key]}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={d[key]}
                      onChange={(e) => set(key, Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                ))}
                <Field
                  label="Diagnostics note"
                  value={d.diagnostics}
                  onChange={(e) => set("diagnostics", e.target.value)}
                />
              </div>
            </section>

            <section className="pyt-card p-6">
              <h2 className="text-[16px] font-bold text-ink">Photos</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <UploadTile label="Main photo" />
                <UploadTile label="Angle / back" />
                <UploadTile label="Any flaws" />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {showPreview ? (
              <div className="pyt-card overflow-hidden">
                <PhotoTile className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-1.5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                    Buyer preview
                  </p>
                  <h3 className="text-[16px] font-bold text-ink">{d.title || "Untitled listing"}</h3>
                  <p className="text-[16px] font-bold text-ink">{mmk(priceNum)}</p>
                  <p className="text-[12px] text-ink-muted">
                    {d.condition} · {d.location || "—"}
                  </p>
                  {d.description && (
                    <p className="pt-1 text-[13px] text-ink-secondary">{d.description}</p>
                  )}
                  <div className="mt-2 rounded-control bg-warning-soft p-2 text-[12px] text-warning">
                    ● Condition report · A {d.appearance} · F {d.functionality} · B {d.battery} / 10
                  </div>
                </div>
              </div>
            ) : (
              <div className="pyt-card p-6 text-[13px] text-ink-secondary">
                <h2 className="text-[15px] font-bold text-ink">Publishing checklist</h2>
                <ul className="mt-3 space-y-2">
                  <li className={d.title.trim() ? "text-trust" : ""}>
                    {d.title.trim() ? "✓" : "○"} Clear title
                  </li>
                  <li className={priceNum > 0 ? "text-trust" : ""}>
                    {priceNum > 0 ? "✓" : "○"} Price set
                  </li>
                  <li className={d.description.trim() ? "text-trust" : ""}>
                    {d.description.trim() ? "✓" : "○"} Description added
                  </li>
                  <li>○ At least one clear photo</li>
                </ul>
                <p className="mt-4 text-[12px] text-ink-muted">
                  Admin may review new listings before they appear publicly.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
