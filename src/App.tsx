import "./App.css";
import Header from "./modules/shared/header/Header";
import AuthProvider from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import LeaguesPage from "./pages/leagues-page/leaguesPage.tsx";
import ModalManager from "./modules/modalManager/ModalManager.tsx";
import { ModalProvider } from "./modules/modalManager/ModalProvider.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="/league" element={<LeaguesPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                {/* TODO: Hay que cambiar esto porq habrá que añadir recupere el id de la liga por queryParam */}
                <Route path="/leaguePage" element={<LeaguesPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ModalManager />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter >
    </>
  );
}

export default App;
