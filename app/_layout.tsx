import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
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

  // Check token and redirect to tabs/home if present
  const router = useRouter();
  useEffect(() => {
    async function checkToken() {
      try {
        // If questionnaire is pending, force questionario route regardless of token
        try {
          const pending = await AsyncStorage.getItem("questionario_pending");
          if (pending === "true") {
            router.replace("/auth/questionario");
            return;
          }
        } catch (e) {
          // ignore
        }

        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Replace initial route with tabs/home
          router.replace("/(tabs)/home");
        }
      } catch (e) {
        // ignore
      }
    }

    if (fontsLoaded) checkToken();
  }, [fontsLoaded, router]);

  // Setup axios interceptors once: attach token to requests and handle 401 globally
  useEffect(() => {
    const reqId = axios.interceptors.request.use(
      async (config) => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            (config.headers as any) = {
              ...(config.headers || {}),
              Authorization: `Bearer ${token}`,
            };
          }
        } catch (e) {
          // ignore
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        try {
          if (error?.response?.status === 401) {
            await AsyncStorage.removeItem("token");
            // redirect to login screen via router
            router.replace("/auth/login");
          }
        } catch (e) {
          // ignore
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqId);
      axios.interceptors.response.eject(resId);
    };
  }, []);

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
