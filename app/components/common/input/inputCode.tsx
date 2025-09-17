// components/VerificationCodeInput.tsx
import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface VerificationCodeInputProps {
  code: string[];
  setCode: (code: string[]) => void;
}

export default function Verification({ code, setCode }: VerificationCodeInputProps) {
  const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs[index + 1].current?.focus();
    }
  };

  return (
    <View style={styles.codeContainer}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          style={styles.codeInput}
          placeholder="0"
          placeholderTextColor="#F7F9FB40"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: width * 0.03,
    marginBottom: height * 0.02,
  },
  codeInput: {
    backgroundColor: "#1F2937", // igual ao InputBase
    borderWidth: 2,
    borderColor: "#2563EA", // azul do InputBase
    borderRadius: 12,
    width: width * 0.18,
    height: width * 0.19,
    textAlign: "center",
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#fff", // texto branco
  },
});
