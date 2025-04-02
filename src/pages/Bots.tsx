import NavBar from "../components/NavBar";
import style from "./Bots.module.css";
import R1 from "../assets/img/R1.png";
import R2 from "../assets/img/R2.png";
import R3 from "../assets/img/R3.png";
import R4 from "../assets/img/R4.png";
import R5 from "../assets/img/R5.png";
import ADDICON from "../assets/img/addIcon.png"; 
import EDIT from "../assets/img/Editar.png";
import DELETE from "../assets/img/Eliminar.png";

export function Bots() {
    return (
        <div>
            <NavBar/>
            <div className = {style.background}>
                <div className={style.bots}>
                    <h2>My Bots</h2>
                    <ul>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${R1})`}}>
                            <li>Bot 1</li>
                            <button className = {style.edit} style = {{backgroundImage: `url(${EDIT})`}}></button><button className = {style.delete} style = {{backgroundImage: `url(${DELETE})`}}></button>
                        </div>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${R1})`}}>
                            <li>Bot 2</li>
                            <button className = {style.edit} style = {{backgroundImage: `url(${EDIT})`}}></button><button className = {style.delete} style = {{backgroundImage: `url(${DELETE})`}}></button>
                        </div>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${R1})`}}>
                            <li>Bot 3</li>
                            <button className = {style.edit} style = {{backgroundImage: `url(${EDIT})`}}></button><button className = {style.delete} style = {{backgroundImage: `url(${DELETE})`}}></button>
                        </div>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${R1})`}}>
                            <li>Bot 4</li>
                            <button className = {style.edit} style = {{backgroundImage: `url(${EDIT})`}}></button><button className = {style.delete} style = {{backgroundImage: `url(${DELETE})`}}></button>
                        </div>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${R1})`}}>
                            <li>Bot 5</li>
                            <button className = {style.edit} style = {{backgroundImage: `url(${EDIT})`}}></button><button className = {style.delete} style = {{backgroundImage: `url(${DELETE})`}}></button>
                        </div>
                        <div className={style.botsHeader} style = {{backgroundImage: `url(${ADDICON})`}}>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}