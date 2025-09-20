import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ActionCard from "../components/cards/card1";
import InfoCard from "../components/cards/card2";
import BottomNavbar from "../components/navbar/navbar";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOPO */}
        <View style={styles.header}>
          <View>
            <Text style={styles.day}>Segunda-Feira</Text>
            <Text style={styles.date}>11 de Junho</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>

        {/* PERGUNTA */}
        <Text style={styles.question}>Como você está se sentindo hoje?</Text>

        {/* CARDS DE AÇÃO */}
        <View style={styles.actionRow}>
          <ActionCard variant="checkin" style={styles.actionCard} />
          <ActionCard variant="athena" style={styles.actionCard} />
        </View>

        {/* SEÇÃO DESEJO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que você deseja?</Text>
          <Text style={styles.sectionSubtitle}>
            Opções para melhorar seu dia
          </Text>
        </View>

        {/* INFO CARDS */}
        <View style={styles.infoList}>
          <InfoCard variant="diario" />
          <InfoCard variant="recomendacao" />
          <InfoCard variant="apoio" />
        </View>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollContent: {
    paddingHorizontal: width * 0.065,
    paddingBottom: height * 0.12, // espaço pro navbar
  },

  // TOPO
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.025,
    marginTop: height * 0.10,
  },
  day: {
    fontSize: Math.max(width * 0.05, 14),
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  date: {
    fontSize: Math.max(width * 0.035, 12),
    color: "#9199AA",
    fontFamily: "Inter_600SemiBold",
  },
  avatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 100,
  },

  // PERGUNTA
  question: {
    fontSize: Math.max(width * 0.045, 13),
    color: "#fff",
    marginBottom: height * 0.025,
    fontFamily: "Inter_600SemiBold",
  },

  // CARDS DE AÇÃO
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: width * 0.001, // garante espaço entre os dois
    marginBottom: height * 0.025,
  },
  actionCard: {
    flex: 1, // cada card ocupa metade da largura
  },

  // SEÇÃO DESEJO
  section: {
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: Math.max(width * 0.045, 13),
    color: "#fff",
    marginBottom: height * 0.008,
    fontFamily: "Inter_600SemiBold",
  },
  sectionSubtitle: {
    fontSize: Math.max(width * 0.035, 12),
    marginBottom: height * 0.012,
    color: "#9199AA",
    fontFamily: "Inter_600SemiBold",
  },

  // INFO CARDS
  infoList: {
    gap: height * 0.019,
    marginBottom: height * 0.05,
  },
});
