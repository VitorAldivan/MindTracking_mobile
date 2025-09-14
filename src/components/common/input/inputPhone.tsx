import { useState } from "react";

import InputBase from "./inputBase";
export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    // remove tudo que não for número
    const digits = value.replace(/\D/g, "");

    // aplica a máscara (11) 22222-2222
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
    // impede emojis, só deixa números e espaços/dash/parênteses
    const cleaned = text.replace(/[^\d\s()-]/g, "");
    setPhone(formatPhone(cleaned));
  };

  return (
    <InputBase
      placeholder="(11) 99999-9999"
      keyboardType="numeric"
      value={phone}
      onChangeText={handleChange}
      iconLeft="user"
      maxLength={15} // limite pra máscara
    />
  );
}
