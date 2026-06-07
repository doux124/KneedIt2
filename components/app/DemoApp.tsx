"use client";

import Link from "next/link";
import { AppProvider, useApp } from "./AppContext";
import { AppShell } from "./AppShell";
import { KneeditLogo } from "../brand/KneeditLogo";

const FEATURES = [
  {
    title: "Screen-time lock",
    body: "Gently pauses the phone after extended use and offers a movement break.",
  },
  {
    title: "Guided exercises",
    body: "Large, simple steps for knee extensions, ankle circles and quad sets.",
  },
  {
    title: "Sleeve verification",
    body: "ROM, EMG and PPG confirm the session was genuinely completed.",
  },
  {
    title: "Caregiver dashboard",
    body: "Family sees trends and progress, and gets missed-session alerts.",
  },
];

export function DemoApp() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-surface">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/80 backdrop-blur">
          <div className="container-content flex items-center justify-between py-4">
            <Link href="/" aria-label="Kneedit — home" className="flex items-center">
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
              Turn screen time into knee-saving movement. Tap through the app on
              the right — start a guided session, watch the sleeve verify it, and
              see what a caregiver sees.
            </p>

            <QuickActions />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
                  <p className="font-heading text-sm font-semibold text-ink">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink/60">{f.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-ink/45">
              Prototype only. Not a medical device or diagnosis tool.
            </p>
          </div>

          {/* Right: the phone app */}
          <div className="order-1 md:order-2">
            <AppShell />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

/** Shortcut buttons that jump to key moments — uses app state. */
function QuickActions() {
  const { setTab, setLocked } = useApp();
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      <button
        onClick={() => setLocked(true)}
        className="cursor-pointer rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
      >
        See the screen-time lock
      </button>
      <button
        onClick={() => setTab("move")}
        className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        Start an exercise
      </button>
      <button
        onClick={() => setTab("caregiver")}
        className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
      >
        Caregiver view
      </button>
    </div>
  );
}
