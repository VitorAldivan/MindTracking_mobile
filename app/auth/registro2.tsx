import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import InputBase from "../components/common/input/inputBase";
import BirthDateInput from "../components/common/input/inputData";
import ButtonBase from "../components/common/button/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const API_BASE_URL = "https://mindtracking-api.onrender.com";

function formatDateToIso(date: string) {
  if (!date) return "";
  const parts = date.split("/");
  if (parts.length !== 3) return date;
  const [dia, mes, ano] = parts;
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

export default function RegisterScreen2() {
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log("Params vindos da tela 1:", params);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!nome || !dataNascimento) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    setLoading(true);

    const dataNascIso = formatDateToIso(dataNascimento);

    // Ajusta os nomes dos parâmetros para evitar erros
    const senha = params.senha || params.password || "";
const confirmarSenha = params.confirmarSenha || params.confirmPassword || "";
const email = params.email || "";

if (!senha || !confirmarSenha || !email) {
  setError("Campos de senha e email obrigatórios estão faltando.");
  setLoading(false);
  return;
}
    console.log("Enviando dados para registro:", {
      nome,
      email: params.email,
      senha,
      confirmarSenha,
      data_nascimento: dataNascIso,
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        nome,
        email: params.email,
        senha,
        confirmarSenha,
        data_nascimento: dataNascIso,
      });

      console.log("Resposta registro:", response.data);

      if (response.data && response.data.success) {
        Alert.alert("Sucesso", "Registro realizado com sucesso!");
        router.push("/auth/confirm-code");
      } else {
        setError(response.data.message || "Erro ao salvar perfil");
      }
    } catch (error: any) {
      console.log("Erro no registro:", error, error?.response?.data);
      setError(error.response?.data?.message || "Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Image source={require("../../assets/icons/logo.png")} style={styles.logo} resizeMode="contain" />
        <View style={styles.titulos}>
          <Text style={styles.title}>Estamos quase lá</Text>
          <Text style={styles.subtitle}>Para uma experiência mais pessoal, precisamos de alguns detalhes. Como podemos te chamar?</Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <InputBase placeholder="Digite seu nome" iconLeft="user" value={nome} onChangeText={setNome} />
        <BirthDateInput value={dataNascimento} onChange={setDataNascimento} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.botoes}>
        <ButtonBase title={loading ? "Salvando..." : "Próxima etapa"} onPress={handleNext} disabled={loading} />
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
});
