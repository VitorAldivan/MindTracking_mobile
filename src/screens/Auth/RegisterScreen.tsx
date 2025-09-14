import { View, Text, ScrollView } from "react-native";
import InputPhone from "../../components/common/input/inputPhone";
import InputData from "../../components/common/input/inputData";
import InputGender from "../../components/common/input/inputGenero";


export default function RegisterScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-gray-900 px-4 py-6"
    >
      <Text className="text-white text-xl font-bold mb-6 text-center">
        Criar Conta
      </Text>

      <View className="space-y-4 items-center">
        {/* Telefone */}
        <InputPhone />

        {/* Data de nascimento */}
        <InputData />

        {/* Gênero */}
        <InputGender />

        {/* Botão de registrar */}
       
      </View>
    </ScrollView>
  );
}
