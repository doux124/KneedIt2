"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 40, suffix: "%", label: "of Singaporeans over 70 affected by knee osteoarthritis" },
  { value: 24, suffix: "%", label: "of those aged 60–74 exercise regularly — the lowest of any age group" },
  { value: 3, label: "clinical-grade sensors in every sleeve: motion, muscle & tissue" },
  { value: 0, label: "willpower required — the app handles adherence for you" },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (target === 0) {
      setN(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const n = useCountUp(stat.value, active);
  return (
    <div className="text-center md:text-left">
      <div className="font-heading text-4xl font-bold text-ink sm:text-5xl">
        {stat.prefix}
        {n}
        {stat.suffix}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{stat.label}</p>
    </div>
  );
}

export function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-primary/40 py-16 md:py-20">
      <div
        ref={ref}
        className="container-content grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
      >
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} active={active} />
        ))}
      </div>
    </section>
  );
}
