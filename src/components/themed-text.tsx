import { Text, type TextProps } from "react-native";

import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  themeColor?: ThemeColor;
};

export function ThemedText({ style, themeColor, ...rest }: ThemedTextProps) {
  const { Colors } = useTheme();

  return (
    <Text style={[{ color: Colors[themeColor ?? "text"] }, style]} {...rest} />
  );
}
