import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

const nomes = [
  "Fernando Pimmel",
  "Fernando Flores",
  "Gilson Viana",
  "Isaac Linck",
  "Lucas Trentin",
];

export const TelaCreditos = () => {
  const router = useRouter();
  const { Colors, Spacing, FontSizes } = useTheme();

  return (
    <Pressable
      onPress={() => router.back()}
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedView
        style={{
          gap: FontSizes.medium,
          padding: Spacing.six,
          backgroundColor: Colors.lightBackground,
          borderRadius: Spacing.three,
        }}
      >
        {nomes.map((nome) => (
          <ThemedText key={nome} style={{ fontSize: FontSizes.medium }}>
            {nome}
          </ThemedText>
        ))}
      </ThemedView>
    </Pressable>
  );
};
