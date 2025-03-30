import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import style from "./Home.module.css";
import BackgroundImage from "../assets/img/saludo2.png";

export function Register() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        setError("");
        console.log("ID:", id);
        console.log("Password:", password);
        // Aquí podrías agregar lógica para enviar los datos al backend
    };

    return (
        <div style={{ 
            backgroundImage: `url(${BackgroundImage})`, 
            backgroundSize: "contain", 
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed"
        }}>
            <NavBar />
            <div className={style.pageContainer} style={{ marginRight: "450px" }}>
                <div className={style.container}>
                    <h1>Registro</h1>
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
                        <button type="button" onClick={handleRegister}>Confirmar</button>
                    </form>
                    <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
                </div>
            </div>
        </div>
    );
}
