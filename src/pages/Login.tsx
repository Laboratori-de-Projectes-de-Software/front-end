import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";

export function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!id || !password) {
            setError("Por favor, completa todos los campos");
            return;
        }
        setError("");
        console.log("ID:", id);
        console.log("Password:", password);
        // Aquí podrías agregar lógica para enviar los datos al backend
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
                            <label>ID:</label>
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
