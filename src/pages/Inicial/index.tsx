import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset } from "@/constants/theme";
import { useJogo } from "@/contexts/jogo";
import { useTheme } from "@/hooks/use-theme";

export const TelaInicial = () => {
  const { Spacing, FontSizes } = useTheme();
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
    <ThemedView
      style={{
        ...insetStyle,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 280,
          flex: 1,
          gap: 60,
        }}
      >
        <ThemedText
          style={{
            fontSize: FontSizes.title,
            textAlign: "center",
          }}
        >
          Bem-vindo ao Quebra Tijolos
        </ThemedText>
        <View style={{ flex: 1, gap: Spacing.four }}>
          <Link href="/jogo">
            <ThemedButton text="Iniciar Jogo" />
          </Link>
          <Pressable onPress={aumentaNivelDificuldade}>
            <ThemedButton text={`Nivel: ${obtemNomeNivel}`} />
          </Pressable>
          <Link href="/creditos">
            <ThemedButton text="Créditos" />
          </Link>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
});
