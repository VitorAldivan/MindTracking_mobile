// src/screens/Auth/RegisterScreen.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import MindIcon from "../../../assets/icons/logo.svg"; // ícone no topo
import InputBase from "../../components/common/input/inputBase";
import InputData from "../../components/common/input/inputData";
import InputPhone from "../../components/common/input/inputPhone";
import InputGender from "../../components/common/input/inputGenero";

export default function RegisterScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className=" bg-gray-900 px-6 py-10"
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo */}
      <View className="items-center mb-8">
        <MindIcon width={80} height={80} />
      </View>

      {/* Título */}
      <Text className="text-white text-2xl font-bold text-center mb-3">
        Estamos quase lá
      </Text>

      {/* Subtítulo */}
      <Text className="text-gray-300 text-base text-center mb-8">
        Para uma experiência mais pessoal, precisamos de alguns detalhes.{"\n"}
        Como podemos te chamar?
      </Text>

      {/* Inputs */}
      <View className="space-y-5 items-center">
        <InputBase placeholder="Digite seu nome" iconLeft="user" />

        {/* Data de nascimento */}
        <InputData />

        {/* Telefone */}
        <InputPhone />

        {/* Gênero */}
        <InputGender />
      </View>

      {/* Botão */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="mt-10 bg-blue-600 py-4 rounded-full items-center"
      >
        <Text className="text-white font-semibold text-lg">
          Próxima etapa
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
