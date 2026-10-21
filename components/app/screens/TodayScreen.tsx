"use client";

import { useApp } from "../AppContext";
import { Card, Check, Pill, ProgressRing, ScreenHeader, StatTile } from "../ui";
import { MAX_SESSION_POINTS } from "../points";

export function TodayScreen() {
  const { profile, sessionDone, setTab, weeklyPoints, streak, rank, leaderboard } =
    useApp();

  const me = leaderboard.find((r) => r.you);
  const ahead = leaderboard[Math.max(0, rank - 2)];
  const gap = me && ahead && ahead.id !== me.id ? ahead.weeklyPoints - me.weeklyPoints : 0;

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
        <StatTile label="Points this week" value={`${weeklyPoints}`} hint={`goal ${profile.weeklyGoal}`} accent />
        <StatTile label="Leaderboard" value={`#${rank}`} hint={`of ${leaderboard.length} friends`} />
        <StatTile label="Streak" value={`${streak} days`} hint="keep it alive" />
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
            <Pill tone="secondary">2 min · up to {MAX_SESSION_POINTS} pts</Pill>
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

      {/* The core mechanic — friendly competition */}
      <Card tone="pink" className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">
            Your friends this week
          </p>
          <Pill tone="secondary">#{rank}</Pill>
        </div>
        <div className="space-y-1.5">
          {leaderboard.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                r.you ? "bg-white" : ""
              }`}
            >
              <span className="w-4 font-heading text-xs font-bold text-ink/45">
                {r.rank}
              </span>
              <span className="flex-1 truncate text-xs font-semibold text-ink/80">
                {r.name}
                {r.you && <span className="ml-1 font-normal text-ink/45">(you)</span>}
              </span>
              <span className="font-heading text-xs font-bold text-ink">
                {r.weeklyPoints}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-ink/65">
          {gap > 0
            ? `${gap} points behind ${ahead?.name}. Exercises done with good form score the most.`
            : "You're leading your group. A session today keeps you there."}
        </p>
        <button
          onClick={() => setTab("friends")}
          className="w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Open leaderboard
        </button>
      </Card>
    </div>
  );
}
