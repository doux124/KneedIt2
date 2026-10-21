import { Reveal } from "../ui/Reveal";

export function SafetyNote() {
  return (
    <section id="safety" aria-label="Safety" className="pt-20 md:pt-28">
      <div className="container-content">
        <Reveal className="mx-auto flex max-w-3xl items-start gap-4 rounded-3xl bg-accent-pink/60 p-6 md:p-8">
          <span
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white text-secondary"
            aria-hidden
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 2a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="leading-relaxed text-ink/80">
            Kneedit is not a medical device. It does not diagnose or replace
            professional care. Take a break or stop a session at any time, and
            contact your clinician if pain worsens.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
