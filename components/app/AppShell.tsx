"use client";

import { useEffect, useRef } from "react";
import { useApp, type Tab } from "./AppContext";
import { AddFriendSheet } from "./AddFriendSheet";
import { TodayScreen } from "./screens/TodayScreen";
import { MoveScreen } from "./screens/MoveScreen";
import { SleeveScreen } from "./screens/SleeveScreen";
import { LeaderboardScreen } from "./screens/LeaderboardScreen";
import { CaregiverScreen } from "./screens/CaregiverScreen";
import { PhysioScreen } from "./screens/PhysioScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

const TABS: { id: Tab; label: string; icon: (a: string) => JSX.Element }[] = [
  {
    id: "today",
    label: "Today",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "move",
    label: "Start",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5v7l5.5-3.5L10 8.5Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "sleeve",
    label: "Sleeve",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Knee sleeve: soft tube with an open top and the LED strip down the front */}
        <ellipse cx="12" cy="4.5" rx="5" ry="1.6" />
        <path
          d="M7 4.5c.8 2.6 1.2 5 1.2 7.5S7.8 17 7 19.5M17 4.5c-.8 2.6-1.2 5-1.2 7.5s.4 5 1.2 7.5M7 19.5c1.5.8 3.2 1.2 5 1.2s3.5-.4 5-1.2M12 9v6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "friends",
    label: "Friends",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" strokeLinejoin="round" />
        <path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M12 13v4M9 20h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "caregiver",
    label: "Care",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 1.5-3.5 4-3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Profile",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Screen({ tab }: { tab: Tab }) {
  const { careView } = useApp();
  switch (tab) {
    case "today":
      return <TodayScreen />;
    case "move":
      return <MoveScreen />;
    case "sleeve":
      return <SleeveScreen />;
    case "friends":
      return <LeaderboardScreen />;
    case "caregiver":
      return careView === "physio" ? <PhysioScreen /> : <CaregiverScreen />;
    case "settings":
      return <SettingsScreen />;
  }
}

export function AppShell() {
  const { tab, setTab } = useApp();
  const screenRef = useRef<HTMLDivElement>(null);

  // Land at the top of each screen rather than wherever the last one was
  // scrolled to. Matters most on mobile, where the frame is short.
  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    /**
     * The frame keeps its 9:19 shape, but on short viewports its width is
     * derived from the height available so the whole phone, tab bar included,
     * stays on screen. Browsers without `svh` fall back to the 380px class.
     */
    <div
      className="relative mx-auto w-full max-w-[380px]"
      style={{ maxWidth: "min(380px, calc((100svh - 7rem) * 9 / 19))" }}
    >
      {/* Phone frame */}
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.8rem] border-[10px] border-ink bg-surface shadow-2xl shadow-ink/20">
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-ink" aria-hidden />

        {/* status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink/60">
          <span>9:41</span>
        </div>

        {/* scrollable screen area */}
        <div
          ref={screenRef}
          className="absolute inset-x-0 bottom-[68px] top-9 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Screen tab={tab} />
        </div>

        {/* bottom tab bar */}
        <nav
          className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-ink/10 bg-white/95 px-1 py-2.5 backdrop-blur"
          aria-label="App navigation"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1 rounded-xl px-0.5 py-1 transition-colors ${
                  active ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {t.icon("h-5 w-5 flex-none")}
                <span className="w-full truncate text-center text-[9px] font-semibold leading-none">
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* add-friend sheet */}
        <AddFriendSheet />
      </div>
    </div>
  );
}
