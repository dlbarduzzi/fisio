/**
 * JS mirror of the color tokens in src/styles/global.css.
 *
 * Use ONLY for props that cannot take a className, such as
 * `ActivityIndicator color`, `NativeTabs tintColor`, or an SVG/icon `color`.
 * Everything else must use the NativeWind classes (`bg-primary`, `text-foreground`, ...).
 * When a value changes in global.css, change it here too.
 */
const colors = {
  background: "#ffffff",
  foreground: "#6d5d4b",
  heading: "#54483a",
  card: "#f9f7f6",
  cardForeground: "#6d5d4b",
  muted: "#f9f7f6",
  mutedForeground: "#7a6b5b",
  primary: "#c69963",
  primaryPressed: "#b28451",
  primaryForeground: "#ffffff",
  primaryText: "#8a6840",
  secondary: "#101d2c",
  secondaryPressed: "#1b2b3e",
  secondaryForeground: "#f9f7f6",
  secondaryMuted: "#aaaaaa",
  accent: "#f3ebe0",
  accentForeground: "#54483a",
  border: "#e6dfd7",
  input: "#e6dfd7",
  ring: "#c69963",
  destructive: "#a8402f",
  destructiveForeground: "#ffffff",
  destructiveMuted: "#fbeeeb",
  success: "#4f6b3d",
  successForeground: "#ffffff",
  successMuted: "#eef3ea",
} as const

type ColorToken = keyof typeof colors

export { colors, type ColorToken }
