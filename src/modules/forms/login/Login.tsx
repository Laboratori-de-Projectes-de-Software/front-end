import React, { useState } from "react";
import "./Login.scss";
import { useAuth } from "../../../auth/AuthProvider";
import { useModal } from "../../modalManager/ModalProvider";
import TextInput from "../../shared/input/text-input/text-input";
import PasswordInput from "../../shared/input/password-input/password-input";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth!.handleLogin({ user, password }).then(() => {
      closeModal();
    }).catch((error) => {
      alert("Error al iniciar sesión, por favor verifica tus credenciales.");
    })
  };
  const { openModal, closeModal } = useModal();


  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>BIENVENIDO</h1>
      <h3>Inicia sesión para continuar con tu cuenta</h3>
      <TextInput value={user} setValue={setUser} text="Usuario" />
      <PasswordInput value={password} setValue={setPassword} text="Contraseña" />
      <button className="login-form__submit" type="submit">
        Iniciar Sesión
      </button>
      <p className="login-form__sign-up-reminder">
        Todavía no tienes una cuenta?{" "}
        <span onClick={() => openModal("register")} className="login-form__sign-up-link">Regístrate</span>
      </p>
    </form>
  );
};

export default Login;
