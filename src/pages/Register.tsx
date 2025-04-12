import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Register.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";

export function Register() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!id || !password || !confirmPassword) {
            setError("Por favor, completa todos los campos");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: id,      // asegúrate de que coincida con lo que espera tu backend
                    password: password
                }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.success) {
                console.log("Registro exitoso");
    
                // Opcional: redireccionar al login o loguear automáticamente
                window.location.href = "/"; // o "/Home" si lo deseás
            } else {
                // Si data.message viene del backend con info útil, la mostramos
                setError(data.message || "No se pudo completar el registro");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
            console.error(error);
        }
    };
    
    

    return (
        <div>
            <div className={style.banner} style={{ backgroundImage: `url(${BackgroundImage})`}}>
                <div className={style.pageContainer}>
                <div className={style.container}>
                <div className={style.homepage}>
                        <img src={logo} alt="IA SuperLeague Logo" className={style.logo} />
                        <a className={style.navlink} href={"Home"}>{"IA SUPERLEAGUE"}</a>
                    </div>
                    <h1>Registro</h1>
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
                        <div className={style.inputGroup}>
                            <label>Confirmar Contraseña:</label>
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {error && <p className={style.error}>{error}</p>}
                        <button type="button" onClick={handleRegister}>Registrarse</button>
                    </form>
                    <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
