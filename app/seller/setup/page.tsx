"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button, Field } from "@/components/ui";

export default function SellerSetup() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);

  return (
    <AuthShell
      eyebrow="Seller onboarding"
      headline="Build a storefront buyers can trust."
      blurb="Your shop details appear on listings, receipts, chat, and seller profile pages."
      steps={["Shop details", "Identity", "Phone OTP"]}
    >
      <h2 className="text-[24px] font-bold tracking-tight text-ink">Set up your seller profile</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">
        Use accurate information. Admin may review it before listings go live.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/seller/identity");
        }}
      >
        <Field label="Shop name" defaultValue="Aung Tech Store" hint="Shown publicly to buyers" required />
        <Field
          label="Seller phone"
          defaultValue="+95 9 123 456 789"
          hint="Used for OTP and order updates"
          required
        />
        <div className="flex items-center justify-between rounded-card border border-line bg-page p-4">
          <div>
            <p className="text-[13px] font-semibold text-ink">Phone verification</p>
            <p className="text-[12px] text-ink-muted">
              {otpSent ? "Code sent · 04:32 remaining" : "Not started"}
            </p>
          </div>
          <Button type="button" size="sm" variant="secondary" onClick={() => setOtpSent(true)}>
            {otpSent ? "Resend" : "Enter OTP"}
          </Button>
        </div>
        <div className="rounded-card bg-warning-soft p-4 text-[13px]">
          <p className="font-semibold text-warning">Seller verification required</p>
          <p className="mt-1 text-ink-secondary">
            Next, upload the front and back of a valid NRC, passport, or driver licence.
          </p>
        </div>
        <Button full type="submit">
          Continue to identity verification
        </Button>
        <Button full variant="secondary" href="/buyer/choose-role">
          Back to role selection
        </Button>
      </form>
    </AuthShell>
  );
}
