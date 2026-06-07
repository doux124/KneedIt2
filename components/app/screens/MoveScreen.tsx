"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../AppContext";
import { YouTubeEmbed } from "../YouTubeEmbed";
import { Card, Check, Pill, ProgressRing, ScreenHeader } from "../ui";

type Phase = "list" | "active" | "verifying" | "done";

// Real physical-therapy demo clips (verified embeddable) for each movement.
const EXERCISES = [
  { id: "knee-ext", name: "Seated knee extensions", reps: 8, focus: "Quad strength", video: "v_R4c04GuKE" },
  { id: "ankle", name: "Ankle circles", reps: 10, focus: "Circulation", video: "sYAGbGEQMGE" },
  { id: "quad-set", name: "Quad sets", reps: 6, focus: "Joint stability", video: "5TUK4uT2nnw" },
];

export function MoveScreen() {
  const { autoStart, setAutoStart, setSessionDone, setLocked } = useApp();
  const [phase, setPhase] = useState<Phase>("list");
  const [exIndex, setExIndex] = useState(0);
  const [rep, setRep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = EXERCISES[exIndex];

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const startSession = useCallback(() => {
    setExIndex(0);
    setRep(0);
    setPhase("active");
  }, []);

  // Auto-start when launched from the lock prompt
  useEffect(() => {
    if (autoStart) {
      startSession();
      setAutoStart(false);
    }
  }, [autoStart, setAutoStart, startSession]);

  // Drive the rep counter while a set is active
  useEffect(() => {
    if (phase !== "active") return;
    clearTimer();
    timer.current = setInterval(() => {
      setRep((r) => {
        if (r + 1 >= current.reps) {
          clearTimer();
          // move to next exercise or finish
          setExIndex((idx) => {
            if (idx + 1 < EXERCISES.length) {
              setTimeout(() => setRep(0), 50);
              return idx + 1;
            }
            setPhase("verifying");
            return idx;
          });
          return current.reps;
        }
        return r + 1;
      });
    }, 650);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exIndex]);

  // Verifying → done
  useEffect(() => {
    if (phase !== "verifying") return;
    const t = setTimeout(() => {
      setPhase("done");
      setSessionDone(true);
      setLocked(false);
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, setSessionDone, setLocked]);

  useEffect(() => clearTimer, []);

  if (phase === "list") {
    return (
      <div className="space-y-4">
        <ScreenHeader
          eyebrow="Move"
          title="Today's movement break"
          sub="Three gentle exercises, about two minutes. Your sleeve checks each one."
        />
        <div className="space-y-3">
          {EXERCISES.map((ex, i) => (
            <Card key={ex.id} className="flex items-center gap-3">
              {/* Thumbnail from the actual demo clip */}
              <span className="relative h-12 w-16 flex-none overflow-hidden rounded-lg bg-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${ex.video}/mqdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/20">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M6.3 2.8A1 1 0 0 0 4.8 3.7v12.6a1 1 0 0 0 1.5.9l10-6.3a1 1 0 0 0 0-1.7l-10-6.4Z" />
                  </svg>
                </span>
              </span>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-ink">{ex.name}</p>
                <p className="text-xs text-ink/55">{ex.focus} · {ex.reps} reps</p>
              </div>
            </Card>
          ))}
        </div>
        <button
          onClick={startSession}
          className="w-full cursor-pointer rounded-xl bg-ink py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          Begin guided session
        </button>
      </div>
    );
  }

  if (phase === "active") {
    const pct = (rep / current.reps) * 100;
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader eyebrow={`Exercise ${exIndex + 1} of ${EXERCISES.length}`} title={current.name} />

        {/* Real demonstration video — follow along */}
        <YouTubeEmbed id={current.video} title={`${current.name} demonstration`} />

        <div className="mt-4 space-y-4">
          {/* Rep tracker */}
          <Card className="flex items-center gap-4">
            <ProgressRing value={pct} size={66} stroke={7}>
              <p className="font-heading text-lg font-bold text-ink">{rep}</p>
            </ProgressRing>
            <div className="flex-1">
              <p className="font-heading text-sm font-semibold text-ink">
                Rep {rep} of {current.reps}
              </p>
              <p className="text-xs text-ink/55">Follow the video at your own pace</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-2 rounded-full bg-secondary/15 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" aria-hidden />
            <span className="text-xs font-semibold text-secondary">
              Sleeve tracking your knee in real time
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "verifying") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
        <div className="relative grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-secondary/25" aria-hidden />
          <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-white">
            <Check className="h-9 w-9" />
          </div>
        </div>
        <div>
          <p className="font-heading text-xl font-bold text-ink">Sleeve verifying…</p>
          <p className="mt-1 text-sm text-ink/60">Confirming genuine range of motion</p>
        </div>
        <Card className="w-full space-y-2 text-left">
          {["Knee angle reached 92°", "Muscle engagement detected", "Movement quality: smooth"].map((t) => (
            <p key={t} className="flex items-center gap-2 text-sm text-ink/70">
              <span className="text-secondary"><Check className="h-4 w-4" /></span>
              {t}
            </p>
          ))}
        </Card>
      </div>
    );
  }

  // done
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-ink text-white">
        <Check className="h-10 w-10" />
      </div>
      <div>
        <p className="font-heading text-2xl font-bold text-ink">Session complete</p>
        <p className="mt-1 text-sm text-ink/60">Phone unlocked · Your caregiver was notified</p>
      </div>
      <Card tone="pink" className="w-full text-left">
        <p className="font-heading text-sm font-semibold text-ink">Nicely done</p>
        <p className="mt-1 text-xs leading-relaxed text-ink/65">
          That&apos;s 3 exercises verified by your sleeve. Range of motion is
          trending up — keep it going tomorrow.
        </p>
      </Card>
      <div className="flex w-full gap-2">
        <button
          onClick={() => setPhase("list")}
          className="flex-1 cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Again
        </button>
        <Pill tone="good">
          <Check className="h-3 w-3" /> Logged
        </Pill>
      </div>
    </div>
  );
}
