import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabInset, Spacing } from "@/constants/theme";
import { useJogo } from "@/contexts/jogo";
import { Link } from "expo-router";

export const TelaInicial = () => {
  const { obtemNomeNivel, aumentaNivelDificuldade } = useJogo();
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
    <View style={insetStyle}>
      <Text>Bem-vindo ao Quebra Tijolos</Text>
      <Link href="/jogo">
        <Text>Iniciar Jogo</Text>
      </Link>
      <Pressable onPress={aumentaNivelDificuldade}>
        <Text>Nivel: {obtemNomeNivel}</Text>
      </Pressable>
      <Pressable>
        <Text>Créditos</Text>
      </Pressable>
    </View>
  );
};
