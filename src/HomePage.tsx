import React from 'react';
import './HomePage.css';
import logo from "./assets/robot.svg";


const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            {/* Logo centrado */}
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-img" />
            </div>

            {/* Opciones de inicio de sesión y registro en la esquina superior derecha */}
            <div className="auth-options">
                <a href="#login" className="auth-link">Iniciar sesión</a>
                <a href="#register" className="auth-link">Registrar</a>
            </div>
        </div>
    );
}

export default HomePage;
