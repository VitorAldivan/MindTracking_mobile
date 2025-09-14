import { useState } from "react";
import { View, TouchableOpacity, FlatList, Text } from "react-native";
import InputBase from "./inputBase";
import ArrowDown from "../../../../assets/icons/seta.svg"; 

const GENDERS = ["Masculino", "Feminino", "Outro"];

export default function InputGender() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleSelect = (gender: string) => {
    setSelected(gender);
    setOpen(false);
  };

  return (
    <View className="w-full max-w-[342px]">
      
      <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.8}>
        <InputBase
          placeholder="Selecione o gênero"
          value={selected}
          editable={false}
          iconLeft="genero"
        />
        <View className="absolute right-3 top-1/2 -translate-y-1/2">
          
          <ArrowDown 
            width={20} 
            height={20} 
            style={{ 
              transform: [{ rotate: open ? '90deg' : '0deg' }] 
            }} 
          />
        </View>
      </TouchableOpacity>

      
      {open && (
        <View className="bg-gray-700 rounded-md mt-1 border border-blue-600">
          <FlatList
            data={GENDERS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-3 border-b border-gray-600 last:border-b-0"
              >
                <Text className="text-white text-sm">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}