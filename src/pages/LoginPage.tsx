import React from "react";
import "./LoginPage.css";
import Logo from "../components/Logo";
import AuthForm from "../components/AuthForm";
import BackgroundCanvas from "../components/BackgroundCanvas"; // Importa el formulario

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <BackgroundCanvas />
            <div className="login-box">
                <Logo/> {/* Ahora el logo es un componente reutilizable */}
                <h1>Iniciar Sesión</h1>
                <AuthForm/> {/* Usa el componente de formulario */}
                <a href="/register" className="register-link">¿No tienes cuenta? Regístrate</a>
            </div>
        </div>
    );
};

export default LoginPage;




