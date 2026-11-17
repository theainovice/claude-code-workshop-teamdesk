# Spec: Totoro meadow theme

Status: agreed with Audrey in an interview. Built on branch `ghibli-theme`. Build budget: about 20 minutes.

## Goal

Teamdesk looks plain: warm paper, black ink and one terracotta accent. Make it feel like a Studio Ghibli "Totoro meadow": sunny, soft and friendly, with a little Japanese flavour. Looks only. No data, API or behaviour changes.

## Decisions from the interview

| Question | Answer |
| --- | --- |
| Mood | Totoro meadow: fresh greens, sky blue, warm cream |
| How far | Colours plus a few touches (not full illustrations) |
| Touches | Soot sprites, leaf accents, sky header band, gentle motion |
| Dark mode | Becomes "Totoro at night" with the same touches |
| Sprites appear | In the footer and in empty lists |
| Fonts | Soft rounded headings; body text stays DM Sans |
| Japanese text | Small decorative words only; the interface stays English |

## What to build

### 1. Colour palette (`apps/web/src/styles.css`)

Replace the brand tokens at the top of `:root` and the `.light` and `.dark` blocks. Keep the existing token names so no component changes are needed for colour. Starting values (adjust by eye, but keep text contrast at WCAG AA, which the file already cares about):

Light, "meadow day":

- `--background`: warm cream, about `#fbf8ee`
- `--foreground`: deep forest ink, about `#1f2d24`
- `--primary`: meadow green, about `#5f9e5a`, with dark ink as `--primary-foreground`
- `--secondary`, `--muted`, `--accent`: pale sage, about `#e8efd9`
- `--border` and `--input`: soft sage-grey, about `#d6dfc4`
- `--ring`: sky blue, about `#6fb1d6`
- `--destructive`: keep a clear red, slightly warmed
- `--brand-label`: a darker green that passes AA on cream

Dark, "Totoro at night":

- `--background`: deep forest, about `#0f1c1a`
- `--card` and `--popover`: slightly lighter, about `#16272a`
- `--foreground`: moonlit cream, about `#f1ecd8`
- `--primary`: lantern-glow green or warm gold, about `#9fd37f`
- `--ring`: soft starlight blue
- `--border`: dark teal-grey

Also update `--chart-1` to `--chart-5` and the `--sidebar-*` tokens to match, so nothing keeps the old terracotta. Radius goes up a little (`--radius` from `0.75rem` to about `1rem`) for a softer look.

### 2. Fonts

- Replace Newsreader with **Zen Maru Gothic** (rounded, Japanese-inspired) for `--font-heading`. Update the Google Fonts `@import` at the top of `styles.css`.
- Body stays DM Sans.
- Check the Zen Maru Gothic weights load (400 and 500 are enough) and that headings do not shift the layout badly.

### 3. Sky header band

- The header (`apps/web/src/components/header.tsx`) gets a soft gradient background: pale sky blue at the top fading into the page background (light mode); deep teal to midnight (dark mode).
- One simple cloud shape (inline SVG, low contrast) sits in the header corner. Do not use image files.
- The header stays sticky and readable. Nav links keep AA contrast over the gradient.

### 4. Leaf accents

- Replace the small round dot next to the "Teamdesk" name in the header with a leaf icon (inline SVG, in the primary colour).
- Section headings get a small leaf-shaped divider underneath. Do this once as a shared CSS class (for example `.leaf-divider`) and apply it to the page titles, not to every heading.

### 5. Soot sprites

- Make one reusable `SootSprites` component (`apps/web/src/components/soot-sprites.tsx`): small black fuzzballs with two white eyes, as inline SVG. In dark mode they get a faint light rim so they stay visible.
- **Footer** (`footer.tsx`): a small group of three peeks over the top edge of the footer on every page.
- **Empty lists**: one sprite sits above the empty message. Create a small shared `EmptyState` component (a sprite plus the text) and use it in these six places, keeping each existing message:
  - `announcement-list.tsx`: "No announcements yet."
  - `task-list.tsx`: "No tasks yet. Add the first one above."
  - `room-list.tsx`: "No rooms yet."
  - `bookings/BookingList.tsx`: the `emptyText` prop ("Nothing booked yet." and "You have no upcoming bookings.")
  - `routes/notes.tsx`: "No notes yet. Add the first one above."

