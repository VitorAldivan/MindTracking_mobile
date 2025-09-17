import { useState } from "react";
import InputBase from "./inputBase";

export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
     if (digits.length === 0) {
    return ""; 
  }

    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^\d]/g, ""); 
    setPhone(formatPhone(cleaned));
  };

  return (
    <InputBase
      placeholder="Telefone"
      keyboardType="phone-pad"
      inputMode="numeric"
      value={phone}
      onChangeText={handleChange}
      iconLeft="telefone" 
      maxLength={15}
    />
  );
}
