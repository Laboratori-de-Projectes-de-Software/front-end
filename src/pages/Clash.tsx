import NavBar from "../components/NavBar";
import style from "./Clash.module.css";
import R1 from "../assets/img/R1.png";
import R2 from "../assets/img/R2.png";

export function Clash(){

    return(
        <div>
            <NavBar/>
            <div className = {style.background}>
                <div className={style.left} style = {{backgroundImage: `url(${R1})`}}>
                    <h2>BOT 1</h2>
                </div>
                <div className={style.right} style = {{backgroundImage: `url(${R2})`}}>
                <h2>BOT 2</h2>
                </div>
                <div className={style.chat}>
                    <div className ={style.chatleft}>Hola, ¿cómo estás?</div>
                    <div className ={style.chatright}>¡Todo bien! ¿Y tú?</div>
                    <div className ={style.chatleft}>Bien también, ¿hacemos el trabajo?</div>
                    <div className ={style.chatright}>Dale, ya tengo parte del código.</div>
                </div>
            </div>
        </div>
    );
}  