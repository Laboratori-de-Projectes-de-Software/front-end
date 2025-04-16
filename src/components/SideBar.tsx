import React from "react";
import { Link } from "react-router-dom"; // updated import for react-router-dom

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-blocks">
        <Link to="/">
          <div className="sidebar-item">Home</div>
        </Link>
        <Link to="/misLigas">
          <div className="sidebar-item">Mis Ligas</div>
        </Link>
        <Link to="/startLeague">
          <div className="sidebar-item">Start Liga</div>
        </Link>
        <Link to="/account">
          <div className="sidebar-item">Account</div>
        </Link>
        <Link to="/leaguecreation">
          <div className="sidebar-item">Create League</div>
        </Link>
        <Link to="/addia">
          <div className="sidebar-item">Add AIs</div>
        </Link>
      </div>
      <div className="sidebar-exit">Exit</div>
    </div>
  );
};

export default SideBar;
