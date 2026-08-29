"use client";

import { useState } from "react";
import { ModalPage } from "@/components/ModalPage";
import { Button, Field } from "@/components/ui";

export default function EmailComposer() {
  const [sent, setSent] = useState(false);

  return (
    <ModalPage back="/admin/console">
      {sent ? (
        <div className="py-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6f4ec] text-[26px] text-trust">
            ✓
          </div>
          <h2 className="mt-4 text-[20px] font-bold text-ink">Email sent</h2>
          <p className="mt-1 text-[14px] text-ink-secondary">
            Sent from Pyan Thone Support · recorded in the audit log.
          </p>
          <Button href="/admin/console" className="mt-6">
            Back to console
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="text-[24px] font-bold tracking-tight text-ink">Send email</h2>
          <p className="mt-1 text-[13px] text-ink-secondary">
            Messages are sent from Pyan Thone Support and recorded in the audit log.
          </p>
          <div className="mt-6 space-y-4">
            <Field label="Recipients" defaultValue="Ko Aung · Seller" />
            <label className="block">
              <span className="pyt-label">Template</span>
              <select className="pyt-input" defaultValue="Dispute update">
                <option>Dispute update</option>
                <option>Verification reminder</option>
                <option>Policy warning</option>
              </select>
            </label>
            <Field label="Subject" defaultValue="Update regarding order #PYT-20491" />
            <label className="block">
              <span className="pyt-label">Message</span>
              <textarea
                className="pyt-input h-40 resize-none py-3"
                defaultValue={
                  "Hello Ko Aung,\n\nWe are reviewing a buyer report connected to this order. Please reply with supporting condition photos within 48 hours.\n\nPyan Thone Support"
                }
              />
            </label>
          </div>
          <div className="mt-6 space-y-3">
            <Button full type="submit">
              Send email
            </Button>
            <Button full variant="secondary" href="/admin/console">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </ModalPage>
  );
}
