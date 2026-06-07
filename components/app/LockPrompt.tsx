"use client";

import { useApp } from "./AppContext";

/** Full-screen overlay inside the phone — the gentle screen-time lock. */
export function LockPrompt() {
  const { locked, setLocked, setTab, setAutoStart, profile } = useApp();
  if (!locked) return null;

  const beginBreak = () => {
    setTab("move");
    setAutoStart(true);
    setLocked(false);
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-ink/95 px-7 text-center text-white backdrop-blur-sm">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
        </svg>
      </div>

      <div>
        <p className="font-heading text-xl font-bold">Time to move, {profile.elder}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          You&apos;ve used your phone for {profile.screenLimit} minutes. A short,
          guided knee break unlocks it again.
        </p>
      </div>

      <div className="w-full max-w-[200px] space-y-2.5">
        <button
          onClick={beginBreak}
          className="w-full cursor-pointer rounded-xl bg-white py-3 font-heading text-sm font-semibold text-ink transition-colors hover:bg-primary"
        >
          Begin movement break
        </button>
        <button
          onClick={() => setLocked(false)}
          className="w-full cursor-pointer rounded-xl py-2 text-xs font-medium text-white/55 transition-colors hover:text-white/80"
        >
          Not now (demo: dismiss)
        </button>
      </div>

      <p className="text-[11px] text-white/40">Phone stays locked until the sleeve verifies the session</p>
    </div>
  );
}
