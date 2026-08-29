"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "./AuthShell";
import { Button, Field } from "./ui";
import { OtpInput } from "./interactive";
import { useI18n } from "@/lib/i18n";
import { setRole, type Role } from "@/lib/session";

function paths(role: Role) {
  return {
    login: `/${role}/login`,
    signup: `/${role}/signup`,
    otp: `/${role}/otp`,
    home: role === "seller" ? "/seller/dashboard" : role === "admin" ? "/admin/console" : "/buyer/marketplace",
    // after phone verification
    next: role === "seller" ? "/seller/setup" : "/buyer/marketplace",
  };
}

export function LoginPage({ role }: { role: Role }) {
  const router = useRouter();
  const { t } = useI18n();
  const L = t.auth.login;
  const p = paths(role);
  const isAdmin = role === "admin";

  return (
    <AuthShell>
      <h2 className="text-[26px] font-bold tracking-tight text-ink">
        {isAdmin ? L.adminTitle : L.title}
      </h2>
      <p className="mt-1 text-[14px] text-ink-secondary">{isAdmin ? L.adminSubtitle : L.subtitle}</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setRole(role);
          router.push(p.home);
        }}
      >
        <Field label={L.emailLabel} type="text" placeholder="you@example.com" autoComplete="username" required />
        <Field label={L.passwordLabel} type="password" placeholder="••••••••" autoComplete="current-password" required />
        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-ink-secondary">
            <input type="checkbox" className="h-4 w-4 rounded border-line" /> {L.remember}
          </label>
          <Link href="#" className="font-semibold text-action">
            {L.forgot}
          </Link>
        </div>
        <Button full type="submit">
          {isAdmin ? L.adminSubmit : L.submit}
        </Button>
        <Button full variant="secondary" href={isAdmin ? "/" : p.signup}>
          {isAdmin ? L.adminBack : L.alt}
        </Button>
        <p className="text-[12px] text-ink-muted">{isAdmin ? L.adminNote : L.terms}</p>
      </form>
    </AuthShell>
  );
}

export function SignupPage({ role }: { role: Role }) {
  const router = useRouter();
  const { t } = useI18n();
  const S = t.auth.signup;
  const p = paths(role);
  return (
    <AuthShell>
      <h2 className="text-[26px] font-bold tracking-tight text-ink">{S.title}</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">{S.subtitle}</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setRole(role);
          router.push(p.otp);
        }}
      >
        <Field label={S.nameLabel} placeholder={S.namePlaceholder} autoComplete="name" required />
        <Field label={S.phoneLabel} placeholder="+95 9 123 456 789" autoComplete="tel" required />
        <Field label={S.emailLabel} type="email" placeholder="you@example.com" autoComplete="email" required />
        <Field label={S.passwordLabel} type="password" placeholder={S.passwordPlaceholder} minLength={8} required />
        <label className="flex items-start gap-2 text-[12px] text-ink-secondary">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-line" required /> {S.agree}
        </label>
        <Button full type="submit">
          {S.submit}
        </Button>
        <Button full variant="secondary" href={p.login}>
          {S.alt}
        </Button>
      </form>
    </AuthShell>
  );
}

export function OtpPage({ role }: { role: Role }) {
  const router = useRouter();
  const { t } = useI18n();
  const O = t.auth.otp;
  const p = paths(role);
  return (
    <AuthShell>
      <h2 className="text-[26px] font-bold tracking-tight text-ink">
        {role === "seller" ? O.sellerTitle : O.title}
      </h2>
      <p className="mt-1 text-[14px] text-ink-secondary">{O.subtitle}</p>
      <div className="mt-6">
        <p className="pyt-label">{O.label}</p>
        <OtpInput labels={{ expires: O.expires, resend: O.resend, complete: O.complete, warn: O.warn }} />
      </div>
      <div className="mt-6 space-y-3">
        <Button full onClick={() => router.push(p.next)}>
          {O.submit}
        </Button>
        <Button full variant="secondary" href={p.signup}>
          {O.change}
        </Button>
      </div>
    </AuthShell>
  );
}

export function ChooseRolePage() {
  const router = useRouter();
  const { t } = useI18n();
  const R = t.auth.role;
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const options = [
    { id: "buyer" as const, title: R.buyer, desc: R.buyerDesc },
    { id: "seller" as const, title: R.seller, desc: R.sellerDesc },
  ];
  return (
    <AuthShell>
      <h2 className="text-[26px] font-bold tracking-tight text-ink">{R.title}</h2>
      <p className="mt-1 text-[14px] text-ink-secondary">{R.subtitle}</p>
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
        <Button
          full
          onClick={() => {
            setRole(role);
            router.push(role === "seller" ? "/seller/setup" : "/buyer/marketplace");
          }}
        >
          {role === "seller" ? R.setupSeller : R.continueBuyer}
        </Button>
        <Button full variant="secondary" href="/">
          {R.back}
        </Button>
        <p className="text-[12px] text-ink-muted">{R.note}</p>
      </div>
    </AuthShell>
  );
}
