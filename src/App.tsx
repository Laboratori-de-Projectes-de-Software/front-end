import "./App.css";
import Header from "./modules/shared/header/Header";
import AuthProvider from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import LeaguesPage from "./pages/leagues-page/leaguesPage.tsx";
import ModalManager from "./modules/modalManager/ModalManager.tsx";
import { ModalProvider } from "./modules/modalManager/ModalProvider.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import UserInfo from "./pages/user-info/UserInfo.tsx";
import NewBot from "./pages/new-bot/NewBot.tsx";
import LeaguePage from "./pages/league/leaguePage.tsx";
import MatchPage from "./pages/match-page/matchPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/leagues" element={<LeaguesPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/user" element={<UserInfo />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/league/:id" element={<LeaguePage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/match" element={<MatchPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/new-bot" element={<NewBot />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ModalManager />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter >
    </>
  );
}

export default App;
