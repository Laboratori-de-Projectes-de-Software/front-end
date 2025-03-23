import { InputConfig } from "@interfaces/shared/Input-config";
import "./Input.scss";

type InputProps = {
  config: InputConfig;
};

const Input = ({ config }: InputProps) => {
  const handleOnChange = (e: any) => {
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