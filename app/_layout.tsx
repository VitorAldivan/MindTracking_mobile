import { Stack } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_800ExtraBold,  Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        
        headerTitleStyle: { fontFamily: "Inter_500Medium" },
      }}
    >
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/registro1" />
      <Stack.Screen name="auth/registro2" />
      <Stack.Screen name="auth/welcome" />
    </Stack>
  );
}
