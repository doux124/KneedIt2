"use client";

/**
 * Lightweight, autoplaying, muted, looping YouTube demo embed.
 * Uses the privacy-friendly nocookie domain. `controls` off for a clean,
 * in-app feel; the clip just loops as a movement demonstration.
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&mute=1&loop=1&playlist=${id}` +
    `&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-ink/5">
      <iframe
        key={id}
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
      />
    </div>
  );
}
