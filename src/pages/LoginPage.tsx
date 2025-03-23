import React from "react";
import "./LoginPage.css";
import logo from "../assets/robot.svg"; // Asegúrate de tener el logo en esta ruta o ajusta la ruta según corresponda

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                {/* Logo encima del formulario */}
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <h1>Iniciar Sesión</h1>
                <form>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" placeholder="Tu email" required />
                    </div>
                    <div className="input-group">
                        <label>Contraseña:</label>
                        <input type="password" placeholder="Tu contraseña" required />
                    </div>
                    <button className="login-button" type="submit">Ingresar</button>
                </form>
                <a href="/register" className="register-link">¿No tienes cuenta? Regístrate</a>
            </div>
        </div>
    );
};

export default LoginPage;



