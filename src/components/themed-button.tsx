import {
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { LinkProps, useRouter } from "expo-router";

export type ThemeButtonProps = PressableProps & {
  text: string;
  href?: LinkProps["href"];
};

export function ThemedButton({ text, href, ...otherProps }: ThemeButtonProps) {
  const { Colors, Spacing, FontSizes } = useTheme();
  const router = useRouter();

  const onPress = (e: GestureResponderEvent) => {
    if (href) {
      router.navigate(href);
      return;
    }
    otherProps?.onPress?.(e);
  };

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
      onPress={onPress}
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
