"use client";

import { useApp } from "../AppContext";
import { Card, Check, Pill, ScreenHeader } from "../ui";

export function CaregiverScreen() {
  const { profile, sessionDone } = useApp();
  const week = [true, true, false, true, true, sessionDone, false];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="space-y-4">
      <ScreenHeader
        eyebrow="Caregiver view"
        title={`${profile.elder}'s knee health`}
        sub={`Shared with ${profile.caregiver} · updated just now`}
      />

      <Card tone="primary" className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink/60">Status</p>
          <p className="font-heading text-lg font-bold text-ink">On track</p>
        </div>
        <Pill tone="good">
          <Check className="h-3 w-3" /> No alerts
        </Pill>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-ink/55">This week</p>
          <p className="mt-1 font-heading text-2xl font-bold text-ink">
            {week.filter(Boolean).length} / 7
          </p>
          <p className="text-xs text-ink/55">sessions completed</p>
        </Card>
        <Card>
          <p className="text-xs text-ink/55">Range of motion</p>
          <p className="mt-1 font-heading text-2xl font-bold text-secondary">+4°</p>
          <p className="text-xs text-ink/55">vs. last month</p>
        </Card>
      </div>

      {/* Weekly adherence */}
      <Card className="space-y-3">
        <p className="font-heading text-sm font-semibold text-ink">This week&apos;s sessions</p>
        <div className="flex items-end justify-between">
          {week.map((done, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl ${
                  done ? "bg-secondary text-white" : "bg-primary/60 text-ink/40"
                }`}
                aria-label={done ? "completed" : "missed"}
              >
                {done ? <Check className="h-4 w-4" /> : "–"}
              </span>
              <span className="text-[11px] text-ink/50">{days[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Mobility trend */}
      <Card className="space-y-2">
        <p className="font-heading text-sm font-semibold text-ink">Mobility trend</p>
        <svg viewBox="0 0 260 70" className="h-16 w-full" aria-hidden>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8AB0CD" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points="0,55 40,48 80,50 120,38 160,40 200,26 260,22" fill="none" stroke="#8AB0CD" strokeWidth="3" strokeLinecap="round" />
          <polygon points="0,70 0,55 40,48 80,50 120,38 160,40 200,26 260,22 260,70" fill="url(#cg)" />
        </svg>
        <p className="text-[11px] text-ink/50">Steady improvement over 6 weeks</p>
      </Card>

      {/* Activity feed */}
      <Card className="space-y-3">
        <p className="font-heading text-sm font-semibold text-ink">Recent activity</p>
        {[
          { t: "Session verified by sleeve", time: "2h ago", good: true },
          { t: "Range of motion improved to 92°", time: "Yesterday", good: true },
          { t: "Missed evening session", time: "Mon", good: false },
        ].map((a) => (
          <div key={a.t} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full ${
                a.good ? "bg-secondary/15 text-secondary" : "bg-accent-mauve/30 text-ink/60"
              }`}
              aria-hidden
            >
              {a.good ? <Check className="h-3.5 w-3.5" /> : "!"}
            </span>
            <div>
              <p className="text-sm text-ink/80">{a.t}</p>
              <p className="text-[11px] text-ink/45">{a.time}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
