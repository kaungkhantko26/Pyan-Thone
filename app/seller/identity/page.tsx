"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui";
import { UploadTile } from "@/components/interactive";
import { cx } from "@/lib/util";

const DOCS = ["NRC", "Passport", "Driver licence"];

export default function Identity() {
  const router = useRouter();
  const [doc, setDoc] = useState("NRC");

  return (
    <AuthShell
      eyebrow="Identity verification"
      headline="Verify once. Trade with confidence."
      blurb="Documents are visible only to authorized review staff and are never shown to buyers."
      steps={["Shop details", "Identity", "Phone OTP"]}
    >
      <h2 className="text-[24px] font-bold tracking-tight text-ink">Verify seller identity</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">
        Choose one government-issued document and upload clear images.
      </p>

      <p className="pyt-label mt-6">Document type</p>
      <div className="flex flex-wrap gap-2">
        {DOCS.map((d) => (
          <button
            key={d}
            onClick={() => setDoc(d)}
            className={cx(
              "flex items-center gap-2 rounded-control border px-4 py-2.5 text-[13px] font-semibold transition",
              doc === d ? "border-action bg-action-soft text-action" : "border-line text-ink-secondary",
            )}
          >
            <span
              className={cx("grid h-4 w-4 place-items-center rounded-full border-2", doc === d ? "border-action" : "border-line")}
            >
              {doc === d && <span className="h-2 w-2 rounded-full bg-action" />}
            </span>
            {d}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <UploadTile label="Upload front" />
        <UploadTile label="Upload back" />
      </div>

      <div className="mt-4 rounded-card bg-[#e6f4ec]/50 p-4 text-[12px]">
        <p className="font-semibold text-ink">Photo quality checklist</p>
        <p className="mt-1 text-ink-secondary">
          ✓ All four corners visible ✓ Text readable ✓ No glare or blur
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Button full onClick={() => router.push("/seller/otp")}>
          Submit for verification
        </Button>
        <Button full variant="secondary" href="/seller/setup">
          Back to shop details
        </Button>
      </div>
    </AuthShell>
  );
}
