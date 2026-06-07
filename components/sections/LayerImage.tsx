"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type LayerImageProps = {
  src: string;
  alt: string;
  /** 0,1,2 — controls slide direction */
  index: number;
  tintClass: string;
};

export function LayerImage({ src, alt, index, tintClass }: LayerImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set([frame.current, inner.current], { clearProps: "all" });
        return;
      }

      const fromX = index % 2 === 1 ? -40 : 40;

      // Reveal: image rises + uncovers as it enters the viewport
      gsap.from(frame.current, {
        autoAlpha: 0,
        y: 70,
        x: fromX,
        scale: 0.94,
        clipPath: "inset(12% 6% 12% 6% round 2rem)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: frame.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax: inner photo drifts slower than the page for depth
      gsap.fromTo(
        inner.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: frame },
  );

  return (
    <div
      ref={frame}
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-ink/10 ring-1 ring-white/40 will-change-transform"
    >
      {/* Oversized inner wrapper so parallax never reveals edges */}
      <div ref={inner} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
      </div>
      {/* Brand tint to harmonise the photo with the palette */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 mix-blend-soft-light ${tintClass}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 to-transparent"
      />
    </div>
  );
}
