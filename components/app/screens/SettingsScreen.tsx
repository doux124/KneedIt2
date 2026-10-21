"use client";

import { useApp } from "../AppContext";
import { Card, ScreenHeader } from "../ui";
import { MAX_SESSION_POINTS } from "../points";

const PROGRAM = [
  { name: "Seated knee extensions", on: true },
  { name: "Ankle circles", on: true },
  { name: "Quad sets", on: true },
  { name: "Standing heel raises", on: false },
];

export function SettingsScreen() {
  const { profile, setProfile, setAddFriendOpen } = useApp();

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

      {/* Weekly points goal */}
      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink/55">Weekly points goal</span>
          <span className="font-heading text-sm font-bold text-secondary">{profile.weeklyGoal} pts</span>
        </div>
        <input
          type="range"
          min={100}
          max={900}
          step={25}
          value={profile.weeklyGoal}
          onChange={(e) => setProfile({ ...profile, weeklyGoal: Number(e.target.value) })}
          className="w-full accent-[#8AB0CD]"
          aria-label="Weekly points goal"
        />
        <div className="flex justify-between text-[11px] text-ink/45">
          <span>100 pts</span>
          <span>900 pts</span>
        </div>
        <p className="text-[11px] leading-relaxed text-ink/50">
          Roughly {Math.max(1, Math.round(profile.weeklyGoal / MAX_SESSION_POINTS))}{" "}
          well-performed {sessionWord(profile.weeklyGoal)} a week.
        </p>
      </Card>

      {/* Leaderboard sharing */}
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-sm font-semibold text-ink">
              Show me on friends&apos; leaderboards
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">
              Friends see your weekly points and streak. They never see health
              readings, only {profile.caregiver} does.
            </p>
          </div>
          <button
            onClick={() =>
              setProfile({ ...profile, shareToLeaderboard: !profile.shareToLeaderboard })
            }
            role="switch"
            aria-checked={profile.shareToLeaderboard}
            aria-label="Show me on friends' leaderboards"
            className={`mt-0.5 flex h-5 w-9 flex-none cursor-pointer items-center rounded-full px-0.5 transition-colors ${
              profile.shareToLeaderboard ? "justify-end bg-secondary" : "justify-start bg-ink/15"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white" />
          </button>
        </div>
        <button
          onClick={() => setAddFriendOpen(true)}
          className="w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Manage friends
        </button>
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

function sessionWord(goal: number) {
  return Math.round(goal / MAX_SESSION_POINTS) === 1 ? "session" : "sessions";
}
