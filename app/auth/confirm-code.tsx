import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Verification from "../components/common/input/inputCode";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import ButtonBase from "../components/common/button/button";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://44.220.11.145";

  const handleVerify = async () => {
    const email = String(params.email || (await AsyncStorage.getItem("email")) || "");
    const codigo = code.join("").trim();
    if (!email || codigo.length === 0) {
      setError("Preencha o código enviado por email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const resp = await axios.post(`${API_BASE_URL}/auth/verify-email`, { email, codigo }, { headers: { "Content-Type": "application/json" }, timeout: 10000 });
      console.log("verify resp:", resp.status, resp.data);
      if (resp.data && resp.data.success) {
        // optional: save token if returned
        if (resp.data.token) {
          await AsyncStorage.setItem("token", String(resp.data.token));
        }
        router.push("/auth/welcome");
      } else {
        setError(resp.data.message || "Código inválido");
      }
    } catch (err: any) {
      console.log("verify error:", err?.response?.data || err.message || err);
      setError(err?.response?.data?.message || "Erro ao verificar código");
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.title}>Enviamos um código para seu e-mail</Text>
          <Text style={styles.subtitle}>
             Digite o código abaixo para confirmar sua identidade.
          </Text>
        </View>
      </View>
      <View style={styles.inputs}>
        <Verification code={code} setCode={setCode} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

    

      <View style={styles.botoes}>
        <ButtonBase title={loading ? "Verificando..." : "Finalizar cadastro"} onPress={handleVerify} disabled={loading} />
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
