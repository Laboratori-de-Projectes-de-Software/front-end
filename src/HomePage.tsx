import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import Logo from "./components/Logo";
import Button from "./components/Button";

const HomePage: React.FC = () => {
    const navigate = useNavigate(); // Hook para navegar entre páginas

    return (
        <div className="home-container">
            {/* Logo centrado */}
            <div className="logo">
                <Logo />
            </div>

            {/* Opciones de inicio de sesión y registro en la esquina superior derecha */}
            <div className="auth-options">
                <Button onClick={() => navigate("/login")} label="Iniciar sesión" className="auth-link" />
                <Button onClick={() => navigate("/register")} label="Registrar" className="auth-link" />
            </div>
        </div>
    );
}

export default HomePage;

