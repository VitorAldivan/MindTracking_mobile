import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Variantes do card
const variants = {
  checkin: {
    icon: require("@assets/icons/clipboard.png"),
    title: "Check-in\nDiário",
    subtitle: "Um momento para registrar suas emoções",
  },
  athena: {
    icon: require("@assets/icons/logo.png"),
    title: "Conversar\ncom Athena",
    subtitle: "Sua assistente para clareza mental",
  },
};

type Props = {
  variant: keyof typeof variants; // "checkin" ou "athena"
};

export default function FeatureCard({ variant }: Props) {
  const { icon, title, subtitle } = variants[variant];
  const [done, setDone] = useState(false); // controla estado concluído
  const [showModal, setShowModal] = useState(false); // controla modal

  const handlePress = () => {
    if (!done) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setDone(true);
    setShowModal(false);
  };

  return (
    <>
      {/* CARD */}
      <TouchableOpacity
        style={[styles.card, done && styles.cardDone]}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        {/* Conteúdo */}
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <View style={styles.textWrapper}>
          <Text style={[styles.title, done && styles.titleDone]}>{title}</Text>
          <Text style={[styles.subtitle, done && styles.subtitleDone]}>
            {subtitle}
          </Text>
        </View>

        {/* Overlay e ícone de check centralizados */}
        {done && (
          <View style={styles.centralizeContainer}>
            <View style={styles.overlay} />
            <Image
              source={require("@assets/icons/check.png")} // seu PNG
              style={styles.checkIcon}
              resizeMode="contain"
            />
          </View>
        )}
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Seu questionário diário de hoje já foi salvo
            </Text>
            <Text style={styles.modalSubtitle}>
              Athena agradece por você compartilhar como você se sentiu hoje.{"\n"}
              Para manter a clareza de seus insights, cada dia tem um único
              check-in.{"\n"}Um novo dia trará uma nova oportunidade para se
              conectar consigo mesmo(a).
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: height * 0.21,
    backgroundColor: "#29374F",
    borderRadius: 16,
    paddingTop: height * 0.012,
    paddingLeft: width * 0.05,
    marginHorizontal: width * 0.015,
    justifyContent: "space-between",
    overflow: "hidden", // importante para o overlay
  },
  cardDone: {
    borderWidth: 2,
    borderColor: "#16A34A", // verde do contorno
  },
  icon: {
    width: width * 0.1,
    height: height * 0.05,
    marginBottom: height * 0.005,
  },
  textWrapper: {
    maxWidth: 124,
  },
  title: {
    fontSize: height * 0.02,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
    marginBottom: 7,
  },
  titleDone: {
    color: "#fff",
  },
  subtitle: {
    fontSize: height * 0.015,
    color: "#9199AA",
    fontFamily: "Inter_500Medium",
    marginBottom: height * 0.01,
  },
  subtitleDone: {
    color: "#6b7280",
  },

  // Contêiner de centralização
  centralizeContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  // Overlay escuro
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 16,
  },

  // Ícone PNG check
  checkIcon: {
    width: width * 0.12,
    height: height * 0.1,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.02,
  },
  modalContent: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    borderWidth: 2.5,
    borderColor: "#15803D",
  },
  modalTitle: {
    fontSize: width * 0.04,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    marginBottom: height * 0.035,
  },
  modalSubtitle: {
    fontSize: width * 0.038,
    fontFamily: "Inter_500Medium",
    color: "#ffffffff",
    marginBottom: height * 0.03,
    lineHeight: height * 0.028,
  },
  modalButton: {
    backgroundColor: "#15803D",
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontFamily: "Inter_600SemiBold",
  },
});