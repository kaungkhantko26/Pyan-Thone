import Link from "next/link";
import { Button } from "@/components/ui";
import { Brand } from "@/components/Brand";

const FLOWS = [
  {
    title: "Buyer",
    blurb: "Browse trusted products, view condition reports, chat, make offers, and track delivery.",
    href: "/buyer/login",
    screens: ["Login", "Sign up", "Choose role", "Phone OTP", "Marketplace", "Product detail", "Seller profile", "Chat & offer", "Checkout", "Delivery tracking"],
  },
  {
    title: "Seller",
    blurb: "Set up a storefront, verify identity, publish listings, and manage orders from a dashboard.",
    href: "/seller/login",
    screens: ["Login", "Sign up", "Seller setup", "Identity verification", "Phone OTP", "Dashboard", "Seller profile", "Chat & offer", "Listing preview"],
  },
  {
    title: "Admin",
    blurb: "Moderate accounts, review seller identity, investigate flagged chats, and contact users.",
    href: "/admin/login",
    screens: ["Admin login", "Console", "Chat review", "Email composer", "Ban review"],
  },
];

export default function Cover() {
  return (
    <div className="min-h-dvh bg-page">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <Brand href={null} size={56} wordmark={false} className="mb-6" />
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-action">
          Trusted second-hand marketplace
        </p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
          Pyan Thone
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-secondary">
          Give things a second life — with condition transparency and seller trust. A responsive,
          installable PWA built from the Figma design.
        </p>
        <p className="mt-2 text-[14px] text-ink-muted">
          Hackathon UI/UX · Desktop &amp; mobile marketplace flow · August 2026
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/buyer/marketplace" size="md">
            Enter marketplace
          </Button>
          <Button href="/seller/dashboard" variant="secondary" size="md">
            Seller dashboard
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FLOWS.map((f) => (
            <div key={f.title} className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-subtle">
              <h2 className="text-[20px] font-bold text-ink">{f.title}</h2>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-secondary">{f.blurb}</p>
              <ul className="mt-4 space-y-1 text-[13px] text-ink-muted">
                {f.screens.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
              <Button href={f.href} variant="secondary" size="sm" className="mt-5 self-start">
                Open {f.title.toLowerCase()} flow
              </Button>
            </div>
          ))}
        </div>

        <footer className="mt-16 border-t border-line pt-6 text-[13px] text-ink-muted">
          <Link href="/buyer/marketplace" className="hover:text-ink">
            Pyan Thone
          </Link>{" "}
          · Built with Next.js + Tailwind · Installable offline-capable PWA
        </footer>
      </div>
    </div>
  );
}
