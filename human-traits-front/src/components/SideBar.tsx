import React from "react";
import { Link } from "react-router";

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Sección de bloques principales */}
      <div className="sidebar-blocks">
        <Link to="/">
            <div className="sidebar-item">Home</div>
        </Link>
        <div className="sidebar-item">Scores</div>
        <Link to="/">
            <div className="sidebar-item">Account</div>
        </Link>
      </div>
      
      {/* Bloque de Exit abajo */}
      <div className="sidebar-exit">Exit</div>
    </div>
  );
};

export default SideBar;

