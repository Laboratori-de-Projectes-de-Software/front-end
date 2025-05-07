import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import Button from "./Button";
import { handleRegister, handleLogin } from "../controllers/AuthController";

interface Campo {
  nombre: string;
  tipo: string;
}

interface AuthFormProps {
  campos: Campo[];
  modo: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ campos, modo }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (modo === "register") {
      handleRegister(formData, navigate, setError);
    } else if (modo === "login") {
      handleLogin(formData, navigate, setError);
    }
  };

  return (
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        {campos.map((campo, index) => (
            <div key={index} className="input-group">
              <label>{campo.nombre}:</label>
              <input
                  type={campo.tipo}
                  name={campo.nombre}
                  placeholder={`Ingrese ${campo.nombre}`}
                  onChange={handleChange}
                  required
              />
            </div>
        ))}
        {error && <p className="error">{error}</p>}
        <Button
            onClick={handleSubmit}
            label={modo === "login" ? "Ingresar" : "Registrarse"}
        />
      </form>
  );
};

export default AuthForm;
