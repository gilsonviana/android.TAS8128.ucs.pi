import { Pressable } from "react-native";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useJogo } from "@/contexts/jogo";

export const TelaPerdeu = () => {
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
      <ThemedView>
        <ThemedText>Não foi dessa vez!</ThemedText>
        <ThemedButton onPress={reIniciarJogo} text="Tentar novamente" />
      </ThemedView>
    </Pressable>
  );
};
