import React from "react";
import { useNavigate } from "react-router-dom"; 

interface League {
  id: number;
  name: string;
  ownerId: number;
}

interface LeagueBarProps {
  leagues: League[];
  selectedLeagueId: number | null;
  onSelectLeague: (league: League) => void;  
}

const LeagueBar: React.FC<LeagueBarProps> = ({ leagues, selectedLeagueId, onSelectLeague }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-black p-4 text-white min-h-screen">
      <button 
        className="w-full bg-white text-black py-2 mb-4 rounded-lg font-bold text-lg hover:cursor-pointer hover:bg-gray-200 transition duration-100"
        onClick={() => navigate("/add-league")}
      >
        + Add League
      </button>
      {leagues.map((league) => (
        <button
        key={league.id}
        className={`w-full py-2 mb-2 rounded-lg font-medium text-md ${
          selectedLeagueId === league.id ? "bg-(--lliga-btn-sel)" : "bg-(--lliga-btn)"
        }`}
        onClick={() => onSelectLeague(league)}
      >
        {league.name}
      </button>
      ))}
    </aside>
  );
};
export default LeagueBar;
