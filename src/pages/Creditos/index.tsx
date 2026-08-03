import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export const TelaCreditos = () => {
  const router = useRouter();
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
      <ThemedView>
        <ThemedText>Fernando Pimmel</ThemedText>
        <ThemedText>Fernando Flores</ThemedText>
        <ThemedText>Gilson Viana</ThemedText>
        <ThemedText>Isaac Linck</ThemedText>
        <ThemedText>Lucas Trentin</ThemedText>
      </ThemedView>
    </Pressable>
  );
};
