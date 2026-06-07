"use client";

import { useEffect, useState } from "react";
import { Card, Pill, ScreenHeader } from "../ui";

export function SleeveScreen() {
  // Lightweight "live" sensor animation
  const [rom, setRom] = useState(88);
  const [emg, setEmg] = useState([40, 65, 52, 70, 48]);
  const [conf, setConf] = useState(96);

  useEffect(() => {
    const id = setInterval(() => {
      setRom((v) => clamp(v + rand(-3, 3), 78, 96));
      setEmg((arr) => arr.map(() => rand(35, 85)));
      setConf((v) => clamp(v + rand(-1, 1), 93, 99));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <ScreenHeader
        eyebrow="Smart sleeve"
        title="Live joint signals"
        sub="What the sleeve senses, in real time. (Simulated for this demo.)"
      />

      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary" aria-hidden />
          <span className="text-sm font-semibold text-ink">Sleeve connected</span>
        </div>
        <Pill tone="good">LED: green</Pill>
      </Card>

      {/* ROM gauge */}
      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink/55">Range of motion (knee angle)</p>
          <p className="font-heading text-sm font-bold text-secondary">{rom}°</p>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-primary">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-700"
            style={{ width: `${(rom / 120) * 100}%` }}
          />
        </div>
        <p className="text-[11px] text-ink/50">Healthy active range · target 90°+</p>
      </Card>

      {/* EMG bars */}
      <Card className="space-y-2">
        <p className="text-xs text-ink/55">Muscle engagement (EMG)</p>
        <div className="flex h-20 items-end gap-2">
          {emg.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-accent-mauve transition-all duration-700"
              style={{ height: `${v}%` }}
              aria-hidden
            />
          ))}
        </div>
        <p className="text-[11px] text-ink/50">Quadriceps activating well</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {/* PPG waveform */}
        <Card className="space-y-2">
          <p className="text-xs text-ink/55">Tissue health (PPG)</p>
          <svg viewBox="0 0 120 40" className="h-12 w-full" aria-hidden>
            <polyline
              points="0,30 15,30 22,10 30,34 40,20 55,20 62,8 70,32 82,22 120,22"
              fill="none"
              stroke="#8AB0CD"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[11px] text-ink/50">Good perfusion</p>
        </Card>

        {/* Confidence */}
        <Card className="flex flex-col items-center justify-center">
          <p className="text-xs text-ink/55">Reading confidence</p>
          <p className="mt-1 font-heading text-3xl font-bold text-ink">{conf}%</p>
          <p className="text-[11px] text-ink/50">High certainty</p>
        </Card>
      </div>
    </div>
  );
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
