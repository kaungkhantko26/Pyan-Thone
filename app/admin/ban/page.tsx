"use client";

import { useState } from "react";
import { ModalPage } from "@/components/ModalPage";
import { Button } from "@/components/ui";

export default function BanReview() {
  const [ack, setAck] = useState(false);
  const [duration, setDuration] = useState("7 days");
  const [done, setDone] = useState(false);

  return (
    <ModalPage back="/admin/chat-review">
      {done ? (
        <div className="py-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-warning-soft text-[26px] text-warning">
            ⏻
          </div>
          <h2 className="mt-4 text-[20px] font-bold text-ink">Account restricted for {duration}</h2>
          <p className="mt-1 text-[14px] text-ink-secondary">
            Listings hidden · seller notified by email with appeal link · logged.
          </p>
          <Button href="/admin/console" className="mt-6">
            Back to console
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <h2 className="text-[24px] font-bold tracking-tight text-ink">Ban seller account?</h2>
          <p className="mt-1 text-[13px] text-ink-secondary">
            Ko Aung · Aung Tech Store · Trust score 92/100
          </p>

          <div className="mt-4 rounded-card bg-action-soft p-4 text-[13px]">
            <p className="font-semibold text-ink">Case evidence</p>
            <p className="mt-1 text-ink-secondary">
              1 buyer dispute · Listing condition mismatch · Chat reviewed by Admin Aye Aye
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="pyt-label">Ban reason</span>
              <select className="pyt-input" defaultValue="Misleading product condition">
                <option>Misleading product condition</option>
                <option>Payment fraud</option>
                <option>Harassment</option>
                <option>Repeated policy violations</option>
              </select>
            </label>
            <label className="block">
              <span className="pyt-label">Duration</span>
              <select className="pyt-input" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option>3 days</option>
                <option>7 days</option>
                <option>30 days</option>
                <option>Permanent</option>
              </select>
            </label>
          </div>

          <div className="mt-4 rounded-card bg-warning-soft p-4 text-[13px]">
            <p className="font-semibold text-warning">Account impact</p>
            <p className="mt-1 text-ink-secondary">
              Listings are hidden, selling is disabled, and the seller receives an email with the reason and
              appeal link.
            </p>
          </div>

          <label className="mt-4 flex items-start gap-2 text-[13px] text-ink-secondary">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-line"
              checked={ack}
              onChange={(e) => setAck(e.target.checked)}
            />
            I reviewed the evidence and understand this action is logged.
          </label>

          <div className="mt-5 space-y-3">
            <Button full variant="danger" type="submit" disabled={!ack}>
              Confirm {duration.toLowerCase()} ban
            </Button>
            <Button full variant="secondary" href="/admin/chat-review">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </ModalPage>
  );
}
