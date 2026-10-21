type CheckListProps = {
  items: string[];
  className?: string;
  /** Lighter text and pink ticks for use on the deep slate background */
  onDark?: boolean;
};

/** Short bulleted list with a tick in place of each bullet. */
export function CheckList({ items, className = "", onDark = false }: CheckListProps) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg
            className={`mt-0.5 h-5 w-5 flex-none ${onDark ? "text-accent-pink" : "text-secondary"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className={onDark ? "text-white/85" : "text-ink/80"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
