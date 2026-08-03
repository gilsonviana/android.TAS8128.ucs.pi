import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { ContextJogo } from "@/contexts/jogo";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
              presentation: "transparentModal",
            }}
          />
        </Stack>
      </ContextJogo>
    </ThemeProvider>
  );
}
