import React from "react";
import "./AuthForm.css";
import Button from "./Button";

const AuthForm: React.FC = () => {
    return (
        <form className="auth-form">
            <div className="input-group">
                <label>Email:</label>
                <input type="email" placeholder="Tu email" required />
            </div>
            <div className="input-group">
                <label>Contraseña:</label>
                <input type="password" placeholder="Tu contraseña" required />
            </div>
            <Button onClick={() => { console.log("Formulario enviado"); }} label="Ingresar" className="login-button" />
        </form>
    );
};

export default AuthForm;

