import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import ButtonBase from "../components/common/button/button";
import InputBase from "../components/common/input/inputBase";
import BirthDateInput from "../components/common/input/inputData";
import InputGender from "../components/common/input/inputGenero";
import PhoneInput from "../components/common/input/inputPhone";

const { width, height } = Dimensions.get("window");
const API_BASE_URL = "http://44.220.11.145";

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
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!nome || !dataNascimento || !telefone || !genero) {
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
    // sanitize / trim inputs
    const nomeTrim = nome.trim();
  const generoTrim = genero.trim();
  // map frontend labels to backend expected values
  let generoMapped = generoTrim;
  const g = generoTrim.toLowerCase();
  if (g === "masculino") generoMapped = "homem";
  else if (g === "feminino") generoMapped = "mulher";
  else if (g === "outro") generoMapped = "outro";
    const telefoneSanitized = telefone.replace(/[^0-9+]/g, "").trim();

    console.log("Enviando dados para registro:", {
      nome: nomeTrim,
      email: String(params.email).trim(),
      senha,
      confirmarSenha,
      data_nascimento: dataNascIso,
      telefone: telefoneSanitized,
      genero: generoMapped,
    });

    try {
        const payload = {
          nome: nomeTrim,
          email: String(params.email).trim(),
          senha,
          confirmarSenha,
          data_nascimento: dataNascIso,
          genero: generoMapped,
          telefone: telefoneSanitized,
        };

        console.log("Payload enviado para registro:", JSON.stringify(payload, null, 2));

        const response = await axios.post(`${API_BASE_URL}/auth/register`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000,
        });

        console.log("Resposta registro status:", response.status);
        console.log("Resposta registro headers:", response.headers);
        console.log("Resposta registro data:", response.data);

        if (response.data && response.data.success) {
          // salvar nome e email no AsyncStorage e marcar questionario pendente
          try {
            await AsyncStorage.setItem("email", String(params.email || ""));
            await AsyncStorage.setItem("nome", String(nome || ""));
            await AsyncStorage.setItem("questionario_pending", "true");
            // se o backend retornou token já, salve para manter sessão
            if (response.data.token) {
              await AsyncStorage.setItem("token", String(response.data.token));
            }
          } catch (e) {
            // ignore
          }

          Alert.alert("Sucesso", "Registro realizado com sucesso!");
          // depois do registro, ir para verificação de email (confirm-code)
          router.push({ pathname: "/auth/confirm-code", params: { email: String(params.email || "") } });
        } else {
          setError(response.data.message || "Erro ao salvar perfil");
        }
    } catch (error: any) {
      console.log("Erro no registro (erro):", error);
      console.log("Erro no registro (response.status):", error?.response?.status);
      console.log("Erro no registro (response.headers):", error?.response?.headers);
      console.log("Erro no registro (response.data):", error?.response?.data);
      // prefer server message when available
      setError(error?.response?.data?.message || error?.message || "Erro ao salvar perfil");
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
        <PhoneInput value={telefone} onChange={setTelefone} />
        <InputGender value={genero} onChange={setGenero} />
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
