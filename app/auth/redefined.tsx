import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonBase from "../components/common/button/button";
import InputBase from "../components/common/input/inputBase"; // seu input já pronto
// Pega altura e largura da tela
const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
              <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={require('@assets/icons/seta.png')}
                    style={styles.seta}
                  />
                </TouchableOpacity>
      
                <View style={styles.textContainer}>
                  <Text style={styles.perfilText}>Dashboard</Text>
                </View>
      
                <View style={{ width: width * 0.09 }} />
              </View>
      <View style={styles.topo}>
        

        <View style={styles.titulos}>
          <Text style={styles.title}>Redefinir sua senha</Text>
          <Text style={styles.subtitle}>Por favor, digite seu email atual para continuar</Text>
        </View>
      </View>

      
      <InputBase iconLeft="email" placeholder="Email" 
      eyeOpenIcon={require("@assets/icons/eye.png")}
      eyeClosedIcon={require("@assets/icons/eye-off.png")}/>

      
   
      <View style={styles.botoes}>
  <ButtonBase title="Próxima etapa" onPress={() => router.push('/auth/confirm-code')} />

       
       


        
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
    marginTop: 0,
    
  },
  topo: {
    gap: height * 0.07, 
    marginTop: height * 0.08,
  },
  titulos: {
    gap: height * 0.008,
  },
  botoes: {
    marginBottom: height * 0.1,
    gap: height * 0.001,
  },
  title: {
    fontSize: width * 0.06,
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    top: -height * 0.17,
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
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  perfilText: {
    color: "#fff",
    fontSize: Math.max(width * 0.05, 14),
    fontFamily: "Inter_600SemiBold",
  },
});
