import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CardDiario from "../components/cards/cardDiario";

const { width, height } = Dimensions.get("window");
const diariosFake = [
  {
    titulo: "Avanço no Projeto",
    data: "08/10/2025 - 16:31",
    texto: "Finalizei a integração entre React Native e backend simulando cards dinâmicos.",
  },
  {
    titulo: "Reunião com equipe",
    data: "07/10/2025 - 14:20",
    texto: "Discutimos melhorias para o app e definimos próximos passos.",
  },
  {
    titulo: "Estudo de UI/UX",
    data: "06/10/2025 - 09:10",
    texto: "Pesquisei tendências de design para melhorar a experiência do usuário.",
  },
  {
    titulo: "Testes automatizados",
    data: "05/10/2025 - 18:45",
    texto: "Implementei testes unitários para garantir a qualidade do código.",
  },
  // Adicione mais simulações se quiser
];

export default function Diario() {
  const router = useRouter();
  const [diarios, setDiarios] = useState<typeof diariosFake>([]);

  useEffect(() => {
    setTimeout(() => {
      setDiarios(diariosFake);
    }, 700);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: height * 0.1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../../assets/icons/seta.png")}
            style={styles.seta}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.perfilText}>Meus Diários</Text>
        </View>
        <View style={{ width: width * 0.09 }} />
      </View>

      <Text style={styles.titleLarge}>
        Seu refúgio de pensamentos seguros
      </Text>

      {diarios.map((diario, idx) => (
        <CardDiario key={idx} diario={diario} />
      ))}
    </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  seta: {
    width: width * 0.09,
    height: width * 0.08,
    top: height * 0.01,
    tintColor: "#fff",
    resizeMode: "contain",
    marginBottom: height * 0.025,
    transform: [{ rotate: "90deg" }],
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  perfilText: {
    color: "#fff",
    fontSize: Math.max(width * 0.05, 14),
    fontFamily: "Inter_600SemiBold",
  },
  titleLarge: {
    color: "#fff",
    fontSize: Math.max(width * 0.055, 18),
    fontFamily: "Inter_600SemiBold",
    marginBottom: height * 0.025,
  },
});
