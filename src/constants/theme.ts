import { Platform } from "react-native";

const ColorTokens = {
  white: "#ffffff",
  "off-white": "#D9D9D9",
  "deep-plum": "#1C1530",
  ink: "#231A33",
} as const;

export const Colors = {
  text: ColorTokens.white,
  background: ColorTokens["deep-plum"],
  backgroundElement: "#212225",
  backgroundSelected: "#2E3135",
  textSecondary: "#B0B4BA",
  primaryButtonBackground: ColorTokens["off-white"],
  primaryButtonTextColor: ColorTokens.ink,
} as const;

export const FontSizes = {
  medium: 20,
  title: 32,
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
