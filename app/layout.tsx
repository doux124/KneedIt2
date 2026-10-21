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

const title = "Kneedit: keep up your knee exercises at home";
const description =
  "A smart knee sleeve and app that helps seniors with knee osteoarthritis keep up their physio exercises, and shows their family and physiotherapist.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "smart knee sleeve",
    "knee osteoarthritis",
    "home exercise programme",
    "physiotherapy",
    "elderly care",
    "Singapore",
    "caregiver",
  ],
  openGraph: {
    title,
    description,
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
