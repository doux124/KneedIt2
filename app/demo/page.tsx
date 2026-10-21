import type { Metadata } from "next";
import { DemoApp } from "@/components/app/DemoApp";

export const metadata: Metadata = {
  title: "Try the Kneedit App: Interactive Demo",
  description:
    "Step through the Kneedit companion app: today's plan, a guided session with a form score and two-tap feedback, streaks and the friends leaderboard, the family weekly report and the physio view. Interactive prototype.",
};

export default function DemoPage() {
  return <DemoApp />;
}
