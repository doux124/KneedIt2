import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      {/* Soft palette background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, #F5D8E7 0%, rgba(245,216,231,0) 60%), radial-gradient(55% 45% at 10% 30%, #D1E2F1 0%, rgba(209,226,241,0) 60%)",
        }}
      />

      <div className="container-content grid items-center gap-10 pb-16 md:grid-cols-2 md:gap-10 md:pb-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Physio works.{" "}
            <span className="text-secondary">Kneedit makes it stick.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
            A smart knee sleeve and app that guides seniors through their
            prescribed home exercises, records that they were done, and keeps
            their family and physiotherapist in the loop.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/demo" size="lg">
              Try the interactive demo
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M6.3 2.8A1 1 0 0 0 4.8 3.7v12.6a1 1 0 0 0 1.5.9l10-6.3a1 1 0 0 0 0-1.7l-10-6.4Z" />
              </svg>
            </Button>
            <Button href="#how" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink/55">
            Free app, with Kneedit Plus for families and physios. Designed in
            Singapore.
          </p>
        </div>

        {/* Hero video, framed in a soft rounded card with a palette glow */}
        <div className="relative">
          {/* Soft gradient glow behind the card */}
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary via-accent-pink to-accent-mauve opacity-60 blur-xl"
          />
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/60 bg-ink/5 shadow-xl shadow-ink/10 ring-1 ring-ink/10 sm:aspect-[5/5] md:aspect-[5/6]">
            <video
              className="h-full w-full object-cover object-center"
              src="/videos/hero-demo.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Kneedit smart knee sleeve product demonstration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
