import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { CheckList } from "../ui/CheckList";

const layers = [
  {
    label: "The sleeve:",
    title: "Comfortable to wear, counts every rep",
    body: "Motion and bend sensors measure knee angle and reps, and an LED confirms each one.",
    points: [
      "The prototype also has muscle (EMG) and heart-rate (PPG) sensors",
      "All-day wear counts steps and can detect a possible fall",
      "Use your phone only to start, follow the video and tap feedback",
    ],
  },
  {
    label: "The app:",
    title: "Your physio's plan, guided at home",
    body: "Press start and your prescribed exercises queue up with short videos. The sleeve scores your form out of 10.",
    points: [
      "Two taps after each: did it hurt, was it easy?",
      "Take a break between reps, or stop early at any time",
      "Reminders, streaks and a friends leaderboard ranked by streak and completion rate",
    ],
    demo: true,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-surface py-20 md:py-28">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="font-extrabold">How it works:</span> Every rep
            guided, counted and confirmed
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {layers.map((layer, i) => (
            <Reveal
              key={layer.label}
              delay={i * 120}
              className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 md:p-10"
            >
              <h3 className="text-2xl font-bold sm:text-3xl">
                <span className="font-extrabold">{layer.label}</span> {layer.title}
              </h3>
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
