import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Register.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";

export function Register() {
    const [id, setId] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!id || !password || !confirmPassword || !mail) {
            setError("Por favor, completa todos los campos");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/v0/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: id,
                    mail: mail,
                    password: password
                }),
            });
    
            if (response.ok) {
                console.log("Registro exitoso");
    
                // Redirigir al home o login
                window.location.href = "/";
            } else {
                // Intentar leer el mensaje de error si viene
                const data = await response.json();
                setError(data.message || "No se pudo completar el registro");
            }
        } catch (error) {
            setError("Error de conexión con el servidor: " + error);
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
                            <label>Mail:</label>
                            <input 
                                type="text" 
                                value={mail} 
                                onChange={(e) => setMail(e.target.value)} 
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
