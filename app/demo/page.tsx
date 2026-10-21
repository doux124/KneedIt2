import type { Metadata } from "next";
import { DemoApp } from "@/components/app/DemoApp";

export const metadata: Metadata = {
  title: "Try the Kneedit App: Interactive Demo",
  description:
    "Step through the Kneedit companion app: guided knee exercises scored on form, the friends leaderboard, live sleeve verification, and the caregiver dashboard. Interactive prototype.",
};

export default function DemoPage() {
  return <DemoApp />;
}
