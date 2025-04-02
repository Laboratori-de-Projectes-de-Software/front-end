import NavBar from "../components/NavBar";
import style from "./Bots.module.css";
import R1 from "../assets/img/R1.png";
import R2 from "../assets/img/R2.png";
import R3 from "../assets/img/R3.png";
import R4 from "../assets/img/R4.png";
import R5 from "../assets/img/R5.png";
import ADDICON from "../assets/img/addIcon.png"; 

export function Bots() {
    return (
        <div>
            <NavBar/>
            <div className = {style.background}>
                <div className={style.bots}>
                    <h2>My Bots</h2>
                    <ul>
                        <li style = {{backgroundImage: `url(${R1})`}}>Bot 1</li>
                        <li style = {{backgroundImage: `url(${R2})`}}>Bot 2</li>
                        <li style = {{backgroundImage: `url(${R3})`}}>Bot 3</li>
                        <li style = {{backgroundImage: `url(${R4})`}}>Bot 4</li>
                        <li style = {{backgroundImage: `url(${R5})`}}>Bot 5</li>
                        <li style = {{backgroundImage: `url(${ADDICON})`}}>ADD NEW</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}