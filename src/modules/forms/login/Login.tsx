import React, { useState } from "react";
import Input from "../../shared/input/Input";
import type { InputConfig } from "@interfaces/shared/Input-config";
import "./Login.scss";
import { useAuth } from "../../../auth/AuthProvider";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth!.login({ username, password });
  };

  const usernameInputConfig: InputConfig = {
    id: "login-email",
    label: "Email",
    state: setUsername,
  };

  const passwordInputConfig: InputConfig = {
    id: "login-password",
    label: "Contraseña",
    state: setPassword,
    type: "password",
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>BIENVENIDO</h1>
      <h3>Inicia sesión para continuar con tu cuenta</h3>
      <Input config={usernameInputConfig} />
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
