import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import InputBase from "../components/common/input/inputBase";
import BirthDateInput from "../components/common/input/inputData";
import InputGender from "../components/common/input/inputGenero";
import PhoneInput from "../components/common/input/inputPhone";
import ButtonBase from "../components/common/button/button";


import { useRouter } from "expo-router";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  // estados da senha
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setError("");
    
    router.push("/auth/registro1");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.titulos}>
          <Text style={styles.title}>Estamos quase lá</Text>
          <Text style={styles.subtitle}>
            Para uma experiência mais pessoal, precisamos de alguns detalhes. Como podemos te chamar?
          </Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <InputBase
          placeholder="Digite seu nome"
          iconLeft="user"
        />

        <BirthDateInput />
        <PhoneInput />
        <InputGender />


       

       
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.botoes}>
        <ButtonBase title="Próxima etapa" onPress={() => router.push("/auth/confirm-code")} />

     
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.06,
    justifyContent: "center",
  },
  logo: {
    width: width * 0.22,
    height: height * 0.08,
  },
  inputs: {
    justifyContent: "flex-start",
  },
  topo: {
    gap: height * 0.05,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  titulos: {
    gap: height * 0.008,
  },
  botoes: {
    marginBottom: height * 0.01,
    gap: height * 0.001,
    paddingTop: 15,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter_500Medium",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: height * 0.03,
    fontFamily: "Inter_600SemiBold",
  },
  errorText: {
    color: "red",
    fontSize: width * 0.035,
    marginTop: 5,
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#3a3a3aff",
  },
  orText: {
    marginHorizontal: width * 0.08,
    color: "#ffffffff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: width * 0.04,
  },
});
