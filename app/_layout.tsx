import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import BottomNavbar from "./components/navbar/navbar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  // Detecta rota atual (expo-router)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isTabsRoute = pathname.includes('(tabs)');

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: { fontFamily: "Inter_500Medium" },
        }}
      >
        <Stack.Screen name="auth/carrosel" />
        <Stack.Screen name="auth/pre-login" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/registro1" />
        <Stack.Screen name="auth/registro2" />
        <Stack.Screen name="auth/welcome" />
      </Stack>
  {/* Navbar só nas rotas (tabs) */}
  {isTabsRoute && <BottomNavbar />}
    </>
  );
}
