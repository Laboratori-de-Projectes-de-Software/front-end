import "./App.css";
import Header from "./modules/shared/header/Header";
import AuthProvider from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import LeaguesPage from "./pages/league-page/leagues-page.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            // TODO: Añadir la home
            <Route path="/" element={<h1>Home</h1>} />
            <Route element={<PrivateRoute />}>
            </Route>
              <Route path="/league" element={<LeaguesPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
