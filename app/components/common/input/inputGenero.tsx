import { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Easing,
} from "react-native";
import InputBase from "./inputBase";

const GENDERS = ["Masculino", "Feminino", "Outro"];
const { width } = Dimensions.get("window");

export default function InputGender() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // controle da animação
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: open ? 1 : 0, // 1 = aberto, 0 = fechado
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [open]);

  // interpolação de ângulo
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"], // gira 90 graus
  });

  const handleSelect = (gender: string) => {
    setSelected(gender);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.8}>
        <InputBase
          placeholder="Selecione o gênero"
          value={selected}
          editable={false}
          iconLeft="genero"
        />

        {/* seta com animação */}
        <Animated.View
          style={[
            styles.arrowContainer,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        >
          <Image
            source={require("@assets/icons/seta.png")}
            style={{ width: 18, height: 18, tintColor: "#fff" }}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={GENDERS}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[
                  styles.item,
                  index === GENDERS.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 342,
    marginVertical: 8,
    alignSelf: "center",
  },
  arrowContainer: {
    position: "absolute",
    right: 16,
    top: "50%", 
    marginTop: -9, 
  },
  dropdown: {
    backgroundColor: "#374151",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563eb",
    marginTop: 5,
    maxHeight: 150,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
});
