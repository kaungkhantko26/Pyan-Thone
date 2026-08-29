import Link from "next/link";

export function ModalPage({ back, children }: { back: string; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-ink/40 px-4 py-10 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[680px] rounded-card border border-line bg-surface p-7 shadow-card sm:p-9">
        {children}
      </div>
      <Link href={back} className="mx-auto mt-4 block max-w-[680px] text-center text-[13px] text-white/80 hover:text-white">
        ← Back
      </Link>
    </div>
  );
}
