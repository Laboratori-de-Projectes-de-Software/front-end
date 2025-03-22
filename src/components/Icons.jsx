import React from "react";
import { FaPlus, FaTrophy, FaHistory, FaRobot } from "react-icons/fa";

export default function Icons() {
  const handleCreateClick = () => {
    window.location.href = "/createbot";
  };

  const handleTrophyClick = () => {
    window.location.href = "/tournament";
  };

  const handleHistoryClick = () => {
    window.location.href = "/history";
  };

  const handleRobotClick = () => {
    window.location.href = "/bots";
  };
  return (
    <div className="icon-container">
      <div className="icon-circle" onClick={handleCreateClick} role="button">
        <FaPlus className="text-white text-3xl" />
      </div>
      <div className="icon-circle" onClick={handleTrophyClick} role="button">
        <FaTrophy className="text-white text-3xl" />
      </div>
      <div className="icon-circle" onClick={handleHistoryClick} role="button">
        <FaHistory className="text-white text-3xl" />
      </div>
      <div className="icon-circle" onClick={handleRobotClick} role="button">
        <FaRobot className="text-white text-3xl" />
      </div>
    </div>
  );
}
