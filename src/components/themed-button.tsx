import { Pressable, type PressableProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export type ThemeButtonProps = PressableProps & {
  text: string;
};

export function ThemedButton({ text, ...otherProps }: ThemeButtonProps) {
  const { Colors, Spacing, FontSizes } = useTheme();

  return (
    <Pressable
      style={[
        {
          backgroundColor: Colors["primaryButtonBackground"],
          paddingVertical: Spacing.three,
          flexDirection: "row",
          borderRadius: Spacing.three,
        },
      ]}
      {...otherProps}
    >
      <ThemedText
        style={{
          color: Colors["primaryButtonTextColor"],
          textAlign: "center",
          flex: 1,
          fontSize: FontSizes.medium,
        }}
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}
