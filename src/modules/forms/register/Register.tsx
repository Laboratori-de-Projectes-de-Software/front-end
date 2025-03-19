import React, { useState } from "react";
import Input from "../../shared/input/Input";
import type { InputConfig } from "@interfaces/shared/Input-config";
import "./Register.scss";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "http://localhost:8081/api/register"; // TODO: Cambiar la url de la api

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(apiUrl, { name, username: email, password }).then((response) => {
      alert(response);
    });
  };

  const nameInputConfig: InputConfig = {
    id: "register-name",
    label: "Nombre",
    state: setName,
  };

  const emailInputConfig: InputConfig = {
    id: "register-email",
    label: "Email",
    state: setEmail,
  };

  const passwordInputConfig: InputConfig = {
    id: "register-password",
    label: "Contraseña",
    state: setPassword,
    type: "password",
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Registarse</h1>
      <h3>Regístrate para poder acceder a la web</h3>
      <Input config={nameInputConfig} />
      <Input config={emailInputConfig} />
      <Input config={passwordInputConfig} />
      <button className="register-form__submit" type="submit">
        Crear cuenta
      </button>
      <p className="register-form__sign-in-reminder">
        Ya tienes una cuenta?{" "}
        <span className="register-form__sign-in-link">Inicia sesión</span>
      </p>
    </form>
  );
};

export default Register;