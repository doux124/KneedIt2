import { Reveal } from "../ui/Reveal";

const barriers = [
  {
    title: "Fear of injury",
    body: "Many elderly avoid exercise because they worry about hurting themselves, so they do nothing at all.",
  },
  {
    title: "Social embarrassment",
    body: "Public exercise spaces feel intimidating. Without a companion, motivation disappears.",
  },
  {
    title: "No accountability",
    body: "Nothing at home tracks whether exercise actually happens, and no one notices when it stops.",
  },
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
            Knee osteoarthritis is largely preventable.
            <br className="hidden sm:block" /> The barrier isn&apos;t awareness,
            it&apos;s adherence.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Exercise is the single most evidence-backed way to slow knee
            osteoarthritis. Yet elderly Singaporeans exercise the least. Our
            interviews revealed why, and existing products don&apos;t fix any of
            it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {barriers.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 120}
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5"
            >
              <div
                className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-accent-pink text-ink"
                aria-hidden
              >
                <span className="font-heading text-lg font-bold">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={120}
          className="mx-auto mt-12 max-w-3xl rounded-3xl bg-ink p-8 text-center text-white md:p-10"
        >
          <p className="text-lg leading-relaxed text-white/90">
            Braces are passive. Smartwatches track steps, not knees. Clinical
            devices are built for post-surgical recovery, expensive and
            hospital-bound.
          </p>
          <p className="mt-4 font-heading text-xl font-semibold">
            No product prevents knee osteoarthritis at home, at a consumer price,
            with built-in accountability.{" "}
            <span className="text-accent-pink">Kneedit is that product.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
