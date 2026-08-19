import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ContextJogo } from "@/contexts/jogo";
import { ContextJogoFisica } from "@/contexts/jogoFisica";

// SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ContextJogoFisica>
          <ContextJogo>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="jogo" />
              <Stack.Screen
                name="creditos"
                options={{
                  headerShown: false,
                  presentation: "transparentModal",
                  animation: "fade",
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="ganhou"
                options={{
                  headerShown: false,
                  presentation: "transparentModal",
                  animation: "fade",
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="perdeu"
                options={{
                  headerShown: false,
                  presentation: "transparentModal",
                  animation: "fade",
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
            </Stack>
          </ContextJogo>
        </ContextJogoFisica>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
