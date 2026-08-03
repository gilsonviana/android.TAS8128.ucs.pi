import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ContextJogo } from "@/contexts/jogo";
import { ContextJogoFisica } from "@/contexts/jogoFisica";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ContextJogo>
          <ContextJogoFisica>
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
                  presentation: "transparentModal",
                }}
              />
            </Stack>
          </ContextJogoFisica>
        </ContextJogo>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
