import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { HoldMenuProvider } from "react-native-hold-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";
import TabBar from "./components/tab-bar/TabBar";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Lexend-Black": require("../assets/fonts/Lexend-Black.ttf"),
    "Lexend-Bold": require("../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("../assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-ExtraLight": require("../assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("../assets/fonts/Lexend-Light.ttf"),
    "Lexend-Medium": require("../assets/fonts/Lexend-Medium.ttf"),
    "Lexend-Regular": require("../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("../assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Thin": require("../assets/fonts/Lexend-Thin.ttf"),
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-background">
      <HoldMenuProvider safeAreaInsets={insets}>
        <Stack
          screenOptions={{
            animation: "slide_from_right", // This ensures consistent animation across platforms
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="habits/edit/[id]"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="habits/add"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <TabBar />
      </HoldMenuProvider>
    </View>
  );
}
