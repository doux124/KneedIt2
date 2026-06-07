"use client";

import { useApp, type Tab } from "./AppContext";
import { LockPrompt } from "./LockPrompt";
import { TodayScreen } from "./screens/TodayScreen";
import { MoveScreen } from "./screens/MoveScreen";
import { SleeveScreen } from "./screens/SleeveScreen";
import { CaregiverScreen } from "./screens/CaregiverScreen";
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
    label: "Move",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="9" width="18" height="6" rx="3" />
        <path d="M3 12H1M23 12h-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "sleeve",
    label: "Sleeve",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M5 7c2 1 5 1 7 0s5-1 7 0M5 17c2-1 5-1 7 0s5 1 7 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "caregiver",
    label: "Family",
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
    label: "Settings",
    icon: (c) => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Screen({ tab }: { tab: Tab }) {
  switch (tab) {
    case "today":
      return <TodayScreen />;
    case "move":
      return <MoveScreen />;
    case "sleeve":
      return <SleeveScreen />;
    case "caregiver":
      return <CaregiverScreen />;
    case "settings":
      return <SettingsScreen />;
  }
}

export function AppShell() {
  const { tab, setTab } = useApp();

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Phone frame */}
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.8rem] border-[10px] border-ink bg-surface shadow-2xl shadow-ink/20">
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-ink" aria-hidden />

        {/* status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink/60">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden /> Kneedit
          </span>
        </div>

        {/* scrollable screen area */}
        <div className="absolute inset-x-0 bottom-[68px] top-9 overflow-y-auto px-4 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Screen tab={tab} />
        </div>

        {/* bottom tab bar */}
        <nav
          className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-ink/10 bg-white/95 px-2 py-2.5 backdrop-blur"
          aria-label="App navigation"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-1 transition-colors ${
                  active ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {t.icon("h-5 w-5")}
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* lock overlay */}
        <LockPrompt />
      </div>
    </div>
  );
}
