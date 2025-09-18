// components/BottomNavbar.tsx
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // troque pelos seus ícones

const { width } = Dimensions.get("window");
const NAVBAR_HEIGHT = 60;

type Props = {
  profileImage: string; // URL ou require local da foto de perfil
};

export default function BottomNavbar({ profileImage }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Rotas mapeadas explicitamente
  const tabs = [
    { id: "home", route: "/", icon: <Ionicons name="home-outline" size={24} color="white" /> },
    { id: "notes", route: "/notes", icon: <MaterialIcons name="edit-note" size={26} color="white" /> },
    { id: "mind", route: "/mind", icon: <FontAwesome5 name="brain" size={22} color="white" /> },
    { id: "dashboard", route: "/dashboard", icon: <MaterialIcons name="dashboard" size={24} color="white" /> },
    { id: "profile", route: "/profile", icon: null }, // último é a imagem do usuário
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route)}
          >
            {tab.id === "profile" ? (
              <Image
                source={{ uri: profileImage }}
                style={[styles.profileImage, isActive && styles.activeProfile]}
              />
            ) : (
              tab.icon
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: NAVBAR_HEIGHT,
    backgroundColor: "#0F1A2F",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#1E2B45",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: NAVBAR_HEIGHT,
  },
  activeTab: {
    backgroundColor: "rgba(0,122,255,0.2)", // círculo azul
    borderRadius: 30,
    margin: 5,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  activeProfile: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
});
