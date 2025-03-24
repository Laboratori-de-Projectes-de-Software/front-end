import React from "react";
import "./AuthForm.css";

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
            <button className="login-button" type="submit">Ingresar</button>
            <a href="/register" className="register-link">¿No tienes cuenta? Regístrate</a>
        </form>
    );
};

export default AuthForm;

