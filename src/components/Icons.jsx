import React from "react";
import { FaPlus, FaTrophy, FaHistory, FaRobot } from "react-icons/fa";

export default function Icons() {
  return (
    <div className="icon-container">
      <div className="icon-circle">
        <FaPlus className="text-white text-3xl"/>
      </div>
      <div className="icon-circle">
        <FaTrophy className="text-white text-3xl"/>
      </div>
      <div className="icon-circle">
        <FaHistory className="text-white text-3xl"/>
      </div>
      <div className="icon-circle">
        <FaRobot className="text-white text-3xl"/>
      </div>
    </div>
  );
}
