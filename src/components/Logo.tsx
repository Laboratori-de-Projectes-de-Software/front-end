import React from "react";
import logo from "../assets/robot.svg"; // Ajusta la ruta si es necesario
import "./Logo.css";

const Logo: React.FC = () => {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
        </div>
    );
};

export default Logo;
