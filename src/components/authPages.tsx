"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "./AuthShell";
import { Button, Field } from "./ui";
import { OtpInput } from "./interactive";
import { useState } from "react";

const BULLETS = [
  "Condition evidence on every product",
  "Transparent seller trust scores",
  "Delivery status from order to arrival",
];

type Role = "buyer" | "seller" | "admin";

function paths(role: Role) {
  return {
    login: `/${role}/login`,
    signup: `/${role}/signup`,
    otp: `/${role}/otp`,
    home: role === "seller" ? "/seller/dashboard" : role === "admin" ? "/admin/console" : "/buyer/marketplace",
    next: role === "seller" ? "/seller/dashboard" : "/buyer/choose-role",
  };
}

export function LoginPage({ role }: { role: Role }) {
  const router = useRouter();
  const p = paths(role);
  return (
    <AuthShell
      headline={role === "admin" ? "Protect the marketplace. Act with accountability." : "Buy with confidence. Sell in minutes."}
      blurb={
        role === "admin"
          ? "Restricted access for authorized Pyan Thone moderation and support staff."
          : "Verified sellers, transparent condition reports, and protected marketplace conversations."
      }
      bullets={role === "admin" ? ["Role-based admin permissions", "Every sensitive action is logged", "Chat access requires a case reason"] : BULLETS}
    >
      <h2 className="text-[26px] font-bold tracking-tight text-ink">
        {role === "admin" ? "Admin access" : "Welcome back"}
      </h2>
      <p className="mt-1 text-[14px] text-ink-secondary">
        {role === "admin" ? "Sign in with your authorized admin credentials." : "Log in to continue buying and selling."}
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(p.home);
        }}
      >
        <Field label="Email or phone" type="text" placeholder="you@example.com" autoComplete="username" required />
        <Field label="Password" type="password" placeholder="••••••••" autoComplete="current-password" required />
        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-ink-secondary">
            <input type="checkbox" className="h-4 w-4 rounded border-line" /> Remember me
          </label>
          <Link href="#" className="font-semibold text-action">
            Forgot password?
          </Link>
        </div>
        <Button full type="submit">
          {role === "admin" ? "Sign in securely" : "Log in"}
        </Button>
        <Button full variant="secondary" href={role === "admin" ? "/" : p.signup}>
          {role === "admin" ? "Back to cover" : "Create account"}
        </Button>
        <p className="text-[12px] text-ink-muted">
          {role === "admin"
            ? "Two-step verification and activity logging are required."
            : "By continuing, you agree to the Terms and Privacy Policy."}
        </p>
      </form>
    </AuthShell>
  );
}

export function SignupPage({ role }: { role: Role }) {
  const router = useRouter();
  const p = paths(role);
  return (
    <AuthShell
      headline="Your next great find starts nearby."
      blurb="One account works for buying and selling. Phone verification helps keep the local marketplace safer."
      bullets={["Free to join · List in under 2 minutes"]}
    >
      <h2 className="text-[26px] font-bold tracking-tight text-ink">Create your account</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">Start buying or publish your first listing.</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(p.otp);
        }}
      >
        <Field label="Full name" placeholder="Your name" autoComplete="name" required />
        <Field label="Phone number" placeholder="+95 9 123 456 789" autoComplete="tel" required />
        <Field label="Email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <Field label="Password" type="password" placeholder="At least 8 characters" minLength={8} required />
        <label className="flex items-start gap-2 text-[12px] text-ink-secondary">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-line" required /> I agree to the Terms, Privacy
          Policy, and marketplace safety rules.
        </label>
        <Button full type="submit">
          Create account
        </Button>
        <Button full variant="secondary" href={p.login}>
          I already have an account
        </Button>
      </form>
    </AuthShell>
  );
}

export function OtpPage({ role }: { role: Role }) {
  const router = useRouter();
  const p = paths(role);
  return (
    <AuthShell
      headline="A small step for safer trading."
      blurb="Phone verification reduces fake accounts and gives buyers and sellers more confidence."
    >
      <h2 className="text-[26px] font-bold tracking-tight text-ink">
        {role === "seller" ? "Verify seller phone" : "Verify your phone"}
      </h2>
      <p className="mt-1 text-[14px] text-ink-secondary">We sent a 6-digit code to +95 9 ••• •• 6789.</p>
      <div className="mt-6">
        <p className="pyt-label">Enter verification code</p>
        <OtpInput />
      </div>
      <div className="mt-6 space-y-3">
        <Button full onClick={() => router.push(p.next)}>
          Verify and continue
        </Button>
        <Button full variant="secondary" href={p.signup}>
          Change phone number
        </Button>
      </div>
    </AuthShell>
  );
}

export function ChooseRolePage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const options = [
    { id: "buyer" as const, title: "Buyer", desc: "Browse trusted products, chat, make offers, track orders, and review sellers." },
    { id: "seller" as const, title: "Seller", desc: "Create a shop, verify identity, publish listings, and manage customer orders." },
  ];
  return (
    <AuthShell
      eyebrow="Pyan Thone"
      headline="Choose how you'll use the marketplace."
      blurb="Buyer and seller accounts have different tools and verification requirements."
    >
      <h2 className="text-[26px] font-bold tracking-tight text-ink">Choose your role</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">You can add the other role later from account settings.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setRole(o.id)}
            className={`rounded-card border p-5 text-left transition ${
              role === o.id ? "border-action bg-action-soft ring-4 ring-action/10" : "border-line hover:border-action/40"
            }`}
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                role === o.id ? "border-action" : "border-line"
              }`}
            >
              {role === o.id && <span className="h-2.5 w-2.5 rounded-full bg-action" />}
            </span>
            <p className="mt-3 text-[17px] font-bold text-ink">{o.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">{o.desc}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <Button full onClick={() => router.push(role === "seller" ? "/seller/setup" : "/buyer/marketplace")}>
          {role === "seller" ? "Set up seller account" : "Continue as buyer"}
        </Button>
        <Button full variant="secondary" href="/buyer/otp">
          Back
        </Button>
        <p className="text-[12px] text-ink-muted">
          Buyer accounts require phone verification. Seller accounts also require a verified identity document.
        </p>
      </div>
    </AuthShell>
  );
}
