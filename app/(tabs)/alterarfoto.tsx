import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect } from 'react';
import {
    Alert, Dimensions,
    Image,
    Pressable, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import ButtonBase from "../components/common/button/button";


const { width, height } = Dimensions.get("window");
const AVATAR_SIZE = width * 0.482; // Responsivo, igual ao seu avatar
const EDIT_SIZE = AVATAR_SIZE * 0.24;
export default function Perfil() {
  const router = useRouter();
  useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria.");
      router.back();
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Aqui você pode capturar result.assets[0].uri
      // router.back(); // Ou qualquer outra navegação após escolher
    }
  })();
}, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
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
        <Text style={styles.titulo}>Deseja alterar a foto?</Text>
        <ButtonBase title="Continuar" onPress={() => router.push("/(tabs)/alterarfoto")} />
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
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.15,
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
    gap: height * 0.04,
    marginBottom: height * 0.,
    
  },
  textContainer: {
    flex: 1,
    alignItems: "center",  },
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
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: "#1E293B",
  },
  titulo: {
    color: "#fff",
    fontSize: Math.max(width * 0.06, 16),
    fontFamily: "Inter_600SemiBold",
    
  },
 
});
