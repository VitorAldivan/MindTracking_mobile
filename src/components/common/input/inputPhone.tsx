import { useState } from "react";

import InputBase from "./inputBase";
export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    
    const digits = value.replace(/\D/g, "");

    
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
      maxLength={15} 
    />
  );
}
