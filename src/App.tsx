import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import Scores from "./components/Scores";
import LeagueCreation from "./components/LeagueCreation";
import MatchPage from "./components/MatchPage";
import AddIA from "./components/AddIA";
import SignUp from "./components/SignUp";
import './css/App.css';
export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/scores" element={<Scores/>}/>
                    <Route path="/leaguecreation" element={<LeagueCreation/>}/>
                    <Route path="/combat" element={<MatchPage/>}/>
                    <Route path="/addia" element={<AddIA/>}/>
                </Routes>
            </Router>
        </>
    );

}