import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardDenominado from "../components/cards/cardPerfil";

const { width, height } = Dimensions.get("window");
const AVATAR_SIZE = width * 0.442; // Responsivo, igual ao seu avatar
const EDIT_SIZE = AVATAR_SIZE * 0.24; // Proporcional ao avatar

export default function Perfil() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;

    async function loadProfileFromToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodeJwt = (t: string) => {
            try {
              const parts = t.split('.');
              if (parts.length !== 3) return null;
              const payload = parts[1];
              const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
              let json: string | null = null;
              const atobFn = (global as any).atob || (globalThis as any).atob;
              if (typeof atobFn === 'function') {
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

          const payload = decodeJwt(token);
          if (payload) {
            const serverEmail = payload.email ?? null;
            const serverNome = payload.nome ?? null;
            if (mounted) {
              if (serverEmail) setEmail(serverEmail);
              if (serverNome) setNome(serverNome);
            }
            // persist locally
            if (serverEmail) await AsyncStorage.setItem('email', String(serverEmail));
            if (serverNome) await AsyncStorage.setItem('nome', String(serverNome));
            return;
          }
        }

        // fallback: read from AsyncStorage
        const e = await AsyncStorage.getItem('email');
        const n = await AsyncStorage.getItem('nome');
        if (mounted) {
          setEmail(e);
          setNome(n);
        }
      } catch (err) {
        // ignore
      }
    }

    loadProfileFromToken();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <Image
            source={require("../../assets/icons/seta.png")}
            style={styles.seta}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.perfilText}>Perfil</Text>
        </View>
        <View style={{ width: width * 0.09 }} />
      </View>
      <View style={styles.topo}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <Pressable
            style={styles.editButton}
            onPress={() => router.push("/(tabs)/alterarfoto")}
          >
            <View style={styles.editCircle}>
              <Image
                source={require("@assets/icons/Edit.png")}
                style={styles.editIcon}
              />
            </View>
          </Pressable>
        </View>
  <Text style={styles.name}>{nome ?? ""}</Text>
  <Text style={styles.email}>{email ?? ""}</Text>
      </View>

      <View style={styles.cardsContainer}>
        <CardDenominado tipo="progresso" onPress={() => router.push('/(tabs)/dashboard')} />
  <CardDenominado tipo="alterarSenha" onPress={() => router.push({ pathname: '/auth/verify-code', params: { from: 'change' } })} />
        <CardDenominado tipo="editarPerfil" onPress={() => router.push('/(tabs)/alterarfoto')} />
        <CardDenominado
          tipo="sairDaConta"
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            try {
              await AsyncStorage.removeItem("email");
              await AsyncStorage.removeItem("nome");
            } catch (e) {
              // ignore
            }
            router.replace("/auth/login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.06,
  },
  cardsContainer: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  seta: {
    width: width * 0.09,
    height: width * 0.08,
    top: height * 0.01,
    tintColor: "#fff",
    resizeMode: "contain",
    marginBottom: height * 0.025,
    transform: [{ rotate: "90deg" }],
  },
  topo: {
    alignItems: "center",
    gap: height * 0.002,
    marginBottom: height * 0.05,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  perfilText: {
    color: "#fff",
    fontSize: Math.max(width * 0.05, 14),
    fontFamily: "Inter_600SemiBold",
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    position: "relative", // Permite posicionamento absoluto do botão
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: "#1E293B",
  },
  editButton: {
    position: "absolute",
    right: width * 0.009, // Sempre no canto direito da foto
    bottom: 0, // Sempre embaixo da foto
  },
  editCircle: {
    width: EDIT_SIZE,
    height: EDIT_SIZE,
    borderRadius: EDIT_SIZE / 2,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  editIcon: {
    width: EDIT_SIZE * 0.6,
    height: EDIT_SIZE * 0.6,
    resizeMode: "contain",
  },
  name: {
    color: "#fff",
    fontSize: Math.max(width * 0.06, 16),
    fontFamily: "Inter_600SemiBold",
    marginTop: width * 0.05,
  },
  email: {
    color: "#fff",
    opacity: 0.7,
    fontFamily: "Inter_400Regular",
    fontSize: Math.max(width * 0.03, 14),
    marginTop: width * 0.01,
  },
});
