import { Reveal } from "../ui/Reveal";

export function Caregiver() {
  return (
    <section id="caregiver" className="bg-secondary/15 py-20 md:py-28">
      <div className="container-content grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            The Caregiver Ecosystem
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            In Singapore, adult children are the de facto health managers
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">
            Kneedit is built with that reality in mind. The elderly user
            doesn&apos;t need to self-report. The caregiver doesn&apos;t need to
            guess. And when it&apos;s time to see a doctor, there&apos;s an
            objective, longitudinal record of joint health to inform the
            consultation.
          </p>
          <blockquote className="mt-8 border-l-4 border-secondary pl-5 text-lg italic leading-relaxed text-ink/80">
            &ldquo;If my daughter could see I had done it, she would stop
            nagging me — and that alone was reason enough to try.&rdquo;
            <footer className="mt-2 text-sm not-italic text-ink/55">
              — Elderly participant, Kneedit stakeholder interview
            </footer>
          </blockquote>
        </Reveal>

        {/* Caregiver dashboard mock */}
        <Reveal delay={120}>
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-ink/50">
                  Caregiver Dashboard
                </p>
                <p className="font-heading text-lg font-bold">Mum&apos;s knee health</p>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ink">
                On track
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs text-ink/55">This week</p>
                <p className="mt-1 font-heading text-2xl font-bold">6/7</p>
                <p className="text-xs text-ink/55">sessions completed</p>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs text-ink/55">Range of motion</p>
                <p className="mt-1 font-heading text-2xl font-bold text-secondary">+4°</p>
                <p className="text-xs text-ink/55">vs. last month</p>
              </div>
            </div>

            {/* Mini trend */}
            <div className="mt-4 rounded-2xl bg-surface p-4">
              <p className="text-xs text-ink/55">Mobility trend</p>
              <svg viewBox="0 0 260 70" className="mt-2 h-16 w-full" aria-hidden>
                <polyline
                  points="0,55 40,48 80,50 120,38 160,40 200,26 260,22"
                  fill="none"
                  stroke="#8AB0CD"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <polyline
                  points="0,55 40,48 80,50 120,38 160,40 200,26 260,22"
                  fill="url(#g)"
                  stroke="none"
                  opacity="0.18"
                  transform="translate(0,0)"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8AB0CD" />
                    <stop offset="100%" stopColor="#fff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-accent-pink/60 p-3">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-white text-secondary" aria-hidden>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm text-ink/75">
                No alerts — last session verified 2 hours ago.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
