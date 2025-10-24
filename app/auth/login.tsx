import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonBase from "../components/common/button/button";
import ButtonBase2 from "../components/common/button/button2";
import InputBase from "../components/common/input/inputBase";

const { width, height } = Dimensions.get("window");

const API_BASE_URL = "http://44.220.11.145";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha email e senha.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        senha,
      });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        // save email for profile display
        try {
          await AsyncStorage.setItem("email", email);
        } catch (e) {
          // ignore
        }

        // Decode token locally to extract payload (nome, email) if backend includes them in JWT
        try {
          const decodeJwt = (token: string) => {
            try {
              const parts = token.split('.');
              if (parts.length !== 3) return null;
              const payload = parts[1];
              const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
              let json = null as string | null;
              const atobFn = (global as any).atob || (globalThis as any).atob;
              if (typeof atobFn === 'function') { 
                // atob exists
                const decoded = atobFn(base64);
                json = decodeURIComponent(
                  Array.prototype.map
                    .call(decoded, function (c: string) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
                );
              } else if (typeof (global as any).Buffer !== 'undefined') { 
                json = (global as any).Buffer.from(base64, 'base64').toString('utf8');
              } else {
                return null;
              }
              if (!json) return null;
              return JSON.parse(json);
            } catch (err) {
              return null;
            }
          };

          const payload = decodeJwt(response.data.token);
          if (payload) {
            if (payload.nome) {
              try {
                await AsyncStorage.setItem('nome', String(payload.nome));
              } catch (e) {
                // ignore
              }
            }
            if (payload.email) {
              try {
                await AsyncStorage.setItem('email', String(payload.email));
              } catch (e) {
                // ignore
              }
            }
          } else {
            // fallback: if backend returned nome in top-level response (older implementation), persist it
            if (response.data.nome) {
              try {
                await AsyncStorage.setItem('nome', String(response.data.nome));
              } catch (e) {
                // ignore
              }
            }
          }
        } catch (e) {
          // ignore decoding errors
        }
        router.push("/(tabs)/home");
      } else {
        Alert.alert("Erro", "Resposta inesperada do servidor.");
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert("Erro", error.response?.data?.message || "Erro ao fazer login");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Image source={require("../../assets/icons/logo.png")} style={styles.logo} resizeMode="contain" />
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

      <TouchableOpacity onPress={() => router.push("/auth/redefined1")}>
        <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.botoes}>
        <ButtonBase title={loading ? "Entrando..." : "Fazer login"} onPress={handleLogin} disabled={loading} />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Ou</Text>
          <View style={styles.line} />
        </View>

        <ButtonBase2 title="Ainda não tem uma conta?" onPress={() => router.push("/auth/registro1")} />
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
    paddingBottom: 70,
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
