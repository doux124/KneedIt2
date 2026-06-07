// Kneedit — logo replication
// A stylized "K" mark whose vertical stem doubles as an LED / waveform strip
// (the on-sleeve feedback motif), followed by "NEEDIT" in bold italic condensed
// type. Pale mint on a dark charcoal gradient.
//
// Usage:
//   <KneeditLogo />                       full lockup on dark panel
//   <KneeditLogo showBackdrop={false} />  transparent background
//   <KneeditLogo mark="#bfe9e6" />        recolor

type KneeditLogoProps = {
  width?: number;
  mark?: string;
  background?: string;
  showBackdrop?: boolean;
  className?: string;
};

export function KneeditLogo({
  width = 520,
  mark = "#bfe9e6", // pale mint
  background = "#2b2d31", // charcoal (unused when showBackdrop renders the gradient)
  showBackdrop = true,
  className,
}: KneeditLogoProps) {
  const ratio = 232 / 520; // viewBox aspect
  return (
    <svg
      width={width}
      height={width * ratio}
      viewBox="0 0 520 232"
      role="img"
      aria-label="Kneedit"
      className={className}
      style={{ display: "block" }}
    >
      <title>Kneedit</title>
      <desc>A stylized K with a waveform stem, next to the wordmark NEEDIT.</desc>

      {showBackdrop && (
        <>
          <defs>
            <radialGradient id="kn-bg" cx="38%" cy="42%" r="85%">
              <stop offset="0%" stopColor="#3a3d42" />
              <stop offset="100%" stopColor="#222428" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="520" height="232" rx="6" fill="url(#kn-bg)" />
        </>
      )}

      {/* ---- K mark ---- */}
      {/* vertical stem of the K */}
      <rect x="58" y="58" width="17" height="116" rx="2" fill={mark} />

      {/* upper diagonal of the K */}
      <path d="M126 58 L150 58 L96 116 L82 104 Z" fill={mark} />
      {/* lower diagonal of the K */}
      <path d="M82 128 L96 116 L150 174 L126 174 Z" fill={mark} />

      {/* waveform / LED strip nested in the K's notch */}
      <g fill={mark}>
        <rect x="86" y="110" width="5" height="12" rx="2.5" />
        <rect x="96" y="103" width="5" height="26" rx="2.5" />
        <rect x="106" y="98" width="5" height="36" rx="2.5" />
        <rect x="116" y="106" width="5" height="20" rx="2.5" />
      </g>

      {/* ---- wordmark ---- */}
      <text
        x="182"
        y="160"
        fontFamily="'Arial Narrow', 'Helvetica Neue', Arial, sans-serif"
        fontSize="104"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="2"
        transform="skewX(-10)"
        style={{ transformOrigin: "182px 160px", fontStretch: "condensed" }}
        fill={mark}
      >
        NEEDIT
      </text>
    </svg>
  );
}

export default KneeditLogo;
