import { useTheme } from "@/hooks/use-theme";
import { Pressable } from "react-native";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useJogo } from "@/contexts/jogo";

export const TelaPerdeu = () => {
  const { Spacing, FontSizes } = useTheme();
  const { reIniciarJogo } = useJogo();

  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: Spacing.six,
          gap: Spacing.three,
        }}
      >
        <ThemedText style={{ fontSize: FontSizes.medium }}>
          Não foi dessa vez!
        </ThemedText>
        <ThemedButton
          onPress={() => reIniciarJogo(false)}
          text="Tentar novamente"
        />
        <ThemedButton
          onPress={() => reIniciarJogo(true)}
          text="Voltar ao início"
        />
      </ThemedView>
    </Pressable>
  );
};
