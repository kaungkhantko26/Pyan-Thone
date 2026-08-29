import Link from "next/link";
import { Brand } from "./Brand";

export function AuthShell({
  steps,
  activeStep,
  children,
}: {
  /** Panel-only marketing props are accepted for compatibility but no longer rendered. */
  eyebrow?: string;
  headline?: string;
  blurb?: string;
  bullets?: string[];
  steps?: string[];
  activeStep?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-page px-4 py-10 sm:px-6">
      <div className="w-full max-w-[460px]">
        <div className="mb-6 flex justify-center">
          <Brand size={40} />
        </div>

        {steps && (
          <ol className="mb-4 flex items-center justify-center gap-2 text-[12px] font-semibold text-ink-muted">
            {steps.map((s, i) => (
              <li
                key={s}
                className={
                  i === (activeStep ?? 0)
                    ? "rounded-pill bg-action-soft px-2.5 py-1 text-action"
                    : "px-1"
                }
              >
                {i + 1}. {s}
              </li>
            ))}
          </ol>
        )}

        <div className="rounded-card border border-line bg-surface p-7 shadow-card sm:p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-[12px] text-ink-muted">
          <Link href="/" className="hover:text-ink">
            ← Back to Pyan Thone
          </Link>
        </p>
      </div>
    </div>
  );
}
