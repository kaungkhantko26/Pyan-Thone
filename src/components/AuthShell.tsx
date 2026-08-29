import Link from "next/link";

export function AuthShell({
  eyebrow,
  headline,
  blurb,
  bullets,
  steps,
  children,
}: {
  eyebrow?: string;
  headline: string;
  blurb: string;
  bullets?: string[];
  steps?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,570px)_1fr]">
      <aside className="relative hidden flex-col justify-between bg-action px-10 py-16 text-white lg:flex xl:px-16">
        <Link href="/" className="text-lg font-extrabold">
          Pyan Thone
        </Link>
        <div className="max-w-md">
          {eyebrow && (
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[40px] font-extrabold leading-[1.08] tracking-tight">{headline}</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85">{blurb}</p>
          {bullets && (
            <ul className="mt-6 space-y-2 text-[14px] text-white/90">
              {bullets.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>
          )}
          {steps && (
            <p className="mt-6 text-[13px] font-medium text-white/80">
              {steps.map((s, i) => (
                <span key={s}>
                  <span className="font-bold">{i + 1}</span> {s}
                  {i < steps.length - 1 ? "   " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
        <p className="text-[12px] text-white/60">Hackathon UI/UX · August 2026</p>
      </aside>

      <main className="flex items-center justify-center bg-page px-4 py-10 sm:px-8">
        <div className="w-full max-w-[560px] rounded-card border border-line bg-surface p-7 shadow-card sm:p-9">
          {children}
        </div>
      </main>
    </div>
  );
}
