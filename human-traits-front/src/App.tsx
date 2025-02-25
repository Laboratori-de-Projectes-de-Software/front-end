import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import Scores from "./components/Scores";
import './css/App.css';
export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/scores" element={<Scores/>}/>
                </Routes>
            </Router>
        </>
    );

}