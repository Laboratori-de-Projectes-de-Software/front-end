import { useState } from "react";
import style from "./Management.module.css";
import BackgroundImage from "../assets/img/saludo2.png";
import logo from "../assets/img/logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Management() {
    const [id, setId] = useState("");
    const [round, setRound] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!id || !round || !duration) {
            setError("Por favor, completa todos los campos");
            return;
        }
        setError("");
        console.log("ID:", id);
        console.log("Round:", round);
        console.log("Duration:", duration);
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
                                type="Round" 
                                value={round} 
                                onChange={(e) => setRound(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Duracion de las rondas:</label>
                            <input 
                                type="duration" 
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Fecha de inicio:</label>
                            <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            />

                            <label>Fecha de final:</label>
                            <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
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
