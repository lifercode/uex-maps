import React from "react";
import { InputMask } from "@react-input/mask";

import { Input } from "../ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <Input ref={ref} {...props} variant="filled" />
);

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputMask
      mask="(__) _____-____"
      replacement="_"
      value={value}
      onChange={handleChange}
      placeholder="Telefone"
      component={CustomInput}
    />
  );
};

export default PhoneInput;
