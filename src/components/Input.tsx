import type { InputConfig } from "@interfaces/Input-config";
import "@styles/Input.style.css";
import { useState } from "react";

type InputProps = {
  config: InputConfig;
};

const Input = ({ config }: InputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="form-field__container">
        <input
          required
          id={config.id}
          value={inputValue}
          className="form-field__input"
          type={config.type || "text"}
          onChange={handleOnChange}
        />
        <label htmlFor={config.id} className="form-field__label">
          {config.label}
        </label>
      </div>
      <div className="form-field__error"></div>
    </>
    // TODO: Agregar validación de errores
  );
};

export default Input;
