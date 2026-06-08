"use client";

import { useApp } from "../AppContext";
import { Card, ScreenHeader } from "../ui";

const PROGRAM = [
  { name: "Seated knee extensions", on: true },
  { name: "Ankle circles", on: true },
  { name: "Quad sets", on: true },
  { name: "Standing heel raises", on: false },
];

export function SettingsScreen() {
  const { profile, setProfile } = useApp();

  return (
    <div className="space-y-4">
      <ScreenHeader
        eyebrow="Settings"
        title="Profile & care plan"
        sub="Caregivers set this up. No input needed from the elderly user."
      />

      {/* Profile */}
      <Card className="space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink/55">Elderly user</span>
          <input
            value={profile.elder}
            onChange={(e) => setProfile({ ...profile, elder: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink/55">Caregiver</span>
          <input
            value={profile.caregiver}
            onChange={(e) => setProfile({ ...profile, caregiver: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </label>
      </Card>

      {/* Screen-time limit */}
      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink/55">Screen-time limit before a movement break</span>
          <span className="font-heading text-sm font-bold text-secondary">{profile.screenLimit} min</span>
        </div>
        <input
          type="range"
          min={15}
          max={120}
          step={5}
          value={profile.screenLimit}
          onChange={(e) => setProfile({ ...profile, screenLimit: Number(e.target.value) })}
          className="w-full accent-[#8AB0CD]"
          aria-label="Screen-time limit in minutes"
        />
        <div className="flex justify-between text-[11px] text-ink/45">
          <span>15 min</span>
          <span>120 min</span>
        </div>
      </Card>

      {/* Program */}
      <Card className="space-y-3">
        <p className="font-heading text-sm font-semibold text-ink">Exercise program</p>
        {PROGRAM.map((ex) => (
          <div key={ex.name} className="flex items-center justify-between">
            <span className="text-sm text-ink/75">{ex.name}</span>
            <span
              className={`flex h-5 w-9 items-center rounded-full px-0.5 ${
                ex.on ? "justify-end bg-secondary" : "justify-start bg-ink/15"
              }`}
              aria-hidden
            >
              <span className="h-4 w-4 rounded-full bg-white" />
            </span>
          </div>
        ))}
        <p className="text-[11px] text-ink/45">Personalised to {profile.elder}&apos;s joint profile.</p>
      </Card>

      <p className="px-1 text-center text-[11px] leading-relaxed text-ink/45">
        Prototype only. Kneedit is a concept demo, not a medical device,
        diagnosis, or treatment tool.
      </p>
    </div>
  );
}
