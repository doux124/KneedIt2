"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import { CareSwitch } from "../CareSwitch";
import { Card, Check, Pill, ScreenHeader } from "../ui";
import { PAST_DAYS, SESSIONS_PER_WEEK } from "../progress";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
/** Sessions done earlier this month, before this week. */
const EARLIER_THIS_MONTH = 13;
/** Daily average from all-day wear. */
const AVERAGE_STEPS = "4,460";

export function CaregiverScreen() {
  const { profile, sessionDone, sessionsDone, weekRate, streak, lastSession, physioNote, setPhysioNote } =
    useApp();
  const [nudged, setNudged] = useState(false);

  // Monday to Saturday (today). Sunday is still ahead.
  const week = [...PAST_DAYS, sessionDone];
  const flagged = [
    "Missed Tuesday's session",
    ...(lastSession?.exercises
      .filter((e) => e.feedback.hurt)
      .map((e) => `Pain during ${e.name.toLowerCase()}, today`) ?? []),
    ...(lastSession && !lastSession.complete ? ["Session stopped early, today"] : []),
  ];

  return (
    <div className="space-y-4">
      <CareSwitch />
      <ScreenHeader
        eyebrow="Family view"
        title={`${profile.elder}'s week`}
        sub={`${profile.elder} chooses what ${profile.caregiver} sees.`}
      />

      {/* Free for family */}
      <Card tone="primary" className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">Activity</p>
          <Pill tone="secondary">Free</Pill>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="font-heading text-2xl font-bold text-ink">{streak} days</p>
            <p className="text-[11px] text-ink/55">streak</p>
          </div>
          <div className="h-8 w-px bg-ink/10" aria-hidden />
          <div>
            <p className="font-heading text-2xl font-bold text-secondary">
              {EARLIER_THIS_MONTH + sessionsDone}
            </p>
            <p className="text-[11px] text-ink/55">sessions this month</p>
          </div>
        </div>
      </Card>

      {/* Weekly report */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">Weekly report</p>
          <Pill tone="primary">Plus</Pill>
        </div>
        {profile.shareWeeklyReport ? (
          <>
            <div className="flex items-end justify-between">
              {DAYS.map((d, i) => {
                const done = week[i];
                const upcoming = i >= week.length;
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-xl ${
                        done ? "bg-secondary text-white" : upcoming ? "bg-primary/30 text-ink/25" : "bg-primary/60 text-ink/40"
                      }`}
                      aria-label={done ? "completed" : upcoming ? "upcoming" : "not done"}
                    >
                      {done ? <Check className="h-4 w-4" /> : "–"}
                    </span>
                    <span className="text-[11px] text-ink/50">{d}</span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface p-3">
                <p className="text-[11px] text-ink/55">Sessions</p>
                <p className="font-heading text-lg font-bold text-ink">
                  {sessionsDone} of {SESSIONS_PER_WEEK}
                </p>
                <p className="text-[11px] text-ink/55">{weekRate}% done</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="text-[11px] text-ink/55">Steps</p>
                <p className="font-heading text-lg font-bold text-ink">{AVERAGE_STEPS}</p>
                <p className="text-[11px] text-ink/55">a day</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-ink/55">Flagged</p>
              {flagged.map((f) => (
                <p key={f} className="flex items-center gap-2 text-sm text-ink/80">
                  <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-mauve/30 text-[11px] font-bold text-ink/60" aria-hidden>
                    !
                  </span>
                  {f}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-ink/60">
            {profile.elder} has turned off the weekly report.
          </p>
        )}
      </Card>

      {/* Notes the physio reads */}
      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">Notes for the physio</p>
          <Pill tone="primary">Plus</Pill>
        </div>
        <textarea
          value={physioNote}
          onChange={(e) => setPhysioNote(e.target.value)}
          rows={2}
          aria-label="Notes for the physio"
          className="w-full resize-none rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
        />
        <p className="text-[11px] text-ink/50">
          {profile.elder}&apos;s physio sees these in the visit summary.
        </p>
      </Card>

      {/* Alerts */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-semibold text-ink">Alerts</p>
          <Pill tone="primary">Plus</Pill>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-ink/75">After 3 missed days</span>
          <span className="text-xs font-semibold text-secondary">Alerts you</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-ink/75">Possible fall detected</span>
          <span className="text-right text-xs font-semibold text-secondary">
            {profile.shareFallAlerts ? "Notifies you immediately" : `Off, set by ${profile.elder}`}
          </span>
        </div>
      </Card>

      <button
        onClick={() => setNudged(true)}
        disabled={nudged}
        className="w-full cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90 disabled:cursor-default disabled:bg-secondary"
      >
        {nudged ? `Nudge sent to ${profile.elder}` : "Send a gentle nudge"}
      </button>
    </div>
  );
}
