import { MarketplaceNav } from "@/components/MarketplaceNav";
import { Button, Badge, PhotoTile } from "@/components/ui";
import { DELIVERY_STEPS } from "@/lib/data";
import { cx } from "@/lib/util";

export default function Delivery() {
  return (
    <div className="min-h-dvh bg-page">
      <MarketplaceNav />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[32px] font-extrabold tracking-tight text-ink">Delivery tracking</h1>
        <p className="mt-2 text-[14px] text-ink-secondary">
          Order #PYT-20491 · Expected Monday, 31 August
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-subtle">
          <PhotoTile className="h-20 w-24" />
          <div>
            <p className="text-[15px] font-bold text-ink">MacBook Air M1</p>
            <p className="text-[13px] text-ink-secondary">550,000 MMK · Condition: Good</p>
          </div>
          <Badge tone="trust">IN TRANSIT</Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ol className="pyt-card p-6">
            {DELIVERY_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <span
                    className={cx(
                      "grid h-6 w-6 place-items-center rounded-full text-[12px] font-bold",
                      s.state === "done" && "bg-trust text-white",
                      s.state === "current" && "bg-action text-white",
                      s.state === "todo" && "border border-line text-ink-muted",
                    )}
                  >
                    {s.state === "done" ? "✓" : s.state === "current" ? "●" : "○"}
                  </span>
                  {i < DELIVERY_STEPS.length - 1 && (
                    <span className={cx("mt-1 w-px flex-1", s.state === "done" ? "bg-trust" : "bg-line")} />
                  )}
                </div>
                <div className="pb-1">
                  <p className={cx("text-[14px] font-semibold", s.state === "todo" ? "text-ink-muted" : "text-ink")}>
                    {s.title}
                  </p>
                  <p className="text-[12px] text-ink-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="pyt-card h-fit p-6">
            <p className="text-[12px] text-ink-muted">Tracking ID</p>
            <p className="text-[20px] font-extrabold tracking-tight text-ink">PYT89201932</p>
            <p className="mt-3 text-[12px] text-ink-muted">
              Last update
              <br />
              Today, 10:42 AM · Yangon distribution hub
            </p>
            <div className="mt-4 space-y-3">
              <Button full variant="secondary" href="/buyer/chat">
                Contact seller
              </Button>
              <Button full variant="ghost">
                Contact support
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
