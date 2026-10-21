# Kneedit — Landing Site + App Demo

Marketing site and interactive companion-app prototype for **Kneedit**, a smart
knee sleeve and app that helps seniors with knee osteoarthritis keep up their
physio exercises. Built with
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
| `/`     | Marketing landing page (hero video, stats, problem, how it works, for families, for physios, comparison, pricing, safety note, CTA) |
| `/demo` | Interactive companion-app prototype: Today, Move, Sleeve, Friends, Care (family and physio views) and Profile, plus the guided session: video, live form score, two-tap feedback, sleeve check, streak and leaderboard |

## Progress & leaderboard

The behavioural layer is a friends leaderboard ranked by completion, not volume.
The model lives in [components/app/progress.ts](components/app/progress.ts):

- The sleeve scores form out of 10 on every exercise. A session's score is the
  average across its exercises (`sessionScore`).
- After each exercise the user answers two taps, "Did it hurt?" and "Was it
  easy?". Both feed the family report and the physio's visit summary.
- One session a day is prescribed (`SESSIONS_PER_WEEK`). `completionRate` turns
  sessions done into this week's percentage, and extra sessions never count.
- `buildLeaderboard` ranks friends by completion rate, then streak.
- A session stopped early is kept but marked incomplete, so it moves neither
  the streak nor the week.
- The week, streak, friends, requests, the Care view and the family's notes for
  the physio all live in `AppContext`. Finishing a session calls
  `logSession(session)`, which updates the streak and re-ranks the table live.
- Friends are seeded in `progress.ts` (`SEED_FRIENDS`, `SEED_REQUESTS`,
  `SUGGESTED_FRIENDS`). Adding one via the sheet reshuffles the standings.

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
                    Families, Physios, Differentiation, Pricing, SafetyNote,
                    FinalCTA, Footer, contact.ts (clinic pilot email)
  app/              DemoApp shell + AppContext + AddFriendSheet + CareSwitch
                    + progress.ts
    screens/        TodayScreen, MoveScreen, SleeveScreen, LeaderboardScreen,
                    CaregiverScreen (family report), PhysioScreen, SettingsScreen
  ui/               Button, CheckList, Reveal (scroll animations)
tailwind.config.ts  Locked palette + fonts
```

## Design system

- **Palette (locked):** primary `#D1E2F1`, secondary `#8AB0CD`, text/CTA
  `#394955`, accents `#F5D8E7` & `#BDA1B0`. Demo/CTA buttons use the deep slate
  `#394955` for high contrast (the pastels alone lack an action color).
- **Fonts:** Figtree (headings) + Noto Sans (body) — a healthcare/accessible
  pairing from the UI/UX Pro Max skill.
- **Pattern:** scroll-triggered storytelling (problem → product → families →
  physios → why → pricing) with sourced stat counters that link to their papers.
