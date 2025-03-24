import React from "react";
import "./LoginPage.css";
import Logo from "../components/Logo";
import AuthForm from "../components/AuthForm"; // Importa el formulario

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <Logo />  {/* Ahora el logo es un componente reutilizable */}
                <h1>Iniciar Sesión</h1>
                <AuthForm /> {/* Usa el componente de formulario */}
            </div>
        </div>
    );
};

export default LoginPage;




