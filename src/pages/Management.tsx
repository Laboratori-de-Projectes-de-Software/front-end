import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Management.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";

export function Management() {
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
    };

    return (
        <div className = {style.banner} style = {{backgroundImage: `url(${BackgroundImage})`}}>
            <div className={style.pageContainer} >
                <div className={style.container}>
                    <div className={style.homepage}>
                        <img src={logo} alt="IA SuperLeague Logo" className={style.logo} />
                        <a className={style.navlink} href={"Home"}>{"IA SUPERLEAGUE"}</a>
                    </div>
                    <h1>Crea tu Liga</h1>
                    <form className={style.formContainer}>
                        <div className={style.inputGroup}>
                            <label>Nombre:</label>
                            <input 
                                type="text" 
                                value={id} 
                                onChange={(e) => setId(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Rondas:</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {error && <p className={style.error}>{error}</p>}
                        <button type="button" onClick={handleLogin}>Crear Liga</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
