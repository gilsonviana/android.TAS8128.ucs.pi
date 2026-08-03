import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabInset, Spacing } from "@/constants/theme";
import { GradeFacil } from "@/pages/Jogo/components/GradeFacil";
import { Paddle } from "@/pages/Jogo/components/Paddle";

export const TelaJogo = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const insetStyle = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
  };

  return (
    <View style={{ ...insetStyle, flex: 1, position: "relative" }}>
      <GradeFacil />
      <Paddle />
    </View>
  );
};
