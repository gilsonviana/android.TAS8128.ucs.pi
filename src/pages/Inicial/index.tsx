import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { useJogo } from "@/contexts/jogo";

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
    <ThemedView style={{ ...insetStyle, flex: 1 }}>
      <ThemedText>Bem-vindo ao Quebra Tijolos</ThemedText>
      <Link href="/jogo">
        <ThemedText>Iniciar Jogo</ThemedText>
      </Link>
      <Pressable onPress={aumentaNivelDificuldade}>
        <ThemedText>Nivel: {obtemNomeNivel}</ThemedText>
      </Pressable>
      <Link href="/creditos">
        <ThemedText>Créditos</ThemedText>
      </Link>
    </ThemedView>
  );
};
