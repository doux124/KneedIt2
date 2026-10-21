"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../AppContext";
import { Card, Check, Pill, ProgressRing, ScreenHeader } from "../ui";
import {
  EXERCISES,
  GRADES,
  MAX_SESSION_POINTS,
  POINTS_PER_REP,
  gradeFor,
  maxPointsFor,
  pointsFor,
  type ExerciseResult,
} from "../points";

type Phase = "list" | "active" | "verifying" | "done";

export function MoveScreen() {
  const { autoStart, setAutoStart, logSession, rank, leaderboard, setTab } = useApp();
  const [phase, setPhase] = useState<Phase>("list");
  const [exIndex, setExIndex] = useState(0);
  const [rep, setRep] = useState(0);
  /** Live form score from the sleeve for the set in progress. */
  const [formScore, setFormScore] = useState(88);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [rankBefore, setRankBefore] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const advance = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<ExerciseResult[]>([]);
  // Mirrors of the animated state, so the interval reads current values
  // without re-subscribing on every tick.
  const repRef = useRef(0);
  const formRef = useRef(88);

  const current = EXERCISES[exIndex];

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (advance.current) {
      clearTimeout(advance.current);
      advance.current = null;
    }
  };

  const startSession = useCallback(() => {
    setExIndex(0);
    setRep(0);
    setFormScore(88);
    setResults([]);
    resultsRef.current = [];
    repRef.current = 0;
    formRef.current = 88;
    setRankBefore(null);
    setPhase("active");
  }, []);

  // Auto-start when launched from Today or the leaderboard
  useEffect(() => {
    if (autoStart) {
      startSession();
      setAutoStart(false);
    }
  }, [autoStart, setAutoStart, startSession]);

  // Remember where the user sat before the points land, so the done screen
  // can show the climb.
  useEffect(() => {
    if (phase === "active" && rankBefore === null) setRankBefore(rank);
  }, [phase, rank, rankBefore]);

  // Drive the rep counter while a set is active, scoring each rep as it lands
  useEffect(() => {
    if (phase !== "active") return;
    clearTimer();
    timer.current = setInterval(() => {
      // The sleeve re-scores form on every rep.
      const score = clamp(formRef.current + rand(-6, 7), 62, 98);
      formRef.current = score;
      setFormScore(score);

      const nextRep = repRef.current + 1;
      repRef.current = nextRep;
      setRep(nextRep);

      if (nextRep < current.reps) return;

      // Set finished: bank it at the score the sleeve settled on.
      clearTimer();
      resultsRef.current = [
        ...resultsRef.current,
        {
          id: current.id,
          name: current.name,
          reps: current.reps,
          formScore: score,
          grade: gradeFor(score),
          points: pointsFor(current.reps, score),
        },
      ];
      setResults(resultsRef.current);

      if (exIndex + 1 < EXERCISES.length) {
        repRef.current = 0;
        advance.current = setTimeout(() => {
          advance.current = null;
          setRep(0);
          setExIndex(exIndex + 1);
        }, 450);
      } else {
        setPhase("verifying");
      }
    }, 650);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exIndex]);

  // Verifying → done, and the points land
  useEffect(() => {
    if (phase !== "verifying") return;
    const t = setTimeout(() => {
      logSession(resultsRef.current);
      setPhase("done");
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, logSession]);

  useEffect(() => clearTimer, []);

  const earned = results.reduce((sum, r) => sum + r.points, 0);

  if (phase === "list") {
    return (
      <div className="space-y-4">
        <ScreenHeader
          eyebrow="Move"
          title="Today's movement break"
          sub="Three gentle exercises, about two minutes. Your sleeve scores the form on every rep."
        />

        <Card tone="pink" className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-white font-heading text-sm font-bold text-secondary">
            {MAX_SESSION_POINTS}
          </span>
          <div>
            <p className="font-heading text-sm font-semibold text-ink">
              Up to {MAX_SESSION_POINTS} points on the line
            </p>
            <p className="text-xs leading-relaxed text-ink/60">
              {POINTS_PER_REP} points a rep, up to {GRADES.perfect.multiplier}×
              when your form is perfect.
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          {EXERCISES.map((ex) => (
            <Card key={ex.id} className="flex items-center gap-3">
              {/* Thumbnail from the actual demo clip */}
              <span className="relative h-12 w-16 flex-none overflow-hidden rounded-lg bg-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ex.poster}
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
              <span className="font-heading text-xs font-bold text-ink/45">
                {maxPointsFor(ex.reps)} pts
              </span>
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
    const grade = gradeFor(formScore);
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader eyebrow={`Exercise ${exIndex + 1} of ${EXERCISES.length}`} title={current.name} />

        {/* Real demonstration video — follow along */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink/90 ring-1 ring-ink/5">
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            className="h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${current.name} demonstration`}
          />
          {/* Live form read-out from the sleeve */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" aria-hidden />
            <span className="text-[10px] font-semibold text-white">
              {GRADES[grade].short} form · {GRADES[grade].multiplier}×
            </span>
          </div>
          {earned > 0 && (
            <div className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur">
              <span className="font-heading text-[10px] font-bold text-ink">
                +{earned} pts
              </span>
            </div>
          )}
        </div>

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
              <p className="text-xs text-ink/55">Slow and controlled scores highest</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Live form quality */}
          <Card className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink/55">Form quality (sleeve)</p>
              <p className="font-heading text-sm font-bold text-secondary">{formScore}</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-primary">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${formScore}%` }}
              />
            </div>
            <p className="text-[11px] text-ink/50">
              Range of motion, muscle engagement and smoothness, scored live.
            </p>
          </Card>
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
          <p className="font-heading text-xl font-bold text-ink">Scoring your form…</p>
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
  const climbed = rankBefore !== null && rank < rankBefore;
  // Whoever now sits directly below you is the friend you just overtook.
  const passed = climbed ? leaderboard.find((r) => r.rank === rank + 1)?.name : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-ink text-white">
          <Check className="h-8 w-8" />
        </div>
        <div>
          <p className="font-heading text-2xl font-bold text-ink">+{earned} points</p>
          <p className="mt-1 text-sm text-ink/60">
            Session verified by your sleeve. {sessionNote(climbed, passed)}
          </p>
        </div>
      </div>

      {/* Per-exercise scoring */}
      <Card className="space-y-3">
        <p className="font-heading text-sm font-semibold text-ink">How you scored</p>
        {results.map((r) => (
          <div key={r.id} className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink/85">{r.name}</p>
              <p className="text-[11px] text-ink/50">
                {r.reps} reps · form {r.formScore}
              </p>
            </div>
            <Pill tone={r.grade === "perfect" ? "good" : "primary"}>
              {GRADES[r.grade].short} {GRADES[r.grade].multiplier}×
            </Pill>
            <span className="w-12 text-right font-heading text-sm font-bold text-ink">
              +{r.points}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-ink/10 pt-3">
          <span className="text-sm font-semibold text-ink/70">Session total</span>
          <span className="font-heading text-base font-bold text-secondary">+{earned} pts</span>
        </div>
      </Card>

      {/* Standing */}
      <Card tone="primary" className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-white font-heading text-base font-bold text-ink">
          {rank}
        </span>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold text-ink">
            {climbed ? "You moved up the leaderboard" : "Your place this week"}
          </p>
          <p className="text-xs text-ink/60">
            {climbed && passed ? `You passed ${passed}.` : `${rank} of ${leaderboard.length} in your group.`}
          </p>
        </div>
      </Card>

      <div className="flex gap-2">
        <button
          onClick={() => setPhase("list")}
          className="flex-1 cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Again
        </button>
        <button
          onClick={() => setTab("friends")}
          className="flex-1 cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          See leaderboard
        </button>
      </div>
    </div>
  );
}

function sessionNote(climbed: boolean, passed: string | null | undefined) {
  if (climbed && passed) return `You just passed ${passed}.`;
  return "Your friends can see it on the leaderboard.";
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
