import React from "react";
import { InputMask } from "@react-input/mask";
import { cpf } from "cpf-cnpj-validator";

import { Input } from "../ui/input";

interface CPFInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <Input ref={ref} {...props} variant="filled" />
);

const CPFInput: React.FC<CPFInputProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const isValid = cpf.isValid(value);

  return (
    <div>
      <InputMask
        mask="___.___.___-__"
        replacement="_"
        value={value}
        onChange={handleChange}
        placeholder="Digite seu CPF"
        component={CustomInput}
      />
      {!isValid && value.length === 14 && (
        <p className="text-red-500 text-sm mt-1">CPF inválido</p>
      )}
    </div>
  );
};

export default CPFInput;
