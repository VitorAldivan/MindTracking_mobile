import { View, TextInput, TextInputProps } from "react-native";
import EmailIcon from "../../../../assets/icons/email.svg";
import SenhaIcon from "../../../../assets/icons/senha.svg";
import UserIcon from "../../../../assets/icons/usuario.svg";
import PhoneIcon from "../../../../assets/icons/telefone.svg";
import GeneroIcon from "../../../../assets/icons/genero.svg";

interface InputBaseProps extends TextInputProps {
  iconLeft?: "email" | "senha" | "user" | "genero" | "telefone"; 
}

export default function InputBase({ iconLeft, placeholder, ...rest }: InputBaseProps) {
  const renderIcon = () => {
    switch (iconLeft) {
      case "email":
        return <EmailIcon width={20} height={20} />;
        case "telefone":
        return <PhoneIcon width={20} height={20} />;
      case "user":
        return <UserIcon width={20} height={20} />;
      case "genero":
        return <GeneroIcon width={20} height={20} />;
      case "senha":
        return <SenhaIcon width={20} height={20} />;
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