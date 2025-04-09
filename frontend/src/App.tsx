import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterBot from "./pages/RegisterBot";
import RegisterLiga from "./pages/RegisterLiga";
import Dashboard from "./pages/Dashboard";
import League from "./pages/League";

import "./styles.css";

function AppContent() {
  const location = useLocation();

  // Rutas donde no queremos mostrar Navbar ni Footer
  // Ocultar navbar/footer en /login, /register y /dashboard
const hideLayout = ["/login", "/register", "/dashboard"].includes(location.pathname);

  return (
    <div className="app-layout">
      {!hideLayout && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerBot" element={<RegisterBot />} />
          <Route path="/registerLiga" element={<RegisterLiga />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/league" element={<League />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
