/** A small leaf for the header mark. Takes its colour from the text colour. */
export default function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`leaf-sway ${className}`}
      height="22"
      viewBox="0 0 24 24"
      width="22"
    >
      <path d="M3 21C3 11 9 3 21 3c0 12-7 18-18 18z" fill="currentColor" />
      <path
        d="M3 21L14 10"
        fill="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        style={{ stroke: "var(--background)" }}
      />
    </svg>
  );
}
