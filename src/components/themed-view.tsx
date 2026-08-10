import { View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { Colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: Colors["background"] }, style]}
      {...otherProps}
    />
  );
}
