interface SootSpriteProps {
  className?: string;
  size?: number;
}

const DEFAULT_SIZE = 28;
const SPRITE_COUNT = 3;
const SPRITE_KEYS = ["a", "b", "c"] as const;

/** One soot sprite: a black fuzzball with two white eyes. */
export function SootSprite({
  className = "",
  size = DEFAULT_SIZE,
}: SootSpriteProps) {
  return (
    <svg
      aria-hidden="true"
      className={`soot-sprite ${className}`}
      height={size}
      viewBox="0 0 32 32"
      width={size}
    >
      <path
        d="M16 2v6M16 24v6M2 16h6M24 16h6M6 6l4 4M22 22l4 4M26 6l-4 4M10 22l-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" fill="currentColor" r="10" />
      <circle cx="12.5" cy="15" fill="#fff" r="2.8" />
      <circle cx="19.5" cy="15" fill="#fff" r="2.8" />
      <circle cx="13" cy="15.4" fill="#16201b" r="1.2" />
      <circle cx="20" cy="15.4" fill="#16201b" r="1.2" />
    </svg>
  );
}

/** A small group of sprites that bob out of step with each other. */
export default function SootSprites({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`flex items-end gap-2 ${className}`}>
      {SPRITE_KEYS.slice(0, SPRITE_COUNT).map((key) => (
        <SootSprite className="sprite-bob" key={key} />
      ))}
    </div>
  );
}
