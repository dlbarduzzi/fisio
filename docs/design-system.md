# Fisio Design System

The single source of truth for how Fisio looks. Read this before creating or changing any UI.

- **Tokens:** [`src/styles/global.css`](../src/styles/global.css) (`@theme`)
- **JS color mirror:** [`src/styles/tokens.ts`](../src/styles/tokens.ts), only for props that can't take `className`
- **Components:** [`src/components/ui/`](../src/components/ui/)
- **Class merging:** `cn` from the `cn` package (tailwind-merge compatible)
- **Fonts:** [`assets/fonts/`](../assets/fonts/), embedded through the `expo-font` plugin in [`app.json`](../app.json)
- **Live preview (dev only):** open `fisio://design-system` ([`src/app/design-system.tsx`](../src/app/design-system.tsx))

---

## 1. Color tokens

Use the semantic name. Never use raw hex values or Tailwind palette colors (`sky-500`, `neutral-200`) in components.

| Token | Value | Use for |
|---|---|---|
| `background` | `#ffffff` | Screen background |
| `foreground` | `#6d5d4b` | Default body text |
| `heading` | `#54483a` | Headings and emphasized text on light surfaces |
| `card` / `card-foreground` | `#f9f7f6` / `#6d5d4b` | Card and section surfaces |
| `muted` / `muted-foreground` | `#f9f7f6` / `#7a6b5b` | Subtle surfaces; helper, meta and caption text |
| `primary` | `#c69963` | Main actions, brand accents, icons, selected borders |
| `primary-pressed` | `#b28451` | Pressed state of `primary` |
| `primary-foreground` | `#ffffff` | Text and icons on `primary` |
| `primary-text` | `#8a6840` | Gold **text** on light surfaces (eyebrows, links, tab tint) |
| `secondary` | `#101d2c` | Dark (navy) sections, secondary actions, tags |
| `secondary-pressed` | `#1b2b3e` | Pressed state of `secondary` |
| `secondary-foreground` | `#f9f7f6` | Text on `secondary` |
| `secondary-muted` | `#aaaaaa` | Muted text and rules **on navy only** |
| `accent` / `accent-foreground` | `#f3ebe0` / `#54483a` | Selected/pressed surfaces on light backgrounds |
| `border` | `#e6dfd7` | Dividers, outlines |
| `input` | `#e6dfd7` | Input borders |
| `ring` | `#c69963` | Focus indication |
| `destructive` (+ `-foreground`, `-muted`) | `#a8402f` / `#fff` / `#fbeeeb` | Errors, destructive actions |
| `success` (+ `-foreground`, `-muted`) | `#4f6b3d` / `#fff` / `#eef3ea` | Positive status |

### Color rules

1. **Pairs go together.** On a `bg-X` surface, use `text-X-foreground`.
2. **Gold as text** on light backgrounds is always `text-primary-text`, never `text-primary`. `text-primary` is fine on navy.
3. **Navy surfaces:** headings use `text-secondary-foreground`, supporting text `text-secondary-muted`, rules `bg-secondary-muted`.
4. **Opacity modifiers** are fine for overlays: `bg-secondary/93`, `active:bg-secondary-foreground/5`.
5. Need a color in a non-`className` prop? Import it from `@/styles/tokens`. If you change a color, update **both** `global.css` and `tokens.ts`.
6. **Light mode only** for now (`userInterfaceStyle: "light"`). When dark mode arrives, add values under `@media (prefers-color-scheme: dark)` in `global.css`. Component code shouldn't need to change.

---

## 2. Typography

| Family | Class | Weights embedded | Role |
|---|---|---|---|
| Geist | `font-sans` (default in `Text`) | 300, 400, 500, 600, 700 | Body, UI, data |
| Josefin Sans | `font-display` | 400, 400 italic, 600 | Headings, buttons, eyebrow labels |

Use the `Text` component's `variant`. Don't assemble type styles by hand.

| Variant | Spec | Use |
|---|---|---|
| `display` | `text-4xl` · Josefin 400 · 36/40 · `heading` | Hero statements, one per screen at most |
| `h1` | `text-3xl` · Josefin 400 *italic* · 32/36 | Screen titles, pull quotes |
| `h2` | `text-2xl` · Josefin 400 · 24/30 | Section titles |
| `h3` | `text-xl` · Josefin 400 · 18/24 | Card titles, list item names |
| `eyebrow` | `text-sm` · Josefin 400 · 14/22 · UPPERCASE · `primary-text` | Short label above a heading |
| `lead` | `text-lg` · Geist 300 · 17/27 | Intro paragraph under a title |
| `default` | `text-base` · Geist 400 · 16/26 | Body text |
| `small` | `text-sm` · Geist 400 · 14/22 | Secondary details |
| `muted` | `text-sm` · Geist 400 · 14/22 · `muted-foreground` | Helper text, meta |
| `caption` | `text-xs` · Geist 400 · 12/16 · `muted-foreground` | Fine print, specs |

