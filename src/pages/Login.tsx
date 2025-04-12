import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";

export function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!id || !password) {
            setError("Por favor, completa todos los campos");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: id,      // o "id" si tu backend lo espera así
                    password: password
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Token recibido:", data.token);
                console.log("Expira en:", data.expiresin, "segundos");
    
                // Guardar el token en localStorage (opcional)
                localStorage.setItem("token", data.token);
    
                // Redireccionar a otra ruta (ej: Home)
                window.location.href = "/Home";
            } else {
                setError("Credenciales incorrectas o usuario no encontrado");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
            console.error(error);
        }
    };
    

    return (
        <div className = {style.banner} style = {{backgroundImage: `url(${BackgroundImage})`}}>
            <div className={style.pageContainer} >
                <div className={style.container}>
                    <div className={style.homepage}>
                        <img src={logo} alt="IA SuperLeague Logo" className={style.logo} />
                        <a className={style.navlink} href={"Home"}>{"IA SUPERLEAGUE"}</a>
                    </div>
                    <h1>Iniciar Sesión</h1>
                    <form className={style.formContainer}>
                        <div className={style.inputGroup}>
                            <label>Usuario:</label>
                            <input 
                                type="text" 
                                value={id} 
                                onChange={(e) => setId(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Contraseña:</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {error && <p className={style.error}>{error}</p>}
                        <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
                    </form>
                    <p>¿No tienes una cuenta? <Link to="/Register">Regístrate aquí</Link></p>
                </div>
            </div>
        </div>
    );
}
