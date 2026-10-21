import { KneeditLogo } from "../brand/KneeditLogo";

const team = ["Jordan Low Jun Yi", "Brigitte Tan", "Lim En Xi", "Advait Bagari"];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface py-14">
      <div className="container-content">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <KneeditLogo width={150} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              A smart knee sleeve and companion app that helps seniors with knee
              osteoarthritis keep up their physio exercises, with views for
              family and physiotherapists.
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-ink">Product</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              <li><a href="#problem" className="transition-colors hover:text-ink">The Problem</a></li>
              <li><a href="#how" className="transition-colors hover:text-ink">How It Works</a></li>
              <li><a href="#families" className="transition-colors hover:text-ink">For Families</a></li>
              <li><a href="#physios" className="transition-colors hover:text-ink">For Physios</a></li>
              <li><a href="#why" className="transition-colors hover:text-ink">Why Kneedit</a></li>
              <li><a href="#pricing" className="transition-colors hover:text-ink">Pricing</a></li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-ink">The Team</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/60">
              {team.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-sm text-ink/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kneedit. All rights reserved.</p>
          <p>
            Concept stage. Software prototype live. Seeking physiotherapy clinic
            pilot partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
