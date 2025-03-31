import PerfilPage from "./pages/PerfilPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<PerfilPage />} /> {/* Ruta para el perfil */}
          </Routes>
      </Router>
  )
}
