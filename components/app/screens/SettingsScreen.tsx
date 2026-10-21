"use client";

import { useApp, type Profile } from "../AppContext";
import { Card, ScreenHeader, Toggle } from "../ui";
import { EXERCISES } from "../progress";

/** The prescribed set, plus one the physio has not switched on. */
const PROGRAMME = [
  ...EXERCISES.map((e) => ({ name: e.name, on: true })),
  { name: "Standing heel raises", on: false },
];

const SUGGESTED_REMINDER = "9:00 AM";
const REMINDER_TIMES = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "4:00 PM", "6:00 PM", "8:00 PM"];

export function SettingsScreen() {
  const { profile, setProfile, setAddFriendOpen } = useApp();
  const set = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Profile & care plan"
        sub="A caregiver or you pair the sleeve once. There's nothing else to set up."
      />

      {/* Profile */}
      <Card className="space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink/55">Elderly user</span>
          <input
            value={profile.elder}
            onChange={(e) => set({ elder: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink/55">Caregiver</span>
          <input
            value={profile.caregiver}
            onChange={(e) => set({ caregiver: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </label>
      </Card>

      {/* Daily reminder */}
      <Card className="space-y-2">
        <label className="block">
          <span className="text-xs font-semibold text-ink/55">Daily reminder</span>
          <select
            value={profile.reminder}
            onChange={(e) => set({ reminder: e.target.value })}
            className="mt-1 w-full cursor-pointer rounded-xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          >
            {REMINDER_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
                {t === SUGGESTED_REMINDER ? " (suggested)" : ""}
              </option>
            ))}
          </select>
        </label>
        <p className="text-[11px] leading-relaxed text-ink/50">
          Kneedit suggests a time. Set it around your routine. {profile.caregiver} can
          also send a nudge.
        </p>
      </Card>

      {/* Sharing: the senior decides */}
      <Card className="space-y-3">
        <div>
          <p className="font-heading text-sm font-semibold text-ink">You decide what is shared</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">
            Your streak and monthly activity are always visible to {profile.caregiver}.
          </p>
        </div>
        <SettingRow
          title={`Weekly report to ${profile.caregiver}`}
          on={profile.shareWeeklyReport}
          onChange={(v) => set({ shareWeeklyReport: v })}
        />
        <SettingRow
          title={`Fall notifications to ${profile.caregiver}`}
          on={profile.shareFallAlerts}
          onChange={(v) => set({ shareFallAlerts: v })}
        />
        <SettingRow
          title="Show me on friends' leaderboards"
          hint="Friends see your streak and this week's sessions. Never health readings."
          on={profile.shareToLeaderboard}
          onChange={(v) => set({ shareToLeaderboard: v })}
        />
        <button
          onClick={() => setAddFriendOpen(true)}
          className="w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Manage friends
        </button>
      </Card>

      {/* Programme */}
      <Card className="space-y-3">
        <p className="font-heading text-sm font-semibold text-ink">Exercise programme</p>
        {PROGRAMME.map((ex) => (
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
        <p className="text-[11px] text-ink/45">
          Prescribed by {profile.elder}&apos;s physio. Without a linked physio,
          Kneedit uses a default clinician-reviewed routine.
        </p>
      </Card>

      <p className="px-1 text-center text-[11px] leading-relaxed text-ink/45">
        Prototype only. Kneedit is not a medical device. It does not diagnose or
        replace professional care.
      </p>
    </div>
  );
}

function SettingRow({
  title,
  hint,
  on,
  onChange,
}: {
  title: string;
  hint?: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-ink/85">{title}</p>
        {hint && <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">{hint}</p>}
      </div>
      <Toggle on={on} onChange={onChange} label={title} />
    </div>
  );
}
