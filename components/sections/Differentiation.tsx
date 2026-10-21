import { Reveal } from "../ui/Reveal";

const columns = [
  { key: "sleeve", label: "Compression sleeve" },
  { key: "watch", label: "Smartwatch" },
  { key: "hinge", label: "Hinge Health" },
  { key: "kimia", label: "Kinexcs KIMIA" },
  { key: "kneedit", label: "Kneedit" },
] as const;

type Key = (typeof columns)[number]["key"];

const rows: ({ feature: string } & Record<Key, boolean>)[] = [
  { feature: "Knee-specific sensing", sleeve: false, watch: false, hinge: false, kimia: true, kneedit: true },
  { feature: "Verified completion", sleeve: false, watch: false, hinge: true, kimia: true, kneedit: true },
  { feature: "Family view", sleeve: false, watch: false, hinge: false, kimia: false, kneedit: true },
  { feature: "Physio view", sleeve: false, watch: false, hinge: true, kimia: true, kneedit: true },
  { feature: "Available to Singapore consumers", sleeve: true, watch: true, hinge: false, kimia: false, kneedit: true },
];

function Mark({ on }: { on: boolean }) {
  return on ? (
    <svg className="mx-auto h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-label="Yes">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="mx-auto h-5 w-5 text-ink/25" viewBox="0 0 20 20" fill="currentColor" aria-label="No">
      <path fillRule="evenodd" d="M10 8.6 5.7 4.3a1 1 0 0 0-1.4 1.4L8.6 10l-4.3 4.3a1 1 0 1 0 1.4 1.4L10 11.4l4.3 4.3a1 1 0 0 0 1.4-1.4L11.4 10l4.3-4.3a1 1 0 0 0-1.4-1.4L10 8.6Z" clipRule="evenodd" />
    </svg>
  );
}

export function Differentiation() {
  return (
    <section id="why" className="py-20 md:py-28">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Why Kneedit
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Supports your physio. Doesn&apos;t replace them.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Physiotherapy is the care. Kneedit makes the home part of it happen.
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
            <thead>
              <tr>
                <th className="bg-white p-5 text-left font-heading text-sm font-semibold text-ink/60">
                  Capability
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`p-5 text-center font-heading text-sm font-semibold ${
                      c.key === "kneedit"
                        ? "bg-ink text-white"
                        : "bg-white text-ink/60"
                    }`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.feature}>
                  <td
                    className={`p-5 text-sm font-medium text-ink/80 ${
                      ri !== rows.length - 1 ? "border-b border-ink/5" : ""
                    }`}
                  >
                    {row.feature}
                  </td>
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={`p-5 ${
                        c.key === "kneedit" ? "bg-primary/30" : ""
                      } ${ri !== rows.length - 1 ? "border-b border-ink/5" : ""}`}
                    >
                      <Mark on={row[c.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
