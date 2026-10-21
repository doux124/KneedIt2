import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { CheckList } from "../ui/CheckList";

const layers = [
  {
    number: "01",
    tag: "The Sleeve",
    title: "Feels like a sleeve. Counts every rep.",
    body: "Motion and bend sensors measure knee angle and reps, and an LED confirms each one.",
    points: [
      "The prototype also has muscle (EMG) and heart-rate (PPG) sensors",
      "All-day wear counts steps and can detect a possible fall",
      "Use your phone only to start, follow the video and tap feedback",
    ],
    tint: "bg-primary",
  },
  {
    number: "02",
    tag: "The Behavioural Layer",
    title: "Your physio's plan, guided at home",
    body: "Press start and your prescribed exercises queue up with short videos. The sleeve scores your form out of 10.",
    points: [
      "Two taps after each: did it hurt, was it easy?",
      "Take a break between reps, or stop early at any time",
      "Reminders, streaks and a friends leaderboard ranked by streak and completion rate",
    ],
    tint: "bg-accent-pink",
    demo: true,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-surface py-20 md:py-28">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Every rep guided, counted and confirmed
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {layers.map((layer, i) => (
            <Reveal
              key={layer.tag}
              delay={i * 120}
              className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 md:p-10"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 flex-none place-items-center rounded-2xl font-heading text-sm font-bold text-ink ${layer.tint}`}
                  aria-hidden
                >
                  {layer.number}
                </span>
                <span className="font-heading text-sm font-semibold tracking-wide text-secondary">
                  {layer.tag}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold sm:text-3xl">{layer.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/70">{layer.body}</p>
              <CheckList items={layer.points} className="mt-6" />
              {layer.demo && (
                <div className="mt-auto pt-7">
                  <Button href="/demo" variant="primary">
                    See the app in action
                  </Button>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
