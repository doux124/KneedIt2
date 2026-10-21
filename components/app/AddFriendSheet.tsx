"use client";

import { useMemo, useState } from "react";
import { useApp } from "./AppContext";
import { Check } from "./ui";
import { SUGGESTED_FRIENDS } from "./progress";

/** Bottom sheet inside the phone for adding exercise friends. */
export function AddFriendSheet() {
  const { addFriendOpen, setAddFriendOpen, friends, addFriend, profile } = useApp();
  const [query, setQuery] = useState("");

  const code = useMemo(() => friendCode(profile.elder), [profile.elder]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUGGESTED_FRIENDS.filter(
      (s) => !q || s.name.toLowerCase().includes(q) || s.context.toLowerCase().includes(q),
    );
  }, [query]);

  if (!addFriendOpen) return null;

  const close = () => {
    setQuery("");
    setAddFriendOpen(false);
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      {/* Scrim */}
      <button
        onClick={close}
        className="absolute inset-0 cursor-pointer bg-ink/45 backdrop-blur-[2px]"
        aria-label="Close add friend"
      />

      <div className="relative max-h-[86%] overflow-y-auto rounded-t-[1.75rem] bg-surface px-5 pb-5 pt-3 shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" aria-hidden />

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-ink">Add a friend</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-ink/60">
              Friends keep each other going. They see your streak and this
              week&apos;s sessions, never health readings.
            </p>
          </div>
          <button
            onClick={close}
            className="-mt-1 cursor-pointer rounded-full p-1.5 text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Your code */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
          <div>
            <p className="text-[11px] text-white/55">Your Kneedit code</p>
            <p className="font-heading text-lg font-bold tracking-wide">{code}</p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80">
            Share
          </span>
        </div>

        {/* Search */}
        <label className="mt-4 block">
          <span className="sr-only">Search by name or code</span>
          <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2.5 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/25">
            <svg className="h-4 w-4 flex-none text-ink/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or code"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
            />
          </div>
        </label>

        {/* Suggestions */}
        <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-wider text-ink/45">
          {query ? "Results" : "People you may know"}
        </p>

        <div className="mt-2 space-y-2">
          {results.map((s) => {
            const added = friends.some((f) => f.id === s.id);
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink/5"
              >
                <span
                  className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primary font-heading text-xs font-bold text-ink/70"
                  aria-hidden
                >
                  {s.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
                  <p className="truncate text-[11px] text-ink/50">{s.context}</p>
                </div>
                {added ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-semibold text-secondary">
                    <Check className="h-3 w-3" /> Added
                  </span>
                ) : (
                  <button
                    onClick={() => addFriend(s)}
                    className="cursor-pointer rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}

          {results.length === 0 && (
            <p className="rounded-2xl bg-white p-4 text-center text-xs text-ink/50 ring-1 ring-ink/5">
              No one found. Ask them for their Kneedit code.
            </p>
          )}
        </div>

        <button
          onClick={close}
          className="mt-5 w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/** Stable, readable code derived from the display name. */
function friendCode(name: string): string {
  const base =
    name
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(-3) || "KNE";
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 9000;
  return `${base}-${1000 + hash}`;
}
