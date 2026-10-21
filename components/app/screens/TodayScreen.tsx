"use client";

import { useApp } from "../AppContext";
import { Card, Check, Pill, ProgressRing, ScreenHeader, StatTile } from "../ui";
import { EXERCISES, formatScore, sessionScore } from "../progress";

export function TodayScreen() {
  const { profile, sessionDone, setTab, weekRate, streak, rank, leaderboard, lastSession } =
    useApp();

  const lastScore = lastSession ? sessionScore(lastSession.exercises) : null;

  return (
    <div className="space-y-4">
      <ScreenHeader
        title={`Good morning, ${profile.elder}`}
        sub={`Your reminder is set for ${profile.reminder}.`}
      />

      {/* Today's plan */}
      <Card tone="primary" className="flex items-center gap-4">
        <ProgressRing value={sessionDone ? 100 : 0}>
          <div>
            <p className="font-heading text-xl font-bold text-ink">
              {sessionDone ? "Done" : EXERCISES.length}
            </p>
            <p className="text-[10px] text-ink/55">{sessionDone ? "today" : "exercises"}</p>
          </div>
        </ProgressRing>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold text-ink">
            Today&apos;s plan
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            {sessionDone
              ? "You've done today's plan. Your knees thank you."
              : "Three exercises from your physio, each with a short video."}
          </p>
        </div>
      </Card>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile label="Sessions this week" value={`${weekRate}%`} accent />
        <StatTile label="Streak" value={`${streak} days`} />
        <StatTile label="Leaderboard" value={`#${rank}`} />
        <StatTile
          label="Last form score"
          value={lastScore !== null ? formatScore(lastScore) : "None yet"}
        />
      </div>

      {/* Next best action */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">
            Up next
          </p>
          {sessionDone ? (
            <Pill tone="good">
              <Check className="h-3 w-3" /> Complete
            </Pill>
          ) : (
            <Pill tone="secondary">{EXERCISES.length} exercises</Pill>
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
              {EXERCISES[0].name}
            </p>
            <p className="text-xs text-ink/60">Prescribed by your physio</p>
          </div>
        </div>
        <button
          onClick={() => setTab("move")}
          className="w-full cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          {sessionDone ? "Do another session" : "Start session"}
        </button>
      </Card>

      {/* Friendly competition */}
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
                {r.rate}%
              </span>
            </div>
          ))}
        </div>
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
