import MenuComponent from "./components/MenuComponent.tsx";
import {Col, Row} from "react-bootstrap";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home.tsx";
import MisBots from "./pages/MisBots.tsx";
import MisLigas from "./pages/MisLigas.tsx";
import {useState} from "react";
import PerfilPage from "./pages/PerfilPage.tsx";
import CrearBot from './pages/CrearBot';
import CrearLiga from './pages/CrearLiga';

import LeaderBoardPage from "./pages/LeaderBoardPage.tsx";
import LeagueOverviewPage from "./pages/LeagueOverviewPage.tsx";
import LogIn from "./pages/LogIn.tsx";
import DetallesBot from "./pages/DetallesBot.tsx";

export function App() {
    const location = useLocation();
    const [menuExpanded, setMenuExpanded] = useState(true);
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {isLoginPage ?
                <LogIn/>
                :
                <Row className="custom-primary p-3 gx-0" style={{height: '100vh'}}>
                    <Col xs={menuExpanded ? 2 : 1} style={{transition: "width  .3s ease-in-out"}}>
                        <MenuComponent menuExpanded={menuExpanded} handleMenuExpanded={setMenuExpanded}></MenuComponent>
                    </Col>
                    <Col xs={menuExpanded ? 10 : 11} className="custom-secondary rounded-3 p-5"
                         style={{transition: "width  .3s ease-in-out"}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/mis-bots" element={<MisBots/>}/>
                            <Route path="/mis-bots/:id" element={<DetallesBot/>}/>
                            <Route path="/mis-ligas" element={<MisLigas/>}/>
                            <Route path="/perfil/:id" element={<PerfilPage/>}/>
                            <Route path="/crear-bot" element={<CrearBot/>}/>
                            <Route path="/crear-liga" element={<CrearLiga/>}/>
                            <Route path="/league/:leagueId" element={<LeagueOverviewPage leagueId={1}/>}/>
                            <Route path="/league/:leagueId/*" element={<LeaderBoardPage/>}/>
                        </Routes>
                    </Col>
                </Row>
            }
        </>
    )
}
