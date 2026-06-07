"use client";

import { useApp } from "../AppContext";
import { Card, Check, Pill, ProgressRing, ScreenHeader, StatTile } from "../ui";

export function TodayScreen() {
  const { profile, sessionDone, setLocked, setTab } = useApp();

  return (
    <div className="space-y-4">
      <ScreenHeader
        eyebrow="Today"
        title={`Good morning, ${profile.elder}`}
        sub="Gentle and ready to move."
      />

      {/* Readiness hero card */}
      <Card tone="primary" className="flex items-center gap-4">
        <ProgressRing value={sessionDone ? 100 : 60}>
          <div>
            <p className="font-heading text-xl font-bold text-ink">
              {sessionDone ? "Done" : "Ready"}
            </p>
            <p className="text-[10px] text-ink/55">today</p>
          </div>
        </ProgressRing>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold text-ink">
            Movement readiness
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            {sessionDone
              ? "You've completed today's session. Your knees thank you."
              : "Your sleeve fits well and joints feel limber. A short session now keeps stiffness away."}
          </p>
        </div>
      </Card>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile label="Screen time today" value="45 min" hint="at your limit" />
        <StatTile label="Sleeve check" value="91%" hint="good fit" accent />
        <StatTile label="Movement quality" value="Smooth" hint="last session" />
        <StatTile label="This week" value={sessionDone ? "6 / 7" : "5 / 7"} hint="sessions" />
      </div>

      {/* Next best action */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">
            Next best action
          </p>
          {sessionDone ? (
            <Pill tone="good">
              <Check className="h-3 w-3" /> Complete
            </Pill>
          ) : (
            <Pill tone="secondary">2 min</Pill>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-accent-pink text-ink" aria-hidden>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="9" width="16" height="6" rx="3" />
              <path d="M4 12H2M22 12h-2" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="font-heading text-sm font-semibold text-ink">
              Seated knee extensions
            </p>
            <p className="text-xs text-ink/60">Personalised to your joint profile</p>
          </div>
        </div>
        <button
          onClick={() => setTab("move")}
          className="w-full cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          {sessionDone ? "Do another session" : "Start session"}
        </button>
      </Card>

      {/* Demo trigger — the core mechanic */}
      <Card tone="pink" className="space-y-2">
        <p className="font-heading text-sm font-semibold text-ink">
          See the screen-time lock in action
        </p>
        <p className="text-xs leading-relaxed text-ink/65">
          When phone use crosses {profile.screenLimit} min, Kneedit gently locks
          the phone until a movement break is done. Try it:
        </p>
        <button
          onClick={() => setLocked(true)}
          className="w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Simulate reaching the limit
        </button>
      </Card>
    </div>
  );
}
