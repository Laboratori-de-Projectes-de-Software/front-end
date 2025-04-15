import "react";

import type { LeagueCardProps } from "../LeagueCard";
export default function LeagueInfo(league: LeagueCardProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-gray-100">
      {/* Top Bar: Return Button */}
      <div className="flex justify-start p-4 sticky top-0 bg-zinc-800 z-10 shadow-md">
        <button
          onClick={league.onClick}
          className="bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 transition duration-150 ease-in-out"
        >
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center py-6 px-4">
        <h1
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-2xl md:text-3xl lg:text-4xl font-bold px-6 py-3 rounded-xl shadow-lg"
          title={league.name}
        >
          {league.name}
        </h1>
      </div>

      {/* Pills Section */}
      <div className="flex flex-wrap justify-center items-center gap-3 p-4 bg-zinc-700/50 rounded-lg mx-4 md:mx-8 lg:mx-12 mb-6 shadow">
        <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-colors">
          Participants: {league.bots.length}
        </span>
        <span className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors">
          Rounds: {league.rounds}
        </span>
        <span className="bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-600 transition-colors">
          Match Time: {league.matchTime}
        </span>
        <span className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-600 transition-colors">
          State: {league.estado}
        </span>
      </div>

      {/* Main Content Area (Responsive Columns) */}
      <div className="flex flex-col md:flex-row flex-grow p-4 md:p-6 lg:p-8 gap-6">
        {/* Left Column: Leaderboard */}
        <div className="w-full md:w-1/3 bg-zinc-800 rounded-lg shadow-xl p-5 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Leaderboard
          </h3>
          <div className="flex-grow overflow-y-auto">
            {" "}
            {/* Added for potential scroll */}
            {/* Placeholder for leaderboard content */}
            <ul className="space-y-2 text-base">
              {/* Example Leaderboard Item - Repeat for actual data */}
              <li className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm">
                <span className="font-medium text-gray-200">Player 1</span>
                <span className="font-semibold text-green-400">1500</span>
              </li>
              <li className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm">
                <span className="font-medium text-gray-200">Player 2</span>
                <span className="font-semibold text-green-400">1450</span>
              </li>
              <li className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm">
                <span className="font-medium text-gray-200">Player 3</span>
                <span className="font-semibold text-green-400">1400</span>
              </li>
              <li className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm">
                <span className="font-medium text-gray-200">Player 4</span>
                <span className="font-semibold text-green-400">1350</span>
              </li>
              {/* Add more players as needed */}
            </ul>
          </div>
        </div>

        {/* Right Column: League Details & Image */}
        <div className="w-full md:w-2/3 flex flex-col space-y-6">
          {/* Display League Image */}
          {league.urlImagen && (
            <div className="flex justify-center items-center bg-zinc-800 rounded-lg shadow-xl p-4">
              <img
                src={league.urlImagen}
                alt={`${league.name} league banner`} // More descriptive alt text
                className="rounded-md object-contain max-h-60 md:max-h-80 shadow-lg" // Adjusted styling for better containment
              />
            </div>
          )}

          {/* Optional: Add more details or sections here if needed */}
          {/* Example: A section for rules or description */}
          {/*
          <div className="bg-zinc-800 rounded-lg shadow-xl p-5">
            <h4 className="text-lg font-semibold mb-3 text-gray-300">Description</h4>
            <p className="text-gray-400 text-sm">
              {league.description || "No description available."}
            </p>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
