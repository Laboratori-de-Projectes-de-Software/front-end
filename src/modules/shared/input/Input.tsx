import { InputConfig } from "@interfaces/shared/Input-config";
import { FC } from "react";
import "./Input.scss";

type InputProps = {
  config: InputConfig;
  value?: string;
};

const Input: FC<InputProps> = ({ config, value }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    config.state(e.target.value);
  };
  return (
    <>
      <div className="form-field__container">
        <input
          required
          id={config.id}
          className="form-field__input"
          type={config.type || "text"}
          onChange={handleOnChange}
          value={value || ''}
        />
        <label htmlFor={config.id} className="form-field__label">
          {config.label}
        </label>
      </div>
    </>
    // TODO: Agregar validación de errores
  );
};

export default Input;