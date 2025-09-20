import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

const { width, height } = Dimensions.get("window");


const TABS = [
  { name: "Home", route: "/home", icon: require("@assets/icons/home.png") },
  { name: "Notes", route: "/notes", icon: require("@assets/icons/Frame.png") },
  { name: "Brain", route: "/auth/login", icon: require("@assets/icons/logo.png") },
  { name: "Grid", route: "/grid", icon: require("@assets/icons/dashboard.png") },
  { name: "Profile", route: "/profile" },
];

type Props = {
  userPhoto?: string;
};

export default function BottomNavbar({ userPhoto }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        const isActive = pathname.startsWith(tab.route); // ✅ corrigido

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route as any)}
          >
            {tab.name === "Profile" ? (
              <Image
                source={
                  userPhoto
                    ? { uri: userPhoto }
                    : require("@assets/icons/perfil.png")
                }
                style={styles.profilePic}
              />
            ) : (
              <Image
  source={tab.icon}
  style={[
    styles.icon,
    isActive && styles.iconActive,
    tab.name === "Brain" && styles.logoIcon, // 👈 tamanho especial só pro logo
  ]}
  resizeMode="contain"
/>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.08,
    flexDirection: "row",
    justifyContent: "space-between", // 👈 agora os cantos ficam fixos
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderTopWidth: height * 0.004,
    borderTopColor: "#2563EA",
    paddingHorizontal: width * 0.06, // 👈 margem fixa da borda
  },
  tab: {
    minWidth: width * 0.12, // 👈 garante largura mínima pro azul
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: "#2563eb",
    paddingHorizontal: width * 0.04, // 👈 o highlight fica maior sem mudar a posição do ícone
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
  },
  logoIcon:{
    width: 47,
    height: 47,
  },

  iconActive: {
    tintColor: "#fff",
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
