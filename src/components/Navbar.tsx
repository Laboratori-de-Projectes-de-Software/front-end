import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";
import {
  fetchCurrentUserInfo,
  handleLogout,
} from "../controllers/UserController";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  //const [username, setUsername] = useState("Usuario");
  const username = localStorage.getItem("user") ?? "Usuario"; // Cambiado a localStorage
  const userMenuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // Si no se pasa un nombre de usuario como prop, intentamos obtenerlo del API
  //   if (!propUsername) {
  //     fetchCurrentUserInfo(setUsername);
  //   } else {
  //     setUsername(propUsername);
  //   }
  // }, [propUsername]);

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); // Cerrar el menú después de navegar
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Sección derecha: información de usuario */}
        <div className="navbar-right">
          <div className="user-info" onClick={toggleUserMenu}>
            <span className="username">{username}</span>
            <div className="user-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
          {userMenuOpen && (
            <div className="user-menu" ref={userMenuRef}>
              <ul>
                <li onClick={() => navigate("/account")}>Tu cuenta</li>
                <li onClick={() => handleLogout(navigate)}>Cerrar sesión</li>
              </ul>
            </div>
          )}
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
