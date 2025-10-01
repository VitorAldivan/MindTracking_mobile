import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function Perfil() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} >
          <Image
            source={require("../../assets/icons/seta.png")}
            style={styles.seta}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.perfilText}>Perfil</Text>
        </View>
        {/* Espaço vazio para balancear a seta */}
        <View style={{ width: width * 0.09 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.06,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  seta: {
    width: width * 0.09,
    height: width * 0.08,
    tintColor: "#fff",
    resizeMode: "contain",
    marginBottom: height * 0.025,
    transform: [{ rotate: "90deg" }],
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  perfilText: {
    color: '#fff',
    fontSize: Math.max(width * 0.05, 14),
    fontFamily: "Inter_600SemiBold",
  },
});
