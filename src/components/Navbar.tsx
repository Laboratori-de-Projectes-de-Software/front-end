import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";
import Button from "./Button";

interface NavbarProps {
  username?: string;
}

const Navbar: React.FC<NavbarProps> = ({ username = "Usuario" }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Aquí implementarías la lógica de logout (borrar token, etc.)
    navigate("/");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); // Cerrar el menú después de navegar
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        {/* Sección izquierda: menú de navegación */}
        <div className="navbar-left">
          <ul className="navbar-menu">
            <li onClick={() => navigate("/dashboard")}>Inicio</li>
            <li onClick={() => navigate("/mybots")}>Mis Bots</li>
            <li onClick={() => navigate("/leagues")}>Ligas</li>
            <li onClick={() => navigate("/matches")}>Enfrentamientos</li>
          </ul>
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Sección central: logo */}
        <div className="navbar-center">
          <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
            <Logo />
          </div>
        </div>

        {/* Sección derecha: información de usuario y botón de logout */}
        <div className="navbar-right">
          <div className="user-info">
            <span className="username">{username}</span>
            <div className="user-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
          <Button onClick={handleLogout} label="Salir" className="logout-button"/>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          <li onClick={() => navigateTo("/dashboard")}>Inicio</li>
          <li onClick={() => navigateTo("/mybots")}>Mis Bots</li>
          <li onClick={() => navigateTo("/leagues")}>Ligas</li>
          <li onClick={() => navigateTo("/matches")}>Enfrentamientos</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
