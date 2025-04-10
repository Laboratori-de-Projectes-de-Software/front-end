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
import LeaguePage from "./pages/league/leaguePage.tsx";

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
                <Route path="/leagues" element={<LeaguesPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/leaguePage/:id" element={<LeaguePage />} />
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
