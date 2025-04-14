import { LeagueResponseDTO } from "@DTOClasses/LeagueDTO";
import React from "react";
import { useNavigate } from "react-router-dom"; 
import WhiteButton from "@components/WhiteButton";


interface LeagueBarProps {
  leagues: LeagueResponseDTO[];
  selectedLeagueId: number | null;
  onSelectLeague: (league: LeagueResponseDTO) => void;  
}

const LeagueBar: React.FC<LeagueBarProps> = ({ leagues, selectedLeagueId, onSelectLeague }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-black p-4 text-white min-h-screen">
      <WhiteButton className="w-full text-lg" onClick={() => navigate("/add-league")}>+ Add League</WhiteButton>
      
      {leagues.map((league) => (
        <button
        key={league.leagueId}
        className={`w-full py-2 mb-2 rounded-lg font-medium text-md ${
          selectedLeagueId === league.leagueId ? "bg-(--lliga-btn-sel)" : "bg-(--lliga-btn)"
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
