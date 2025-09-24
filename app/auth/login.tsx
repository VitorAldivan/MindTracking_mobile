import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator } from "react-native";
import InputBase from "../components/common/input/inputBase"; 
import ButtonBase from "../components/common/button/button";
import ButtonBase2 from "../components/common/button/button2";
import { useRouter } from "expo-router"; 
import { login } from "../service/auth";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Erro", "Preencha email e senha.");
      return;
    }
    setLoading(true);
    try {
      const data = await login(email.trim(), senha);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // Aqui você pode salvar token ou navegar para outra tela
      router.push("/(tabs)/home");
    } catch (err: any) {
      const message = err?.message || err?.erro || "Falha no login";
      Alert.alert("Erro no login", message);
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
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Mantenha sua mente nos conformes</Text>
        </View>
      </View>

      <InputBase
        placeholder="Digite seu email"
        iconLeft="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <InputBase 
        iconLeft="senha" 
        placeholder="Senha" 
        eyeOpenIcon={require("@assets/icons/eye.png")}
        eyeClosedIcon={require("@assets/icons/eye-off.png")}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => router.push("/auth/redefined")}>
        <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.botoes}>
        <ButtonBase
          title={loading ? "Entrando..." : "Fazer login"}
          onPress={handleLogin}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Ou</Text>
          <View style={styles.line} />
        </View>

        <ButtonBase2
          title="Ainda não tem uma conta?"
          onPress={() => router.push("/auth/registro1")}
        />
      </View>

      {loading && (
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
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
    paddingBottom: 70, // espaço extra p/ navbar não sobrepor botões
  },
  logo: {
    width: width * 0.22, 
    height: height * 0.08, 
    marginTop: 0,
  },
  topo: {
    gap: height * 0.07, 
    marginBottom: height * 0.02,
  },
  titulos: {
    gap: height * 0.008,
  },
  botoes: {
    marginBottom: height * 0.1,
    gap: height * 0.001,
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
  forgotText: {
    color: "#ffffffff",
    fontSize: width * 0.033, 
    fontFamily: "Inter_700Bold",
    textAlign: "right",
    marginTop: height * 0.015,
    marginBottom: height * 0.015,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF33",
  },
  orText: {
    marginHorizontal: width * 0.08,
    color: "#ffffffff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: width * 0.04,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#2563EA",
    paddingVertical: height * 0.015,
    borderRadius: 24,
  },
  registerText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
    fontSize: width * 0.04,
  },
});