### 6. Gentle motion

- Cards lift slightly on hover (a 2px rise and a softer shadow).
- The header leaf sways a few degrees, slowly. The footer sprites bob slightly, each out of step.
- All motion is CSS only, and is turned off under `@media (prefers-reduced-motion: reduce)`.

### 7. Small Japanese words

Decorative only. Keep the interface in English.

- Header: `ようこそ` ("welcome") in small text beside or under the Teamdesk name. Hide it on very narrow screens if it crowds the nav.
- Footer: a short line such as `今日もいい一日を` ("have a good day"), with the English meaning as a tooltip (`title`) or visually hidden text.
- Add `lang="ja"` to these elements so screen readers read them correctly.
- Zen Maru Gothic includes Japanese glyphs, so no extra font is needed. If the Google Fonts import only loads Latin, add the Japanese subset.

## Out of scope

- Painted backgrounds or full illustrations on pages.
- Any change to routes, data, tRPC, services or the database.
- Translating the interface.
- Using real Studio Ghibli artwork or characters. The soot sprites, leaf and cloud are simple original drawings in the same spirit.
- The `components/ui` folder (shadcn-generated; Biome skips it and it should not be hand-edited). Get the new look from the tokens.

## Done when

- Light and dark mode both show the new palette, with no leftover terracotta.
- Headings use the rounded font; the page layout does not break at phone width.
- The header gradient and cloud, the leaf, the footer sprites, and the empty-list sprites all show.
- Hover lift and sway work, and stop with reduced motion on.
- The Japanese words show with `lang="ja"`.
- Text contrast is still AA in both modes (check the nav links on the gradient, and muted text).
- `bun run check` and `bun test` both pass.
- Checked by eye in the browser at `bun run dev` (http://localhost:3000), on desktop and phone width, in light and dark mode.

## Suggested build order (about 20 minutes)

1. Palette and radius in `styles.css`, check both modes (5 min).
2. Font swap and header gradient, cloud and leaf (5 min).
3. `SootSprites`, footer, and `EmptyState` in the five lists (6 min).
4. Motion, Japanese words, reduced-motion check, `bun run check` (4 min).

If time runs short, drop in this order: Japanese footer line, leaf dividers, footer sprite bobbing.

---

# Implementation plan

Saved from the approved plan. Three phases.

### Context

Teamdesk is warm paper, black ink and one terracotta accent, and she finds it dull. The spec turns it into a Totoro meadow: green and sky palette, "Totoro at night" dark mode, rounded Japanese-inspired headings, a sky header band, leaf accents, soot sprites in the footer and in empty lists, gentle motion, and two decorative Japanese phrases.

Almost all colour lives in design tokens in `apps/web/src/styles.css`, so components pick up the new palette without edits. Two spots hard-code the old terracotta and need fixing: `.nav-link::after` (`var(--brand-terracotta)`) and `--ring`, `--chart-1`, `--sidebar-primary` (alias it). Headings come from the `.display-title` class, which is the natural hook for the leaf divider.

### Phase 1: Palette, fonts and radius (about 6 min)

File: `apps/web/src/styles.css` only.

- Replace the `--brand-*` tokens and the `.light` / `.dark` blocks with the spec's meadow-day and Totoro-at-night values. Keep every existing token name. Rename the brand tokens to meadow names (for example `--brand-meadow`, `--brand-cream`, `--brand-forest`) and point `.nav-link::after` at the new primary token instead of `--brand-terracotta`.
- Update `--chart-*`, `--sidebar-*`, `--ring`, `--brand-label`. Raise `--radius` from 0.75rem to about 1rem.
- Swap the Google Fonts `@import` from Newsreader to Zen Maru Gothic (weights 400 and 500, Japanese subset included) and set `--font-heading` to it. DM Sans stays for the body. `.display-title` currently sets weight 400 and tight letter spacing; loosen the spacing for the rounded face.
- Do not touch `components/ui` (shadcn, skipped by Biome).

Check: `bun run dev`, look at home, notes and bookings in light and dark. Nothing terracotta is left, and body and muted text pass AA. Fix colours now, before building on them.

### Phase 2: Header, leaf, footer and sprites (about 9 min)

New components (`apps/web/src/components/`):

- `soot-sprites.tsx`: an inline-SVG soot sprite (black fuzzball, two white eyes) taking a count or size prop. In dark mode, give it a faint light rim via a CSS class.
- `empty-state.tsx`: a sprite above a message. Props: `children` (the existing message). Keeps the existing `text-muted-foreground text-sm` styling.
- `leaf-icon.tsx`, or an inline SVG, for the header mark.

Edits:

- `header.tsx`: replace the `h-2.5 w-2.5 rounded-full bg-primary` dot span with the leaf SVG; add `ようこそ` with `lang="ja"` next to the name, hidden below the small breakpoint (`hidden sm:inline`); sky gradient and low-contrast cloud SVG via a `.site-header` class in `styles.css`. Header stays `sticky` and keeps the blur.
- `footer.tsx`: three sprites peeking over the top edge, and the line `今日もいい一日を` with `lang="ja"` and an English `title`. Keep the existing "Your name here" and social links as they are (out of scope).
- Use `EmptyState` in the five empty spots, keeping each message word for word. The spec says "six places" but lists five; the five are:
  - `components/announcement-list.tsx`
  - `components/task-list.tsx`
  - `components/room-list.tsx`
  - `components/bookings/BookingList.tsx` (covers both "Nothing booked yet." and "You have no upcoming bookings.")
  - `routes/notes.tsx` (inline empty message)
- Add `.leaf-divider` in `styles.css` (a small leaf-shaped line under a heading) and apply it to the page `<h1 className="display-title ...">` titles in `routes/*.tsx` with one shared class, not every heading.

Check: sprites visible in light and dark; header text stays readable over the gradient; layout holds at phone width.

### Phase 3: Motion, polish and checks (about 5 min)

- `styles.css`: card hover lift (`.island-shell:hover`, 2px rise and softer shadow), `leaf-sway` and `sprite-bob` keyframes (each sprite with a different `animation-delay`). Wrap all of it so `@media (prefers-reduced-motion: reduce)` turns it off. The file already has a reduced-motion block for `.rise-in`; extend it.
- Final pass on contrast (nav links over the gradient, muted text, both modes).
- Run `bun run check` (Ultracite lint plus typecheck) and `bun test` (should be unaffected). The pre-commit hook needs `bun` on PATH: use `PATH="$HOME/.bun/bin:$PATH"`.
- If time runs short, drop in the spec's order: Japanese footer line, leaf dividers, footer sprite bobbing.

### Verification

1. `bun run dev` (http://localhost:3000). Walk through Home, Notes, Team, Rooms, Bookings, Tasks in light and dark (theme toggle).
2. Empty states: with the seeded demo data some lists are not empty, so check each empty message via a clean list or a temporary empty array in dev, and revert it. Also reset local data by deleting `apps/web/.wrangler` if needed.
3. Phone width (resize the preview to about 375px): no horizontal scroll, nav still wraps, `ようこそ` hides.
4. Reduced motion: turn on "reduce motion" in the OS or emulate it, and confirm nothing moves.
5. `bun run check` and `bun test` pass.
6. Commit locally on a feature branch only after she has looked at it. Push or deploy only when she asks, naming the repo first.

### Open notes

- `apps/web/wrangler.jsonc` already has an uncommitted change of hers. Leave it alone and keep it out of the theme commit.
- Colour values in the spec are starting points; tune by eye in Phase 1.
