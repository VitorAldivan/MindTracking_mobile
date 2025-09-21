// components/SuggestionButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

type Props = {
  text: string;
  onPress?: () => void;
};

export default function SuggestionButton({ text, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.65, // largura responsiva
    height: height * 0.055, // altura responsiva
    borderRadius: height * 0.03, // bem arredondado
    backgroundColor: "#0F172A",
    borderWidth: 1.5,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.02,

    // glow azul
    shadowColor: "#3B82F6",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8, // Android
  },
  text: {
    fontSize: height * 0.016,
    color: "#fff",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    paddingHorizontal: width * 0.03, // pra frases longas não colarem na borda
  },
});
