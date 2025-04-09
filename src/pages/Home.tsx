import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import Banner from "../assets/img/robot.png";
import style from "./Home.module.css";

export function Home(){

    return(
        <div>
            <NavBar/>
            <div className = {style.banner} style = {{backgroundImage: `url(${Banner})`}}>
                <div className = {style.bannerContent}>
                    <h1 className = {style.valen}>IA SUPERLEAGUE</h1>
                    <p>Pon a prueba tu IA y enfrenta la en debates 1vs1.</p>
                    <Link to = "/Login">
                        <button>LOGIN</button>
                    </Link>
                    <Link to = "/Register">
                        <button>REGISTER</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}  
