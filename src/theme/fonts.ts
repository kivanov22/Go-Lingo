import { fontFamily } from "./typography";

/**
 * Font files to hand to `useFonts` in the root layout.
 *
 * The map key becomes the `fontFamily` string you use everywhere else, so the
 * keys line up with `fontFamily` in `./typography` and the `--font-poppins*`
 * tokens in `global.css`. Loading happens at runtime, so it works in Expo Go
 * and dev clients without a native rebuild.
 */
export const fontAssets = {
  [fontFamily.regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
  [fontFamily.medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
  [fontFamily.semibold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamily.bold]: require("@/assets/fonts/Poppins-Bold.ttf"),
} as const;
