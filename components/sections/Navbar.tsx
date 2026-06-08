"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { KneeditLogo } from "../brand/KneeditLogo";

const links = [
  { href: "/#problem", label: "The Problem" },
  { href: "/#how", label: "How It Works" },
  { href: "/#caregiver", label: "For Caregivers" },
  { href: "/#why", label: "Why Kneedit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`container-content flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 shadow-md shadow-ink/5 backdrop-blur-md"
            : "bg-white/40 backdrop-blur-sm"
        }`}
        aria-label="Primary"
      >
        <a href="#top" aria-label="Kneedit home" className="flex items-center">
          <KneeditLogo width={132} />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="/demo" size="md">
          Try Demo
        </Button>
      </nav>
    </header>
  );
}
