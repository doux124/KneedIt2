"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { AppProvider, useApp } from "./AppContext";
import { AppShell } from "./AppShell";
import { KneeditLogo } from "../brand/KneeditLogo";

const FEATURES = [
  {
    title: "Guided sessions",
    body: "Your physio's exercises, each with a short video. Take a break or stop at any time.",
  },
  {
    title: "Sleeve verification",
    body: "The sleeve confirms each rep and scores your form out of 10.",
  },
  {
    title: "Streaks and friends",
    body: "A leaderboard ranked by this week's sessions done, then streak.",
  },
  {
    title: "Family and physio",
    body: "A weekly report for family, and a visit summary for the physio.",
  },
];

export function DemoApp() {
  const phoneRef = useRef<HTMLDivElement>(null);

  /**
   * On mobile the phone sits above the shortcut buttons, so a tap would
   * otherwise change a screen the user cannot see. Bring it back into view.
   */
  const revealPhone = useCallback(() => {
    const node = phoneRef.current;
    if (!node) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen bg-surface">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/80 backdrop-blur">
          <div className="container-content flex items-center justify-between py-4">
            <Link href="/" aria-label="Kneedit home" className="flex items-center">
              <KneeditLogo width={132} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-primary/40"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z" />
              </svg>
              Back to site
            </Link>
          </div>
        </header>

        {/* Body */}
        <main className="container-content grid items-start gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-16">
          {/* Left: context */}
          <div className="order-2 md:order-1 md:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-secondary ring-1 ring-secondary/30">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
              Interactive prototype
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold text-ink sm:text-4xl">
              The Kneedit companion app
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
              Tap through the app. Run today&apos;s prescribed session, answer
              two quick questions after each exercise, and see what family and
              the physio see.
            </p>

            <QuickActions onJump={revealPhone} />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
                  <p className="font-heading text-sm font-semibold text-ink">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink/60">{f.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-ink/45">
              Prototype only. Kneedit is not a medical device. It does not
              diagnose or replace professional care.
            </p>
          </div>

          {/* Right: the phone app */}
          <div ref={phoneRef} className="order-1 scroll-mt-24 md:order-2">
            <AppShell />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

/** Shortcut buttons that jump to key moments, using app state. */
function QuickActions({ onJump }: { onJump: () => void }) {
  const { setTab, setAutoStart, setAddFriendOpen, setCareView } = useApp();

  const go = (action: () => void) => () => {
    action();
    onJump();
  };

  return (
    <div className="mt-7 flex flex-wrap gap-2">
      <button
        onClick={go(() => {
          setAutoStart(true);
          setTab("move");
        })}
        className="min-h-[44px] cursor-pointer rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
      >
        Start today&apos;s session
      </button>
      <button
        onClick={go(() => setTab("friends"))}
        className="min-h-[44px] cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        See the leaderboard
      </button>
      <button
        onClick={go(() => {
          setTab("friends");
          setAddFriendOpen(true);
        })}
        className="min-h-[44px] cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        Add a friend
      </button>
      <button
        onClick={go(() => {
          setCareView("family");
          setTab("caregiver");
        })}
        className="min-h-[44px] cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        Family report
      </button>
      <button
        onClick={go(() => {
          setCareView("physio");
          setTab("caregiver");
        })}
        className="min-h-[44px] cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        Physio view
      </button>
    </div>
  );
}
