import { useState } from "react";
import { Alert } from "react-native";
import InputBase from "./inputBase";

export default function BirthDateInput() {
  const [birthDate, setBirthDate] = useState("");

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, ""); // só números
    let formatted = digits;

    if (digits.length > 2 && digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }

    return formatted;
  };

  const validateAge = (dateString: string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    if (!day || !month || !year) return false;

    const today = new Date();
    const birth = new Date(year, month - 1, day);

    // diferença em anos
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 12;
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^\d/]/g, ""); // sem letras/emoji
    const formatted = formatDate(cleaned);
    setBirthDate(formatted);
  };

  const handleBlur = () => {
    if (birthDate.length === 10 && !validateAge(birthDate)) {
      Alert.alert("Idade inválida", "Você precisa ter pelo menos 12 anos.");
      setBirthDate("");
    }
  };

  return (
    <InputBase
      placeholder="DD/MM/AAAA"
      keyboardType="numeric"
      value={birthDate}
      onChangeText={handleChange}
      onBlur={handleBlur}
      maxLength={10} // formato fixo DD/MM/AAAA
      iconLeft="user"
    />
  );
}
