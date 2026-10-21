"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../AppContext";
import { Card, Check, Pill, ProgressRing, ScreenHeader } from "../ui";
import {
  EXERCISES,
  formatScore,
  sessionScore,
  type ExerciseResult,
  type Feedback,
} from "../progress";

type Phase = "list" | "active" | "feedback" | "verifying" | "done";

const TOTAL_REPS = EXERCISES.reduce((sum, e) => sum + e.reps, 0);

export function MoveScreen() {
  const { autoStart, setAutoStart, logSession, rank, leaderboard, weekRate, sessionDone, setTab } =
    useApp();
  const [phase, setPhase] = useState<Phase>("list");
  const [exIndex, setExIndex] = useState(0);
  const [rep, setRep] = useState(0);
  /** Live form score from the sleeve, 0 to 100, shown out of 10. */
  const [formScore, setFormScore] = useState(88);
  const [paused, setPaused] = useState(false);
  const [answers, setAnswers] = useState<Partial<Feedback>>({});
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [complete, setComplete] = useState(false);
  /** Whether this session counted toward the week, or today's was already done. */
  const [counted, setCounted] = useState(false);
  const [rankBefore, setRankBefore] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const advance = useRef<ReturnType<typeof setTimeout> | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const resultsRef = useRef<ExerciseResult[]>([]);
  // Mirrors of the animated state, so the interval reads current values
  // without re-subscribing on every tick.
  const repRef = useRef(0);
  const formRef = useRef(88);

  const current = EXERCISES[exIndex];

  const stopReps = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };
  const cancelAdvance = () => {
    if (advance.current) {
      clearTimeout(advance.current);
      advance.current = null;
    }
  };

  const startSession = useCallback(() => {
    stopReps();
    cancelAdvance();
    setExIndex(0);
    setRep(0);
    setFormScore(88);
    setPaused(false);
    setAnswers({});
    setResults([]);
    resultsRef.current = [];
    repRef.current = 0;
    formRef.current = 88;
    setComplete(false);
    setCounted(false);
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

  // Remember where the user sat before the session lands, so the done screen
  // can show the climb.
  useEffect(() => {
    if (phase === "active" && rankBefore === null) setRankBefore(rank);
  }, [phase, rank, rankBefore]);

  // Drive the rep counter while a set is active and not on a break. There is
  // no time limit on an exercise, so a break simply holds the count.
  useEffect(() => {
    if (phase !== "active" || paused) return;
    timer.current = setInterval(() => {
      // The sleeve re-scores form on every rep.
      const score = clamp(formRef.current + rand(-6, 7), 62, 98);
      formRef.current = score;
      setFormScore(score);

      const nextRep = repRef.current + 1;
      repRef.current = nextRep;
      setRep(nextRep);

      if (nextRep < current.reps) return;

      // Set finished: two taps of feedback before the next one.
      stopReps();
      setAnswers({});
      setPhase("feedback");
    }, 650);
    return stopReps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exIndex, paused]);

  // The follow-along video holds still during a break
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  // Verifying, then done
  useEffect(() => {
    if (phase !== "verifying") return;
    const t = setTimeout(() => {
      setCounted(!sessionDone);
      logSession({ exercises: resultsRef.current, complete: true });
      setComplete(true);
      setPhase("done");
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, logSession, sessionDone]);

  useEffect(
    () => () => {
      stopReps();
      cancelAdvance();
    },
    [],
  );

  const answer = (key: keyof Feedback, value: boolean) => {
    if (phase !== "feedback" || advance.current) return;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (next.hurt === undefined || next.easy === undefined) return;

    resultsRef.current = [
      ...resultsRef.current,
      {
        id: current.id,
        name: current.name,
        reps: current.reps,
        formScore: formRef.current / 10,
        feedback: { hurt: next.hurt, easy: next.easy },
      },
    ];
    setResults(resultsRef.current);

    advance.current = setTimeout(() => {
      advance.current = null;
      if (exIndex + 1 < EXERCISES.length) {
        repRef.current = 0;
        setRep(0);
        setAnswers({});
        setExIndex(exIndex + 1);
        setPhase("active");
      } else {
        setPhase("verifying");
      }
    }, 450);
  };

  /** End the whole session now. What was done is kept, marked incomplete. */
  const stopEarly = () => {
    stopReps();
    cancelAdvance();
    setPaused(false);
    setComplete(false);
    logSession({ exercises: resultsRef.current, complete: false });
    setPhase("done");
  };

  if (phase === "list") {
    return (
      <div className="space-y-4">
        <ScreenHeader
          title="Today's exercises"
          sub="Prescribed by your physio. The sleeve confirms each rep and scores your form out of 10."
        />

        <Card tone="pink" className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-white text-secondary" aria-hidden>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1.5" />
              <rect x="14" y="5" width="4" height="14" rx="1.5" />
            </svg>
          </span>
          <div>
            <p className="font-heading text-sm font-semibold text-ink">Go at your own pace</p>
            <p className="text-xs leading-relaxed text-ink/60">
              Take a break between reps, or stop at any time. After each
              exercise, two quick taps.
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
                <p className="text-xs text-ink/55">{ex.focus}</p>
              </div>
              <span className="font-heading text-xs font-bold text-ink/45">{ex.reps} reps</span>
            </Card>
          ))}
        </div>

        {sessionDone && (
          <p className="px-1 text-center text-[11px] leading-relaxed text-ink/50">
            Today&apos;s session is done. Extra sessions are fine, but only the
            prescribed one counts toward your week.
          </p>
        )}

        <button
          onClick={startSession}
          className="w-full cursor-pointer rounded-xl bg-ink py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          Start session
        </button>
      </div>
    );
  }

  if (phase === "active") {
    const pct = (rep / current.reps) * 100;
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader title={current.name} sub={`Exercise ${exIndex + 1} of ${EXERCISES.length}`} />

        {/* Real demonstration video, follow along */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink/90 ring-1 ring-ink/5">
          <video
            ref={video}
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
              Form {formatScore(formScore / 10)}
            </span>
          </div>
          {paused && (
            <div className="absolute inset-0 grid place-items-center bg-ink/50">
              <span className="rounded-full bg-white/90 px-3 py-1.5 font-heading text-xs font-bold text-ink">
                On a break
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
              <p className="text-xs text-ink/55">The sleeve&apos;s LED confirms each rep</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Live form score */}
          <Card className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink/55">Form score (sleeve)</p>
              <p className="font-heading text-sm font-bold text-secondary">
                {formatScore(formScore / 10)}
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-primary">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${formScore}%` }}
              />
            </div>
            <p className="text-[11px] text-ink/50">
              Knee angle and smoothness, scored live. Slow and controlled scores
              highest.
            </p>
          </Card>

          <div className="flex gap-2">
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex-1 cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
            >
              {paused ? "Resume" : "Take a break"}
            </button>
            <button
              onClick={stopEarly}
              className="flex-1 cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink/60 ring-1 ring-ink/10 transition-colors hover:text-ink"
            >
              Stop session
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "feedback") {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-white">
            <Check className="h-7 w-7" />
          </div>
          <div>
            <p className="font-heading text-xl font-bold text-ink">{current.name} done</p>
            <p className="mt-1 text-sm text-ink/60">
              Form {formatScore(formScore / 10)}. Two quick taps before you go on.
            </p>
          </div>
        </div>

        <Question label="Did it hurt?" value={answers.hurt} onAnswer={(v) => answer("hurt", v)} />
        <Question label="Was it easy?" value={answers.easy} onAnswer={(v) => answer("easy", v)} />

        <p className="px-1 text-center text-[11px] leading-relaxed text-ink/50">
          Your answers go into your physio&apos;s weekly report.
        </p>

        <button
          onClick={stopEarly}
          className="w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink/60 ring-1 ring-ink/10 transition-colors hover:text-ink"
        >
          Stop session
        </button>
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
          <p className="font-heading text-xl font-bold text-ink">Checking your session…</p>
          <p className="mt-1 text-sm text-ink/60">Confirming each rep with your sleeve</p>
        </div>
        <Card className="w-full space-y-2 text-left">
          {[`All ${TOTAL_REPS} reps confirmed`, "Knee angle reached 92°", "Movement quality: smooth"].map((t) => (
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
  const score = sessionScore(results);
  const climbed = complete && rankBefore !== null && rank < rankBefore;
  // Whoever now sits directly below you is the friend you just overtook.
  const passed = climbed ? leaderboard.find((r) => r.rank === rank + 1)?.name : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <div
          className={`grid h-16 w-16 place-items-center rounded-full ${
            complete ? "bg-ink text-white" : "bg-accent-mauve/40 text-ink"
          }`}
        >
          {complete ? (
            <Check className="h-8 w-8" />
          ) : (
            <span className="font-heading text-2xl font-bold" aria-hidden>!</span>
          )}
        </div>
        <div>
          <p className="font-heading text-2xl font-bold text-ink">
            {complete ? "Session complete" : "Session stopped early"}
          </p>
          <p className="mt-1 text-sm text-ink/60">
            {complete
              ? `Every rep confirmed by your sleeve. ${sessionNote(passed, counted)}`
              : "Saved as incomplete. Rest, and contact your clinician if pain worsens."}
          </p>
        </div>
      </div>

      {/* Per-exercise form and feedback */}
      {results.length > 0 && (
        <Card className="space-y-3">
          <p className="font-heading text-sm font-semibold text-ink">How it went</p>
          {results.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink/85">{r.name}</p>
                <p className="text-[11px] text-ink/50">
                  {r.reps} reps, form {formatScore(r.formScore)}
                </p>
              </div>
              <Pill tone={r.feedback.hurt ? "warn" : "good"}>
                {r.feedback.hurt ? "Hurt" : "No pain"}
              </Pill>
              <Pill tone="primary">{r.feedback.easy ? "Easy" : "Hard"}</Pill>
            </div>
          ))}
          {score !== null && (
            <div className="flex items-center justify-between border-t border-ink/10 pt-3">
              <span className="text-sm font-semibold text-ink/70">Session score</span>
              <span className="font-heading text-base font-bold text-secondary">
                {formatScore(score)}
              </span>
            </div>
          )}
        </Card>
      )}

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
            {climbed && passed
              ? `You passed ${passed}.`
              : `${weekRate}% of this week's sessions done.`}
          </p>
        </div>
      </Card>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("today")}
          className="flex-1 cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-primary/40"
        >
          Back to Today
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

function Question({
  label,
  value,
  onAnswer,
}: {
  label: string;
  value: boolean | undefined;
  onAnswer: (v: boolean) => void;
}) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <p className="font-heading text-sm font-semibold text-ink">{label}</p>
      <div className="flex gap-2" role="group" aria-label={label}>
        {[true, false].map((v) => {
          const selected = value === v;
          return (
            <button
              key={String(v)}
              onClick={() => onAnswer(v)}
              aria-pressed={selected}
              className={`min-w-[56px] cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-ink text-white"
                  : "bg-white text-ink ring-1 ring-ink/10 hover:bg-primary/40"
              }`}
            >
              {v ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function sessionNote(passed: string | null | undefined, counted: boolean) {
  if (passed) return `You just passed ${passed}.`;
  if (counted) return "Your streak and week are updated.";
  return "Today's session was already done, so your week stays the same.";
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
