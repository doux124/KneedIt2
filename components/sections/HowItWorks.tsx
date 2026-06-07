import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { LayerImage } from "./LayerImage";

const layers = [
  {
    tag: "01 · The Sleeve",
    title: "Clinical-grade sensing, disguised as comfort",
    body: "Worn during exercise and passively all day, the sleeve captures what no general wearable can — knee-specific range of motion, muscle engagement (EMG), and tissue health (PPG). An on-sleeve LED strip gives instant feedback, so users never need to touch a screen.",
    points: [
      "Kinematic, EMG & PPG sensors",
      "No setup, no technical literacy needed",
      "Feels like a familiar compression sleeve",
    ],
    image:
      "https://images.unsplash.com/photo-1652354989460-ecccd5644412?w=1200&q=70&auto=format&fit=crop",
    imageAlt:
      "Close-up of a compression sleeve worn over a knee, soft studio lighting",
    tint: "bg-primary",
  },
  {
    tag: "02 · The Behavioural Layer",
    title: "It turns screen time into joint care",
    body: "The free app watches daily screen time. Past a set threshold, it locks the phone and starts a guided, clinically-validated exercise session. The phone won't unlock until the sleeve verifies the exercises were genuinely completed.",
    points: [
      "Seated knee extensions, ankle circles, quad sets",
      "Sleeve confirms real range of motion",
      "No willpower required",
    ],
    image:
      "https://images.unsplash.com/photo-1758691030826-86a149b6278b?w=1200&q=70&auto=format&fit=crop",
    imageAlt: "An older man looking attentively at his smartphone",
    tint: "bg-accent-pink",
    demo: true,
  },
  {
    tag: "03 · The Caregiver Ecosystem",
    title: "Family stays in the loop, automatically",
    body: "A dashboard lets nominated family members see exercise history, range-of-motion trends, and decline flags in real time. Miss sessions or show worsening mobility, and caregivers get an automatic alert — no self-reporting from the elderly user.",
    points: [
      "Real-time exercise & ROM trends",
      "Automatic missed-session alerts",
      "Caregivers configure thresholds remotely",
    ],
    image:
      "https://images.unsplash.com/photo-1589061434060-a05a5335bfbb?w=1200&q=70&auto=format&fit=crop",
    imageAlt:
      "A caregiver's hands gently clasping the hands of an elderly person",
    tint: "bg-accent-mauve",
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
            Three layers that close the loop every other product leaves open
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {layers.map((layer, i) => (
            <Reveal
              key={layer.tag}
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Copy */}
              <div>
                <span className="font-heading text-sm font-semibold tracking-wide text-secondary">
                  {layer.tag}
                </span>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  {layer.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/70">{layer.body}</p>
                <ul className="mt-6 space-y-3">
                  {layer.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-none text-secondary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-ink/80">{p}</span>
                    </li>
                  ))}
                </ul>
                {layer.demo && (
                  <Button href="/demo" variant="primary" className="mt-7">
                    See the app in action
                  </Button>
                )}
              </div>

              {/* Visual — online photo with GSAP scroll-trigger reveal + parallax */}
              <LayerImage
                src={layer.image}
                alt={layer.imageAlt}
                index={i}
                tintClass={layer.tint}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
