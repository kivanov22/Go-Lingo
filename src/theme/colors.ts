/**
 * Lingua colour palette.
 *
 * Source of truth: prompt_material/01-design-system.png
 * Keep these values in sync with the `@theme` block in `global.css`.
 *
 * Use the Tailwind classes (`bg-lingua-purple`, `text-ink`, ...) in components.
 * Reach for this object only where NativeWind can't apply — e.g. `SafeAreaView`,
 * `StatusBar`, navigation options, or values passed to native APIs.
 */
export const colors = {
  /* Primary / brand */
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  /** Primary action colour (alias of `linguaPurple`). */
  primary: "#6C4EF5",

  /* Semantic */
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  /* Neutrals */
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorName = keyof typeof colors;