The size scale reuses Tailwind's names with Fisio values: `text-xs` 12, `text-sm` 14, `text-md` 15 (button labels), `text-base` 16, `text-lg` 17, `text-xl` 18, `text-2xl` 24, `text-3xl` 32, `text-4xl` 36. Sizes from `text-5xl` up are Tailwind defaults and aren't part of the system. Weights use the standard classes (`font-medium`, `font-semibold`). Use `italic` for Josefin italic.

**Rules**
- Josefin Sans only at 400 or 600, and only for short text. Never use it for paragraphs.
- Headings carry `role="heading"` and `aria-level` automatically via the variant.
- Body line height is about 1.6. Don't tighten paragraph leading.
- No letter-spacing tokens.
- Custom fonts don't appear in raw `react-native` `<Text>`. Always use `@/components/ui/text`.

---

## 3. Spacing & layout

Tailwind's 4dp scale is the spacing system: **1 unit = 4dp** (`p-4` = 16dp). This holds because `global.css` pins `:root { font-size: 16px }`. react-native-css would otherwise treat `1rem` as 14px on native.

| Purpose | Class | dp |
|---|---|---|
| Screen gutter | `px-6` | 24 |
| Tight stack (label → field, title → subtitle) | `gap-1.5` / `gap-2` | 6 / 8 |
| Related items in a group | `gap-3` / `gap-4` | 12 / 16 |
| Card padding | `p-5` | 20 |
| Between groups | `gap-5` / `gap-7.5` | 20 / 30 |
| Between sections | `gap-10` / `py-10` | 40 |
| Hero / major break | `gap-20` | 80 |

**Layout rules**
- Lay out with flex and `gap-*`, not margins between siblings.
- Screens: `ScrollView` with `className="flex-1 bg-background"`, padding in `contentContainerClassName`, and safe-area insets via `useSafeAreaInsets` or `contentInsetAdjustmentBehavior="automatic"`.
- Prefer one strong heading per screen, generous whitespace, and dark navy blocks for emphasis.
- Touch targets are at least 44dp (iOS) / 48dp (Android). The default `Button` is 48dp tall.

---

## 4. Radius & shadow

| Token | Value | Use |
|---|---|---|
| `rounded-lg` | 8dp | **Default** for buttons, cards, inputs, selectable tiles, image containers |
| `rounded-sm` / `rounded-md` | 4 / 6dp | Small inner elements (thumbnails inside a card) |
| `rounded-full` | pill / circle | Avatars, badges, status dots |
| `rounded-none` | 0 | Elements flush with a rounded parent's edge (e.g. a footer button inside a card with `overflow-hidden`) |

| Shadow | Value | Use |
|---|---|---|
| `shadow-sm` | `0 2 8 rgb(0 0 0 / .06)` | Subtle lift (derived) |
| `shadow-md` | `0 20 50 rgb(0 0 0 / .10)` | Elevated cards |
| `shadow-lg` | `0 20 50 rgb(0 0 0 / .20)` | Floating, overlapping content |

The style is mostly flat. Prefer `bg-card` or a border over shadows, and use at most one shadow level per screen. Shadows render through React Native's `boxShadow` (iOS and Android 9+). The lint rule `expo/prefer-box-shadow` forbids the legacy `shadow*` props. Don't combine a shadow with `overflow-hidden` on the same view: wrap instead.

---

## 5. NativeWind conventions

- **NativeWind 5 (rc) + Tailwind 4, configured only in CSS.** There is no `tailwind.config.js`. New tokens go in the `@theme` block of `global.css`.
- **`className` first.** Use `style` only for runtime values (safe-area insets, measured sizes, animations). Inline style objects are blocked by lint.
- **Merge classes with `cn`** (`import { cn } from "cn"`). It follows tailwind-merge rules: the later class wins within a group, and only known size names (`xs`…`9xl`, `base`, `md`) count as font sizes. That's why the type scale uses Tailwind names: a custom name like `text-body` would be read as a color and dropped when merged with `text-foreground`.
- **No arbitrary values** (`text-[15px]`, `bg-[#fff]`) in product code when a token exists. If you need one repeatedly, add a token.
- **Adding a type token:** write `--text-NAME--line-height` as a unitless ratio (`calc(26 / 16)`), never `26px`. react-native-css treats the value as a multiplier, so `26px` would become 26 × font size. Prefer adjusting an existing scale step over adding one. If you must add one, use a Tailwind size name (`--text-2xs`, `--text-5xl`…), never a semantic or color-like name, or `cn` will drop it.
- **Class names must be static strings.** Tailwind scans source text, so `"bg-" + color` won't be generated. Map variants to full literal class strings.
- **State variants:** `active:` (pressed, on `Pressable`), `focus:` (on `TextInput`), `disabled:` (reads the `disabled` prop), `placeholder:` (→ `placeholderTextColor`).
- **Platform variants:** `ios:`, `android:`, `native:`, `web:`. Android-only extras: `elevation-*`, `ripple-*`.
- **Props that need a color value** (`ActivityIndicator color`, icon `color`, `NativeTabs tintColor`) use `colors` from `@/styles/tokens`.

