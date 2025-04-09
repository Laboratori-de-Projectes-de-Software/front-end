import MenuComponent from "./components/MenuComponent.tsx";
import {Col, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import MisBots from "./pages/MisBots.tsx";
import MisLigas from "./pages/MisLigas.tsx";
import {useState} from "react";
import PerfilPage from "./pages/PerfilPage.tsx";
import CrearBot from './pages/CrearBot';
import CrearLiga from './pages/CrearLiga';

import LeaderBoardPage from "./pages/LeaderBoardPage.tsx";
import LeagueOverviewPage from "./pages/LeagueOverviewPage.tsx";

export function App() {
  const [menuExpanded, setMenuExpanded] = useState(true);

  return (
      <>
        <Row className="custom-primary p-3 gx-0" style={{ height: '100vh'}}>
          <Col xs={menuExpanded ? 2 : 1} style={{transition: "width  .3s ease-in-out"}}>
            <MenuComponent menuExpanded={menuExpanded} handleMenuExpanded={setMenuExpanded}></MenuComponent>
          </Col>
          <Col xs={menuExpanded ? 10 : 11} className="custom-secondary rounded-3 p-5" style={{transition: "width  .3s ease-in-out"}}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/crear-bot" element={<CrearBot />} />
              <Route path="/crear-liga" element={<CrearLiga />} />

              <Route path="/api/v0/mis-bots" element={<MisBots />} />
              <Route path="/api/v0/mis-ligas" element={<MisLigas />} />
              <Route path="/api/v0/perfil/:id" element={<PerfilPage />} />
              <Route path="/api/v0/league/:leagueId" element={<LeagueOverviewPage leagueId={1}/>} />
              <Route path="/api/v0/league/:leagueId/*" element={<LeaderBoardPage />} />

            </Routes>
          </Col>
        </Row>
      </>
  )
}
