import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { CheckList } from "../ui/CheckList";
import { CLINIC_PILOT_HREF } from "./contact";

const features = [
  "Prescribe from a tagged exercise library",
  "Weekly reports with pain and ease ratings, plus caregiver notes",
  "Auto-generated visit summaries, and bookings in a calendar shared with patient and family",
];

const patients = [
  { name: "Mdm Tan", done: 86 },
  { name: "Mr Lim", done: 71 },
  { name: "Mdm Siti", done: 29 },
];

export function Physios() {
  return (
    <section id="physios" className="py-20 md:py-28">
      <div className="container-content grid items-center gap-12 md:grid-cols-2 md:[&>*:first-child]:order-2">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="font-extrabold">For physios:</span> See the full
            picture between visits
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">
            Physiotherapists can&apos;t see what happens between appointments.
            Kneedit shows them.
          </p>
          <CheckList items={features} className="mt-6" />
          <Button href={CLINIC_PILOT_HREF} size="lg" className="mt-7">
            Pilot Kneedit with your clinic
          </Button>
        </Reveal>

        {/* Desktop clinic dashboard mock */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            <div className="flex items-center gap-2 border-b border-ink/5 bg-surface px-6 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-mauve" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-pink" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
              <p className="ml-2 font-heading text-xs font-semibold text-ink/50">
                Kneedit for clinics
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-sm font-semibold text-ink/50">Patients</p>
                  <p className="font-heading text-lg font-bold">This week</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ink">
                  Sessions
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {patients.map((p) => (
                  <div key={p.name} className="flex items-center gap-4 rounded-2xl bg-surface px-4 py-3">
                    <p className="w-20 flex-none text-sm font-semibold text-ink">{p.name}</p>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${p.done}%` }} />
                    </div>
                    <p className="w-10 flex-none text-right font-heading text-sm font-bold text-ink">
                      {p.done}%
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-accent-pink/60 p-4">
                <p className="text-xs text-ink/55">Since last visit: Mdm Tan</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">
                  11 of 13 sessions. Pain once, in quad sets. Family note:
                  stiff after a long walk.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm text-ink/60">Next visit: Tuesday, 10:00</p>
                <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white">
                  Booked
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
