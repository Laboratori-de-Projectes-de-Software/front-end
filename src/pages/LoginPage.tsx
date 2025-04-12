import React from "react";
import "./Form.css";
import Logo from "../components/Logo";
import AuthForm from "../components/AuthForm";
import BackgroundCanvas from "../components/BackgroundCanvas";

const LoginPage: React.FC = () => {
  const CamposLogin = [
    { nombre: "Correo", tipo: "email" },
    { nombre: "Contraseña", tipo: "password" },
  ];

  return (
    <div className="form-container">
      <BackgroundCanvas />
      <div className="form-box">
        <Logo />
        <h1>Iniciar sesión</h1>
        <AuthForm campos={CamposLogin} modo="login" />
        <p>
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="register-link">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
