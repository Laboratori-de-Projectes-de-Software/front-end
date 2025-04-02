import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import Button from "./Button";

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

  const handleSubmit = async () => {
    try {
      if (modo === "register") {
        const {
          Nombre,
          Correo,
          Contraseña,
          ["Repetir Contraseña"]: RepetirContraseña,
        } = formData;
        if (Contraseña !== RepetirContraseña) {
          setError("Las contraseñas no coinciden");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/v0/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: Nombre,
              email: Correo,
              password: Contraseña,
            }),
          }
        );

        if (!response.ok) throw new Error(await response.text());
        console.log("Registro exitoso");
        navigate("/login");
      } else if (modo === "login") {
        const { Correo, Contraseña } = formData;

        const response = await fetch(
          "http://localhost:8080/api/v0/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: Correo,
              password: Contraseña,
            }),
          }
        );

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        console.log("Login exitoso:", data);

        // Guardar token si lo deseas
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // o donde quieras llevar al usuario después de login
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
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
        className="login-button"
      />
    </form>
  );
};

export default AuthForm;
