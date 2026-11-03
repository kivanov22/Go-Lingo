import type { TextStyle } from "react-native";

import { colors } from "./colors";

/**
 * Poppins font families.
 *
 * The keys match the names registered in `src/theme/fonts.ts` (and therefore
 * the values usable as `fontFamily`). They also match the `--font-poppins*`
 * tokens in `global.css`, exposed as `font-poppins`, `font-poppins-medium`,
 * `font-poppins-semibold` and `font-poppins-bold`.
 */
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

/**
 * Type scale from the design system's TYPOGRAPHY table.
 *
 * `lineHeight` is absolute (px) because React Native does not accept a unitless
 * multiplier: it is `fontSize * ratio` where `ratio` is the design's value.
 *
 * Prefer the matching NativeWind utilities in components:
 *   heading-1 · heading-2 · heading-3 · heading-4
 *   body-large · body-medium · body-small · caption
 * Use this object only where a class can't be applied.
 */
export const typography = {
  /** H1 · Page / Screen title · 32 / Bold / 1.2 */
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.textPrimary,
  },
  /** H2 · Section title · 24 / SemiBold / 1.3 */
  h2: {
    fontFamily: fontFamily.semibold,
    fontSize: 24,
    lineHeight: 31.2,
    color: colors.textPrimary,
  },
  /** H3 · Card / Module title · 20 / SemiBold / 1.3 */
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  /** H4 · Subheading · 16 / Medium / 1.4 */
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: colors.textPrimary,
  },
  /** Body Large · Important content · 16 / Regular / 1.6 */
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.textPrimary,
  },
  /** Body Medium · Body text · 14 / Regular / 1.6 */
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22.4,
    color: colors.textPrimary,
  },
  /** Body Small · Supporting text · 13 / Regular / 1.6 */
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20.8,
    color: colors.textPrimary,
  },
  /** Caption · Labels, meta text · 11 / Regular / 1.4 */
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 15.4,
    color: colors.textSecondary,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
