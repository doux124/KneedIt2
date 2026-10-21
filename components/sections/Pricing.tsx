import { Reveal } from "../ui/Reveal";
import { CheckList } from "../ui/CheckList";

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/15 py-20 md:py-28">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Start free with the sleeve
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 md:p-10">
            <h3 className="text-3xl font-bold">Free</h3>
            <p className="mt-2 text-lg font-semibold text-secondary">
              With the SGD 29 sleeve
            </p>
            <CheckList
              className="mt-6"
              items={[
                "Guided sessions, form score and two-tap feedback",
                "Streaks and the friends leaderboard",
                "Basic stats for family, and adherence stats for the physio",
              ]}
            />
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-3xl bg-ink p-7 text-white shadow-sm md:p-10"
          >
            <h3 className="text-3xl font-bold text-white">Kneedit Plus</h3>
            <p className="mt-2 text-lg font-semibold text-accent-pink">
              SGD 15/month
            </p>
            <CheckList
              onDark
              className="mt-6"
              items={[
                "Caregiver alerts and fall notifications",
                "Weekly reports, and notes to the physio",
                "Form-feedback breakdown and the full physio record",
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
