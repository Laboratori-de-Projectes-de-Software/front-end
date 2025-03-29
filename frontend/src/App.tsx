import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterBot from "./pages/RegisterBot";
import RegisterLiga from "./pages/RegisterLiga";
import Dashboard from "./pages/Dashboard";

import "./styles.css";
import React from "react";

function AppContent() {
  const location = useLocation();

  // Rutas donde no queremos mostrar Navbar ni Footer
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="app-layout">
      {!hideLayout && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerBot" element={<RegisterBot />} />
          <Route path="/registerLiga" element={<RegisterLiga onSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
