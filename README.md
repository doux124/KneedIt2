# Kneedit — Landing Site + App Demo

Marketing site and interactive companion-app prototype for **Kneedit**, a smart
knee sleeve that prevents and monitors knee osteoarthritis. Built with
**Next.js (App Router) + Tailwind CSS**, ready to deploy on **Vercel**.

See [PROJECT.md](PROJECT.md) for the product summary and [COLORS.md](COLORS.md)
for the locked color palette.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Routes

| Route   | What it is |
|---------|------------|
| `/`     | Marketing landing page (autoplaying hero video, problem, how-it-works, caregiver, comparison, CTA) |
| `/demo` | Interactive companion-app prototype — Today · Move · Sleeve · Family · Settings, plus the screen-time lock → guided exercise → sleeve-verify → unlock flow |

## Hero video

The hero uses an autoplaying, muted, looping video at:

```
public/videos/hero-demo.mp4
```

To swap it, replace that file (keep the name) or update the `src` in
[components/sections/Hero.tsx](components/sections/Hero.tsx). It autoplays
muted + `playsInline` so it works on iOS/Safari.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset auto-detects **Next.js**. No env vars needed. Click **Deploy**.

Or via CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Structure

```
app/
  layout.tsx        Fonts (Figtree + Noto Sans), metadata
  page.tsx          Landing-page section assembly
  demo/page.tsx     Interactive app demo route
  globals.css       Tailwind + base styles + reduced-motion
components/
  sections/         Navbar, Hero (video), StatBar, Problem, HowItWorks,
                    Caregiver, Differentiation, FinalCTA, Footer
  app/              DemoApp shell + AppContext + LockPrompt
    screens/        TodayScreen, MoveScreen, SleeveScreen,
                    CaregiverScreen, SettingsScreen
  ui/               Button, Reveal (scroll animations)
tailwind.config.ts  Locked palette + fonts
```

## Design system

- **Palette (locked):** primary `#D1E2F1`, secondary `#8AB0CD`, text/CTA
  `#394955`, accents `#F5D8E7` & `#BDA1B0`. Demo/CTA buttons use the deep slate
  `#394955` for high contrast (the pastels alone lack an action color).
- **Fonts:** Figtree (headings) + Noto Sans (body) — a healthcare/accessible
  pairing from the UI/UX Pro Max skill.
- **Pattern:** scroll-triggered storytelling (problem → product → caregiver →
  why) with social-proof stat counters.
