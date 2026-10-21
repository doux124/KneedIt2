"use client";

import { useApp } from "../AppContext";
import { Card, Pill, ScreenHeader } from "../ui";
import { completionRate, SESSIONS_PER_WEEK, type LeaderboardRow } from "../progress";

export function LeaderboardScreen() {
  const {
    leaderboard,
    rank,
    weekRate,
    sessionsDone,
    sessionDone,
    streak,
    requests,
    acceptRequest,
    dismissRequest,
    setAddFriendOpen,
    setTab,
    setAutoStart,
  } = useApp();

  const ahead = rank > 1 ? leaderboard[rank - 2] : null;

  const startSession = () => {
    setAutoStart(true);
    setTab("move");
  };

  return (
    <div className="space-y-4">
      <ScreenHeader
        eyebrow="Friends"
        title="This week's leaderboard"
        sub="Ranked by this week's sessions done, then streak. Only sessions the sleeve confirms count."
      />

      {/* Your standing */}
      <Card tone="primary" className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 flex-none place-items-center rounded-2xl bg-white text-center">
            <div>
              <p className="font-heading text-2xl font-bold leading-none text-ink">
                {rank}
                <span className="align-super text-[10px]">{ordinalSuffix(rank)}</span>
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink/45">
                of {leaderboard.length}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-heading text-2xl font-bold text-ink">
              {weekRate}% <span className="text-sm font-semibold text-ink/55">of sessions</span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink/65">
              {ahead
                ? `${ahead.name} is one place ahead.`
                : "You're top of the group. Hold the lead."}
            </p>
          </div>
        </div>

        {/* This week's sessions */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-ink/55">
            <span>This week</span>
            <span>
              {sessionsDone} of {SESSIONS_PER_WEEK} sessions
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-700"
              style={{ width: `${weekRate}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Pill tone="secondary">{streak}-day streak</Pill>
          {sessionDone ? (
            <span className="flex-1 rounded-xl bg-white/70 py-2 text-center text-xs font-semibold text-ink/60">
              Today&apos;s session done
            </span>
          ) : (
            <button
              onClick={startSession}
              className="flex-1 cursor-pointer rounded-xl bg-ink py-2 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
            >
              Start today&apos;s session
            </button>
          )}
        </div>
      </Card>

      {/* Friend requests */}
      {requests.length > 0 && (
        <Card className="space-y-3">
          <p className="font-heading text-sm font-semibold text-ink">
            Friend {requests.length === 1 ? "request" : "requests"}
          </p>
          {requests.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <Avatar initials={r.initials} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                <p className="truncate text-[11px] text-ink/50">
                  {completionRate(r.sessionsDone)}% of sessions this week
                </p>
              </div>
              <button
                onClick={() => acceptRequest(r.id)}
                className="flex-none cursor-pointer whitespace-nowrap rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-secondary/85"
              >
                Accept
              </button>
              <button
                onClick={() => dismissRequest(r.id)}
                className="flex-none cursor-pointer whitespace-nowrap px-1 py-1.5 text-xs font-semibold text-ink/40 transition-colors hover:text-ink/70"
                aria-label={`Dismiss request from ${r.name}`}
              >
                Later
              </button>
            </div>
          ))}
        </Card>
      )}

      {/* The table */}
      <Card className="space-y-1.5">
        <div className="flex items-center justify-between pb-1">
          <p className="font-heading text-sm font-semibold text-ink">Your group</p>
          <span className="text-[11px] text-ink/45">Resets Monday</span>
        </div>
        {leaderboard.map((row) => (
          <Row key={row.id} row={row} />
        ))}
        <button
          onClick={() => setAddFriendOpen(true)}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 py-2.5 text-sm font-semibold text-ink/70 transition-colors hover:border-secondary hover:text-ink"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add a friend
        </button>
      </Card>

      {/* How the ranking works */}
      <Card tone="pink" className="space-y-2.5">
        <p className="font-heading text-sm font-semibold text-ink">How the ranking works</p>
        <div className="space-y-1.5">
          {[
            ["First", "Share of this week's prescribed sessions done"],
            ["Then", "Streak, to break a tie"],
          ].map(([order, rule]) => (
            <div
              key={order}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/70 px-3 py-1.5"
            >
              <span className="text-xs font-semibold text-ink/75">{rule}</span>
              <span className="font-heading text-xs font-bold text-secondary">{order}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] leading-relaxed text-ink/50">
          Sessions beyond the one prescribed each day don&apos;t count, so doing
          more never beats doing it properly. No sleeve, no session.
        </p>
      </Card>
    </div>
  );
}

function Row({ row }: { row: LeaderboardRow }) {
  const medal =
    row.rank === 1
      ? "bg-ink text-white"
      : row.rank === 2
        ? "bg-secondary text-white"
        : row.rank === 3
          ? "bg-accent-mauve text-white"
          : "bg-primary/60 text-ink/60";

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-2 py-2 transition-colors ${
        row.you ? "bg-secondary/15 ring-1 ring-secondary/40" : ""
      }`}
    >
      <span
        className={`grid h-7 w-7 flex-none place-items-center rounded-full font-heading text-xs font-bold ${medal}`}
        aria-hidden
      >
        {row.rank}
      </span>
      <Avatar initials={row.initials} highlight={row.you} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">
          {row.name}
          {row.you && <span className="ml-1 text-xs font-normal text-ink/50">(you)</span>}
        </p>
        <p className="text-[11px] text-ink/50">
          {row.streak}-day streak
          {row.justAdded && <span className="text-secondary">, new friend</span>}
        </p>
      </div>
      <p className="font-heading text-sm font-bold text-ink">
        {row.rate}
        <span className="ml-0.5 text-[10px] font-semibold text-ink/45">%</span>
      </p>
    </div>
  );
}

function Avatar({
  initials,
  highlight = false,
}: {
  initials: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`grid h-9 w-9 flex-none place-items-center rounded-full font-heading text-xs font-bold ${
        highlight ? "bg-secondary text-white" : "bg-primary text-ink/70"
      }`}
      aria-hidden
    >
      {initials}
    </span>
  );
}

function ordinalSuffix(n: number): string {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
