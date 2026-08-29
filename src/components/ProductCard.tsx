import Link from "next/link";
import { Product, conditionTone } from "@/lib/data";
import { cx, mmk } from "@/lib/util";
import { PhotoTile } from "./ui";

export function ProductCard({ product, href }: { product: Product; href?: string }) {
  return (
    <Link
      href={href ?? `/buyer/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-subtle transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <PhotoTile className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <h3 className="text-[15px] font-semibold text-ink">{product.title}</h3>
        <p className="text-[15px] font-bold text-ink">{mmk(product.price)}</p>
        <div className="flex items-center gap-2 text-[12px] text-ink-muted">
          <span className={cx("rounded-pill px-2 py-0.5 font-semibold", conditionTone(product.condition))}>
            {product.condition}
          </span>
          <span>{product.distanceKm} km away</span>
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-1 text-[12px] text-ink-secondary">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-trust" />
          Trusted seller
          <span className="text-ink-muted">·</span>
          <span className="font-semibold text-trust">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}
