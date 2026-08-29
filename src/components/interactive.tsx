"use client";

import { useRef, useState } from "react";
import { CONDITION_REPORT } from "@/lib/data";
import { Button, PhotoTile } from "./ui";
import { cx, mmk } from "@/lib/util";

/* ------------------------------------------------------------------ OTP */
type OtpLabels = { expires: string; resend: string; complete: string; warn: string };
const OTP_DEFAULT: OtpLabels = {
  expires: "Code expires in 04:32",
  resend: "Resend code",
  complete: "✓ Code complete — ready to verify",
  warn: "Never share this code with a seller, buyer, or support agent.",
};

export function OtpInput({ length = 6, labels = OTP_DEFAULT }: { length?: number; labels?: OtpLabels }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function set(i: number, v: string) {
    const digit = v.replace(/\D/g, "").slice(-1);
    setValues((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !values[i] && i > 0) refs.current[i - 1]?.focus();
  }

  const filled = values.every(Boolean);

  return (
    <div>
      <div className="flex gap-2.5">
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={val}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => set(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            className={cx(
              "h-16 flex-1 rounded-control border bg-page text-center text-[24px] font-bold outline-none transition",
              val ? "border-action bg-white text-ink" : "border-line text-ink-muted",
              "focus:border-action focus:bg-white focus:ring-4 focus:ring-action/10",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[12px]">
        <span className="text-ink-muted">{labels.expires}</span>
        <button className="font-semibold text-action">{labels.resend}</button>
      </div>
      <p className={cx("mt-2 text-[12px]", filled ? "text-trust" : "text-ink-muted")}>
        {filled ? labels.complete : labels.warn}
      </p>
    </div>
  );
}

/* -------------------------------------------------------- Condition report */
export function ConditionReport() {
  const r = CONDITION_REPORT;
  return (
    <div className="pyt-card overflow-hidden">
      <div className="border-b border-line bg-warning-soft px-5 py-3 text-[13px] font-semibold text-warning">
        ● Overall · {r.overall}
      </div>
      <div className="space-y-4 p-5">
        {r.metrics.map((m) => (
          <div key={m.label}>
            <div className="mb-1 flex justify-between text-[13px]">
              <span className="text-ink-secondary">{m.label}</span>
              <span className="font-semibold text-ink">{m.score}/10</span>
            </div>
            <div className="h-2 overflow-hidden rounded-pill bg-line">
              <div className="h-full rounded-pill bg-action" style={{ width: `${m.score * 10}%` }} />
            </div>
          </div>
        ))}
        <div className="pt-1">
          <p className="mb-2 text-[13px] font-semibold text-ink">Seller declaration</p>
          <div className="flex flex-wrap gap-2">
            {r.declarations.map((d) => (
              <span key={d} className="rounded-pill bg-page px-2.5 py-1 text-[12px] text-ink-secondary">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Offer card */
export function OfferCard({ amount = 520_000 }: { amount?: number }) {
  const [state, setState] = useState<"pending" | "accepted" | "rejected">("pending");
  return (
    <div className="max-w-sm rounded-card border border-action/30 bg-action-soft p-4">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-action">Price offer</p>
      <p className="mt-1 text-[22px] font-extrabold text-ink">{mmk(amount)}</p>
      <p className="text-[12px] text-ink-muted">
        {state === "pending"
          ? "Buyer offer · expires in 23 hours"
          : state === "accepted"
            ? "✓ Offer accepted · buyer notified"
            : "Offer declined"}
      </p>
      {state === "pending" && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setState("rejected")}>
            Reject
          </Button>
          <Button size="sm" onClick={() => setState("accepted")}>
            Accept
          </Button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- Tabs */
export function Tabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => setActive(i)}
          className={cx(
            "rounded-pill px-3.5 py-1.5 text-[13px] font-semibold transition",
            i === active ? "bg-action text-white" : "bg-surface text-ink-secondary border border-line hover:border-action/40",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ Gallery picker */
export function Gallery() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <PhotoTile className="aspect-[5/4] w-full" />
      <div className="mt-3 flex gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cx(
              "h-16 w-20 overflow-hidden rounded-control border-2 transition",
              i === active ? "border-action" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <PhotoTile className="h-full w-full rounded-none" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Upload tile */
export function UploadTile({ label }: { label: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <label
      className={cx(
        "flex aspect-[16/10] cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed text-center transition",
        name ? "border-trust bg-[#e6f4ec]/40" : "border-line bg-page hover:border-action/50",
      )}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setName(e.target.files?.[0]?.name ?? "Selected")}
      />
      <span className="text-[26px] leading-none text-action">{name ? "✓" : "+"}</span>
      <span className="mt-2 text-[14px] font-semibold text-ink">{name ?? label}</span>
      <span className="mt-1 text-[12px] text-ink-muted">{name ? "Tap to replace" : "JPG or PNG · Max 10 MB"}</span>
    </label>
  );
}
