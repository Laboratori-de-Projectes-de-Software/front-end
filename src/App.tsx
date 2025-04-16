import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import MisLigas from "./components/MisLigas";
import LeagueCreation from "./components/LeagueCreation";
import MatchPage from "./components/MatchPage";
import AddIA from "./components/AddIA";
import SignUp from "./components/SignUp";
import UpdateBot from "./components/updateBot";
import Profile from "./components/LeagueParam";
import AnadirBotLiga from "./components/AnadirBotLiga";
import ChatWindow from "./components/ChatWindow";
import StartLeague from "./components/StartLiga";
import CombatesLiga from "./components/CombatesLiga";
import './css/App.css';
export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/misLigas" element={<MisLigas/>}/>
                    <Route path="/leaguecreation" element={<LeagueCreation/>}/>
                    
                    <Route path="/combat" element={<MatchPage/>}/>
                    <Route path="/addia" element={<AddIA/>}/>
                    <Route path="/updateBot" element={<UpdateBot/>}/>
                    <Route path="/profile/:leagueId" element={<Profile />} />
                    <Route path="/startLeague" element ={<StartLeague/>}/>
                    <Route path="/combatesLiga/:leagueId" element={<CombatesLiga/>}/>
                    <Route path="/addiaLeague/:leagueId" element={<AnadirBotLiga/>}/>
                    
                </Routes>
            </Router>
        </>
    );

}