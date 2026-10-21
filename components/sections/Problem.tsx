import { Reveal } from "../ui/Reveal";

const barriers = [
  "Pain",
  "Fear of injury",
  "Not sure how to do it right",
  "No exercise companion",
  "Social embarrassment",
  "No accountability",
];

export function Problem() {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Exercise works. Keeping it up is the hard part.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Prescribed, then stopped, then unseen, then the benefit fades.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {barriers.map((b, i) => (
            <Reveal
              key={b}
              delay={(i % 3) * 120}
              className="flex items-center gap-4 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5"
            >
              <div
                className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-accent-pink text-ink"
                aria-hidden
              >
                <span className="font-heading text-lg font-bold">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{b}</h3>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mx-auto mt-12 max-w-3xl">
          <blockquote className="border-l-4 border-secondary pl-5 text-lg italic leading-relaxed text-ink/80">
            &ldquo;After I&apos;m done with the exercise [sessions], that&apos;s
            it, I go home. No connectivity, no further feedback, advice or
            concern.&rdquo;
            <footer className="mt-2 text-sm not-italic text-ink/55">
              <a
                href="https://doi.org/10.1186/s12913-026-14333-4"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/50"
              >
                Patient, Singapore study
              </a>
            </footer>
          </blockquote>
        </Reveal>

        <Reveal
          delay={120}
          className="mx-auto mt-12 max-w-3xl rounded-3xl bg-ink p-8 text-center text-white md:p-10"
        >
          <p className="font-heading text-xl font-semibold">
            No product makes the home programme happen at a consumer price, with
            family and physio in the loop.{" "}
            <span className="text-accent-pink">Kneedit is that product.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
