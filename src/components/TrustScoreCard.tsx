import { TRUST_SCORE, SELLER } from "@/lib/data";
import { Button } from "./ui";

export function TrustScoreCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-subtle">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-action-soft text-[15px] font-bold text-action">
          {SELLER.name.split(" ").map((s) => s[0]).join("")}
        </span>
        <div>
          <p className="text-[15px] font-bold text-ink">{SELLER.name}</p>
          <p className="flex items-center gap-1 text-[12px] text-trust">
            <span className="h-1.5 w-1.5 rounded-full bg-trust" /> Verified seller
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-card bg-[#e6f4ec]/60 p-4">
        <div className="flex items-end gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-trust/80">Trust score</p>
            <p className="text-[40px] font-extrabold leading-none text-trust">{TRUST_SCORE.score}</p>
            <p className="text-[12px] text-ink-muted">/ 100 · ↑ +{TRUST_SCORE.delta} this month</p>
          </div>
          {!compact && (
            <dl className="ml-auto grid grid-cols-1 gap-x-4 gap-y-1 text-[12px] text-ink-secondary">
              {TRUST_SCORE.breakdown.map((b) => (
                <div key={b.label} className="flex justify-between gap-4">
                  <dt>{b.label}</dt>
                  <dd className="font-semibold text-ink">{b.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <p className="mt-4 text-[13px] font-semibold text-ink">
        ★ {SELLER.rating} Rating · {SELLER.sales} Sales · {SELLER.success}% Success
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TRUST_SCORE.badges.map((b) => (
          <span key={b} className="flex items-center gap-1 text-[12px] text-trust">
            <span className="h-1.5 w-1.5 rounded-full bg-trust" />
            {b}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button href="/buyer/seller/ko-aung" variant="secondary" size="sm">
          View profile
        </Button>
        <Button href="/buyer/chat" size="sm">
          Chat
        </Button>
      </div>
    </div>
  );
}
