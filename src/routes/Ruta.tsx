    
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Leagues} from "../pages/Leagues";
import {Bots} from "../pages/Bots";
import {Match} from "../pages/Match";
import {Clash} from "../pages/Clash";
import {Upload} from "../pages/Upload";
import {Management} from "../pages/Management";

export function Ruta(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home/>} />
                <Route path="/Home" element = {<Home/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Bots" element={<Bots/>} />
                <Route path="/Leagues" element={<Leagues/>} />
                <Route path="/Match" element={<Match/>} />
                <Route path="/Clash" element={<Clash/>} />
                <Route path="/Upload" element={<Upload/>} />
                <Route path="/Management" element={<Management/>} />
            </Routes>
        </BrowserRouter>
    );
}

