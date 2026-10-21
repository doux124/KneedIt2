"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  /** Counts up from 0 to this number. Leave out when the stat isn't a single number. */
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Shown as is when there's no number to count up. */
  text?: string;
  label: string;
  /** Citations aren't printed on the page; each stat links to its source instead. */
  href: string;
};

const stats: Stat[] = [
  {
    value: 9,
    prefix: "~",
    suffix: "%",
    label: "of Singapore residents live with knee osteoarthritis",
    // Leung et al. (2018)
    href: "https://doi.org/10.1111/1756-185X.13252",
  },
  {
    value: 87.5,
    decimals: 1,
    suffix: "%",
    label: "of patients are already referred to exercise",
    // Tan et al. (2025)
    href: "https://doi.org/10.1186/s12891-025-08524-z",
  },
  {
    value: 50,
    prefix: ">",
    suffix: "%",
    label: "don't keep up prescribed exercise",
    // Ricke et al. (2023), citing Sabaté (2003)
    href: "https://doi.org/10.3389/fspor.2023.1035023",
  },
  {
    text: "2–6",
    label: "months after stopping, the benefits fade",
    // Fransen et al. (2015), Cochrane
    href: "https://doi.org/10.1002/14651858.CD004376.pub3",
  },
];

function display(stat: Stat, n: number) {
  if (stat.value === undefined) return stat.text;
  return `${stat.prefix ?? ""}${n.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`;
}

function useCountUp(target: number, decimals: number, active: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (target === 0) {
      setN(0);
      return;
    }
    const scale = 10 ** decimals;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target * scale) / scale);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, decimals, active, duration]);
  return n;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const n = useCountUp(stat.value ?? 0, stat.decimals ?? 0, active);
  return (
    <a
      href={stat.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${display(stat, stat.value ?? 0)} ${stat.label}. Opens the source in a new tab.`}
      className="group block rounded-2xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-primary md:text-left"
    >
      <div className="font-heading text-4xl font-bold text-ink sm:text-5xl">
        {display(stat, n)}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink/65 underline decoration-ink/20 underline-offset-4 transition-colors group-hover:text-ink group-hover:decoration-ink/50">
        {stat.label}
      </p>
    </a>
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
