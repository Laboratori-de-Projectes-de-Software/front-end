import React, { useState } from "react";
import { useModal } from "../../modalManager/ModalProvider";
import "./Register.scss";
import TextInput from "@modules/shared/input/text-input/text-input";
import PasswordInput from "@modules/shared/input/password-input/password-input";
import { appApi } from "@features/shared/index.ts";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openModal } = useModal();
  const [register] = appApi.usePostAuthRegisterMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ user: name,  mail: email, password }).unwrap().then(() => {
      openModal("login");
    })
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Registarse</h1>
      <h3>Regístrate para poder acceder a la web</h3>
      <TextInput value={name} setValue={setName} text="Nombre de Usuario"/>
      <TextInput value={email} setValue={setEmail} text="Email"/>
      <PasswordInput value={password} setValue={setPassword} text="Contraseña"/>
      <button className="register-form__submit" type="submit">
        Crear cuenta
      </button>
      <p className="register-form__sign-in-reminder">
        Ya tienes una cuenta?{" "}
        <span onClick={() => openModal("login")} className="register-form__sign-in-link">Inicia sesión</span>
      </p>
    </form>
  );
};

export default Register;