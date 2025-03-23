import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import logo from "./assets/robot.svg";

const HomePage: React.FC = () => {
    const navigate = useNavigate(); // Hook para navegar entre páginas

    return (
        <div className="home-container">
            {/* Logo centrado */}
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-img" />
            </div>

            {/* Opciones de inicio de sesión y registro en la esquina superior derecha */}
            <div className="auth-options">
                <button onClick={() => navigate("/login")} className="auth-link">Iniciar sesión</button>
                <button onClick={() => navigate("/register")} className="auth-link">Registrar</button>
            </div>
        </div>
    );
}

export default HomePage;

