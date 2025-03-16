import React, { useState } from "react";
import Input from "@components/Input.tsx";
import type { InputConfig } from "@interfaces/Input-config";
import "@styles/Login.style.css";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: Llevar a un archivo externo de configuraciones
  const apiUrl = "www.ejemplo.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(apiUrl, { email, password }).then((response) => {
      alert(response);
    });
  };

  const emailInputConfig: InputConfig = {
    id: "login-email",
    label: "Email",
    state: setEmail,
  };

  const passwordInputConfig: InputConfig = {
    id: "login-password",
    label: "Contraseña",
    state: setPassword,
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>BIENVENIDO</h1>
      <h3>Inicia sesión para continuar con tu cuenta</h3>
      <Input config={emailInputConfig} />
      <Input config={passwordInputConfig} />
      <button className="login-form__submit" type="submit">
        Iniciar Sesión
      </button>
      <p className="login-form__sign-up-reminder">
        Todavía no tienes una cuenta?{" "}
        <span className="login-form__sign-up-link">Regístrate</span>
      </p>
    </form>
  );
};

export default Login;