---

## 6. Component architecture

Components follow the shadcn/ui *pattern* (owned code, `cva` variants, composition), built on React Native primitives. **No UI libraries.**

```
src/components/ui/
  text.tsx       Text + TextClassContext (typography variants)
  button.tsx     Button (variant × size, pressed/disabled/loading)
  card.tsx       Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
  input.tsx      Input (focus / invalid / disabled)
  badge.tsx      Badge (status pills)
  separator.tsx  Separator (1dp rule, horizontal/vertical)
```

### Anatomy of a component

```tsx
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cva } from "class-variance-authority"
import { View } from "react-native"

import { cn } from "cn"

const thingVariants = cva("rounded-lg", { // 1. base classes = tokens only
  variants: {
    variant: { default: "bg-card", outline: "border border-border" },
    size: { default: "p-5", sm: "p-3" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ThingProps = ComponentProps<typeof View> // 2. extend the primitive's props
  & RefAttributes<typeof View>
  & VariantProps<typeof thingVariants>

function Thing({ variant, size, className, ...props }: ThingProps) {
  return (
    <View
      className={cn(thingVariants({ variant, size }), className)} // 3. caller's className last
      {...props} // 4. forward everything
    />
  )
}

export { Thing, thingVariants } // 5. export variants for reuse
export type { ThingProps }
```

### Patterns

- **Text styling from a parent:** wrap children in `TextClassContext` (see `Button`, `Badge`). Child `<Text>` picks up those classes, so callers write `<Button><Text>Save</Text></Button>`.
- **Composition over props:** build compound parts (`Card*`) instead of large prop APIs (`title=`, `footer=`).
- **Customization:** `className` is the escape hatch for layout (`self-start`, `w-full`, `mt-4`). Don't use it to restyle a variant's colors. Add a variant instead.
- **Accessibility:** set `role` (`button`, `link`, `radio`, `heading`), `aria-disabled`, `aria-busy`, `aria-checked`, and an `aria-label` for icon-only controls.
- **State:** pressed → `active:`; disabled → `disabled:opacity-50` plus the `disabled` prop; loading → the `loading` prop (spinner, blocks presses); selected → `bg-accent border-primary`; invalid → `border-destructive`.
- **Variants available today:**
  - `Button`: `default | secondary | outline | ghost | destructive | link` × `sm | default | lg | icon`
  - `Card`: `default | outline | elevated`
  - `Badge`: `default | secondary | outline | success | destructive`

---

## 7. Platform considerations

- **Fonts are embedded at build time** with the `expo-font` config plugin. Adding or changing font files requires a new dev build (`npx expo run:ios|android` or EAS). They don't load in Expo Go, and the web target falls back to system fonts.
- **Font weights resolve natively:** iOS groups the files by their typographic family name; Android uses a generated XML font family. So `font-sans font-semibold` works with a single family name on both platforms. Only use weights that are embedded (see §3). Other weights fall back to the nearest one.
- **Text clipping:** keep line height at or above the font size. Josefin's tall ascenders clip at `line-height: 1` on Android.
- **Optical centering of Josefin caps:** Josefin Sans draws capitals about 0.1em above the center of its line box (ascender 750 ≈ cap height 702, descender 250). iOS and Android both center that box when a line height is set. Any all-caps Josefin label centered in a fixed-height control (buttons, chips, tabs) must add `display-caps-center` (`translateY(0.1em)`, defined in `global.css`). Don't use it on mixed-case or Geist text.
- **TextInput:** `Input` uses `text-[16px]` (an arbitrary value, on purpose) so no line height is set. iOS misaligns `TextInput` text when one is set.
- **Shadows:** `boxShadow` needs Android 9+ and the New Architecture (the default on SDK 58). Use `elevation-*` only if an Android-specific tweak is needed.
- **Pressed feedback:** iOS has no ripple. Use `active:` backgrounds on both platforms. `android:ripple-*` is an optional extra.
- **Native chrome:** the tab bar and stack headers are native. Tint them with values from `@/styles/tokens`, and don't try to restyle them with classes.

---

## 8. Creating a new component

1. Check whether an existing component plus a new **variant** covers it.
2. Build on RN primitives (`View`, `Text`, `Pressable`, `TextInput`) or existing `ui/` components.
3. Use only tokens. If a value is missing, add it to `@theme` in `global.css` (and `tokens.ts` / `cn.ts` if relevant) and document it here.
4. Follow the anatomy in §7: `cva`, extend the primitive's props, caller `className` last, export variants and props.
5. Cover pressed, disabled, focus, loading and selected where they apply. Keep touch targets ≥ 44dp.
6. Add it to the dev preview (`src/dev/design-system-preview.tsx`) while that screen exists, and list it in §7.
7. Run `npm run check`.
