import React from "react";
import "./Form.css";
import Logo from "../components/Logo";
import AuthForm from "../components/AuthForm";
import BackgroundCanvas from "../components/BackgroundCanvas";

const RegisterPage: React.FC = () => {
    const CamposRegister = [
        { nombre: "Nombre", tipo: "text" },
        { nombre: "Correo", tipo: "email" },
        { nombre: "Contraseña", tipo: "password" },
        { nombre: "Repetir Contraseña", tipo: "password" },
    ];

    return (
        <div className="form-container">
            <BackgroundCanvas />
            <div className="form-box">
                <Logo />
                <h1>Registrarse</h1>
                <AuthForm campos={CamposRegister} />
            </div>
        </div>
    );
};

export default RegisterPage;
