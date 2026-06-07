import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 20%, #8AB0CD 0%, rgba(138,176,205,0) 60%), radial-gradient(45% 55% at 85% 80%, #BDA1B0 0%, rgba(189,161,176,0) 60%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              The first wearable that doesn&apos;t just track osteoarthritis — it
              prevents it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Step through the Kneedit companion app yourself — see how everyday
              phone habits become daily joint care, and how families stay in the
              loop.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/demo"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading font-semibold text-ink transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Try the interactive demo
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M6.3 2.8A1 1 0 0 0 4.8 3.7v12.6a1 1 0 0 0 1.5.9l10-6.3a1 1 0 0 0 0-1.7l-10-6.4Z" />
                </svg>
              </Link>
              <a
                href="#how"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-heading font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Explore the product
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
