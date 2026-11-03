/**
 * Lingua design tokens.
 *
 * The CSS side of these tokens lives in `global.css` — use NativeWind classes
 * (`bg-lingua-purple`, `heading-1`, `rounded-card`, ...) in components by
 * default. Import from here only for the cases NativeWind can't reach: values
 * passed to native props / APIs (`SafeAreaView`, `StatusBar`, navigation
 * options), animations, or font loading.
 */
export { colors } from "./colors";
export type { ColorName } from "./colors";

export { fontFamily, typography } from "./typography";
export type { TypographyVariant } from "./typography";

export { radius } from "./radius";

export { fontAssets } from "./fonts";
