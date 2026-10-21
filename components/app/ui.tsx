"use client";

/** Small shared building blocks for the in-app screens. */

export function ScreenHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
      {sub && <p className="mt-1 text-sm leading-relaxed text-ink/60">{sub}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  tone = "white",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "primary" | "pink" | "ink";
}) {
  const tones = {
    white: "bg-white ring-1 ring-ink/5",
    primary: "bg-primary/50",
    pink: "bg-accent-pink/60",
    ink: "bg-ink text-white",
  } as const;
  return (
    <div className={`rounded-2xl p-4 ${tones[tone]} ${className}`}>{children}</div>
  );
}

export function StatTile({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card>
      <p className="text-xs text-ink/55">{label}</p>
      <p
        className={`mt-1 font-heading text-2xl font-bold ${
          accent ? "text-secondary" : "text-ink"
        }`}
      >
        {value}
      </p>
    </Card>
  );
}

/** Circular progress ring (0–100). */
export function ProgressRing({
  value,
  size = 96,
  stroke = 9,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(value, 0), 100) / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#D1E2F1" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#8AB0CD"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

export function Pill({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "secondary" | "good" | "warn";
}) {
  const tones = {
    primary: "bg-primary text-ink",
    secondary: "bg-secondary/20 text-secondary",
    good: "bg-secondary/15 text-secondary",
    warn: "bg-accent-mauve/30 text-ink",
  } as const;
  return (
    <span className={`inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Two or more options side by side, one selected. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="mb-4 flex gap-1 rounded-xl bg-ink/5 p-1" role="group" aria-label={label}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className={`flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-semibold transition-colors ${
              active ? "bg-white text-ink shadow-sm" : "text-ink/50 hover:text-ink/80"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** On/off switch for a single setting. */
export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`mt-0.5 flex h-5 w-9 flex-none cursor-pointer items-center rounded-full px-0.5 transition-colors ${
        on ? "justify-end bg-secondary" : "justify-start bg-ink/15"
      }`}
    >
      <span className="h-4 w-4 rounded-full bg-white" />
    </button>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
