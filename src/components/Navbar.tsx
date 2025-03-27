import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

interface NavbarProps {
  username?: string;
}

const Navbar: React.FC<NavbarProps> = ({ username = "Usuario" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí implementarías la lógica de logout (borrar token, etc.)
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
          <Logo />
        </div>
        <ul className="navbar-menu">
          <li onClick={() => navigate("/dashboard")}>Inicio</li>
          <li onClick={() => navigate("/mybots")}>Mis Bots</li>
          <li onClick={() => navigate("/leagues")}>Ligas</li>
          <li onClick={() => navigate("/matches")}>Enfrentamientos</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <span className="username">{username}</span>
          <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
