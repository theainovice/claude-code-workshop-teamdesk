import type { ReactNode } from "react";
import { SootSprite } from "./soot-sprites";

/** A friendly empty list: one soot sprite above the message. */
export default function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <SootSprite className="sprite-bob" size={36} />
      <p className="m-0 text-muted-foreground text-sm">{children}</p>
    </div>
  );
}
