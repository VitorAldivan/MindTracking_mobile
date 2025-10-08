import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

type DiarioType = {
  titulo: string;
  data: string;
  texto: string;
};

export default function CardDiario({ diario }: { diario: DiarioType }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{diario.titulo}</Text>
        <Text style={styles.cardDate}>{diario.data}</Text>
      </View>
      <Text style={styles.cardText}>{diario.texto}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Análise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: width * 0.05,
    marginTop: height * 0.01,
    borderWidth: 2.5,
    borderColor: "#2563EA",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: Math.max(width * 0.045, 15),
  },
  cardDate: {
    color: "#D8E9FF",
    fontSize: Math.max(width * 0.032, 12),
    fontFamily: "Inter_400Regular",
  },
  cardText: {
    color: "#fff",
    fontSize: Math.max(width * 0.038, 13),
    fontFamily: "Inter_400Regular",
    marginBottom: height * 0.015,
  },
  button: {
    backgroundColor: "#2563EA",
    borderRadius: 28,
    paddingVertical: height * 0.009,
    alignItems: "center",
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: Math.max(width * 0.033, 13),
    fontFamily: "Inter_500Medium",
    marginLeft: 3,
  },
});
