// src/pages/LoginPage.tsx

import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log("Inicio de sesión con", email, password);
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-login">
                    Iniciar sesión
                </button>
            </form>
            <p>
                ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>
        </div>
    );
};

export default LoginPage;
