"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { CareSwitch } from "../CareSwitch";
import { Card, Check, Pill, ScreenHeader } from "../ui";
import { EXERCISES, PAST_DAYS, completionRate, initialsOf } from "../progress";

/** Other patients on this physio's list. */
const OTHER_PATIENTS = [
  { name: "Ahmad", sessionsDone: 6, flag: "On track" },
  { name: "Lakshmi", sessionsDone: 2, flag: "3 missed days" },
];

/** Clinician-reviewed library, tagged so the physio can filter it. */
const LIBRARY = [
  ...EXERCISES.map((e) => ({ id: e.id, name: e.name, tags: [e.focus, "Seated"] })),
  { id: "heel-raise", name: "Standing heel raises", tags: ["Calf strength", "Standing"] },
  { id: "mini-squat", name: "Mini squats", tags: ["Quad strength", "Standing"] },
];

/** Last week in full, then this week up to today. */
const PRESCRIBED_SINCE_VISIT = 7 + PAST_DAYS.length + 1;
const DONE_LAST_WEEK = 6;
/** Two taps per exercise from sessions before today. */
const EARLIER_ANSWERS = (DONE_LAST_WEEK + PAST_DAYS.filter(Boolean).length) * EXERCISES.length;
const EARLIER_HURT = 2;
const EARLIER_EASY = 21;

export function PhysioScreen() {
  const { profile, sessionsDone, weekRate, lastSession, physioNote } = useApp();
  const [plan, setPlan] = useState<string[]>(EXERCISES.map((e) => e.id));
  const [booked, setBooked] = useState(false);

  const answers = lastSession?.exercises.map((e) => e.feedback) ?? [];
  const hurt = EARLIER_HURT + answers.filter((a) => a.hurt).length;
  const easy = EARLIER_EASY + answers.filter((a) => a.easy).length;
  const total = EARLIER_ANSWERS + answers.length;
  const painToday = answers.some((a) => a.hurt);

  const patients = [
    { name: profile.elder, rate: weekRate, flag: painToday ? "Pain reported" : "On track" },
    ...OTHER_PATIENTS.map((p) => ({ name: p.name, rate: completionRate(p.sessionsDone), flag: p.flag })),
  ];

  const toggle = (id: string) =>
    setPlan((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  return (
    <div className="space-y-4">
      <CareSwitch />
      <ScreenHeader
        title="Your patients"
        sub="What happens between visits. Physios also get this on a desktop dashboard."
      />

      {/* Patient list */}
      <Card className="space-y-2">
        <div className="flex items-center justify-between pb-1">
          <p className="font-heading text-sm font-semibold text-ink">This week</p>
          <span className="text-[11px] text-ink/45">Sessions done</span>
        </div>
        {patients.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
              i === 0 ? "bg-secondary/15 ring-1 ring-secondary/40" : ""
            }`}
          >
            <span
              className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary font-heading text-xs font-bold text-ink/70"
              aria-hidden
            >
              {initialsOf(p.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
              <p className="truncate text-[11px] text-ink/50">{p.flag}</p>
            </div>
            <p className="font-heading text-sm font-bold text-ink">
              {p.rate}
              <span className="ml-0.5 text-[10px] font-semibold text-ink/45">%</span>
            </p>
          </div>
        ))}
      </Card>

      {/* Visit summary */}
      <Card tone="primary" className="space-y-3">
        <div>
          <p className="font-heading text-sm font-semibold text-ink">Since the last visit</p>
          <p className="text-[11px] text-ink/55">Auto-generated for {profile.elder}</p>
        </div>
        <div className="space-y-1.5 text-sm">
          <SummaryRow label="Sessions done" value={`${DONE_LAST_WEEK + sessionsDone} of ${PRESCRIBED_SINCE_VISIT}`} />
          <SummaryRow label="Did it hurt? Yes" value={`${hurt} of ${total}`} />
          <SummaryRow label="Was it easy? Yes" value={`${easy} of ${total}`} />
        </div>
        <div className="rounded-xl bg-white/70 p-3">
          <p className="text-[11px] font-semibold text-ink/55">Caregiver notes</p>
          <p className="mt-0.5 text-sm text-ink/80">{physioNote.trim() || "No notes yet."}</p>
        </div>
        {booked ? (
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink/70">
            <span className="mt-0.5 text-secondary"><Check className="h-3.5 w-3.5" /></span>
            Next visit booked for Tuesday, 10:00 AM, in the calendar shared with{" "}
            {profile.elder} and {profile.caregiver}.
          </p>
        ) : (
          <button
            onClick={() => setBooked(true)}
            className="w-full cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            Book next visit
          </button>
        )}
      </Card>

      {/* Prescribe */}
      <Card className="space-y-3">
        <div>
          <p className="font-heading text-sm font-semibold text-ink">Prescribe for {profile.elder}</p>
          <p className="text-[11px] text-ink/55">From the clinician-reviewed exercise library</p>
        </div>
        {LIBRARY.map((ex) => {
          const on = plan.includes(ex.id);
          return (
            <div key={ex.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink/85">{ex.name}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {ex.tags.map((t) => (
                    <Pill key={t} tone="primary">{t}</Pill>
                  ))}
                </div>
              </div>
              <button
                onClick={() => toggle(ex.id)}
                aria-pressed={on}
                className={`flex-none cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  on
                    ? "bg-secondary/15 text-secondary"
                    : "bg-ink text-white hover:bg-ink/90"
                }`}
              >
                {on ? "In plan" : "Add"}
              </button>
            </div>
          );
        })}
        <p className="text-[11px] text-ink/50">Changes start from the next session.</p>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink/70">{label}</span>
      <span className="font-heading font-bold text-ink">{value}</span>
    </div>
  );
}
