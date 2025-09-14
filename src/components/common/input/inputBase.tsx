import { View, TextInput, TextInputProps } from "react-native";
import UserIcon from "../../../assets/icons/usuario.svg";
import LockIcon from "../../../assets/icons/senha.svg";

interface InputBaseProps extends TextInputProps {
  iconLeft?: "user" | "lock"; // só aceita esses valores
}

export default function InputBase({ iconLeft, placeholder, ...rest }: InputBaseProps) {
  const renderIcon = () => {
    switch (iconLeft) {
      case "user":
        return <UserIcon width={20} height={20} />;
      case "lock":
        return <LockIcon width={20} height={20} />;
      default:
        return null;
    }
  };

  return (
    <View className="w-full max-w-[342px] h-12 flex-row items-center rounded-md border-b-2 border-blue-600 bg-gray-800 px-3">
      {renderIcon()}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#fff"
        className="flex-1 text-sm font-inter text-white ml-2"
        {...rest}
      />
    </View>
  );
}
