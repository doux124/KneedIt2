import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kneedit — Smart Knee Sleeve that Prevents Osteoarthritis",
  description:
    "Kneedit is a clinical-grade smart knee sleeve and companion app that turns everyday wear into passive joint care — preventing and monitoring knee osteoarthritis for elderly users, with a caregiver dashboard for family.",
  keywords: [
    "smart knee sleeve",
    "osteoarthritis prevention",
    "wearable health",
    "elderly care",
    "Singapore",
    "caregiver dashboard",
  ],
  openGraph: {
    title: "Kneedit — Prevent Knee Osteoarthritis Before It Starts",
    description:
      "A smart knee sleeve + free companion app that turns screen time into guided, sleeve-verified exercise. Clinical-grade monitoring, built for elderly users and their caregivers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${notoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
