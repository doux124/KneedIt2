import { Reveal } from "../ui/Reveal";
import { CheckList } from "../ui/CheckList";

const features = [
  "Their streak and monthly activity",
  "Alerts after 3 missed days, and Kneedit notifies family immediately if a possible fall is detected",
  "A weekly report and a notes field the physio can read",
];

export function Families() {
  return (
    <section id="families" className="bg-secondary/15 py-20 md:py-28">
      <div className="container-content grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="font-extrabold">For families:</span> Know the
            exercises got done
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">
            Your parent shares how they&apos;re managing on their own.
          </p>
          <CheckList items={features} className="mt-6" />
          <blockquote className="mt-8 border-l-4 border-secondary pl-5 text-lg italic leading-relaxed text-ink/80">
            &ldquo;If my daughter could see I had done it, she would stop
            nagging me, and that alone was reason enough to try.&rdquo;
            <footer className="mt-2 text-sm not-italic text-ink/55">
              Elderly participant, Kneedit stakeholder interview
            </footer>
          </blockquote>
        </Reveal>

        {/* Weekly report mock */}
        <Reveal delay={120}>
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-ink/50">
                  Weekly report
                </p>
                <p className="font-heading text-lg font-bold">Mum&apos;s week</p>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ink">
                On track
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs text-ink/55">Sessions</p>
                <p className="mt-1 font-heading text-2xl font-bold">6/7</p>
                <p className="text-xs text-ink/55">86% done</p>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs text-ink/55">Steps</p>
                <p className="mt-1 font-heading text-2xl font-bold text-secondary">4,460</p>
                <p className="text-xs text-ink/55">a day</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-surface p-4">
              <p className="text-xs text-ink/55">Flagged</p>
              <p className="mt-1 text-sm text-ink/80">Pain during quad sets, Thursday</p>
            </div>

            <div className="mt-4 rounded-2xl bg-surface p-4">
              <p className="text-xs text-ink/55">Note for the physio</p>
              <p className="mt-1 text-sm text-ink/80">Stiff after a long walk.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
