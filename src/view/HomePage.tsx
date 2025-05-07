import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Logo from "../components/Logo";
import Button from "../components/Button";
import BackgroundCanvas from "../components/BackgroundCanvas"; // Importamos la animación

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <BackgroundCanvas /> {/* Añadimos el fondo animado */}
      <div className="logo">
        <Logo />
      </div>
      <div className="auth-options">
        <Button
          onClick={() => navigate("/login")}
          label="Iniciar sesión"
        />
        <Button
          onClick={() => navigate("/register")}
          label="Registrar"
        />
        <Button
          onClick={() => navigate("/dashboard")}
          label="Dashboard"
        />
      </div>
    </div>
  );
};

export default HomePage;
