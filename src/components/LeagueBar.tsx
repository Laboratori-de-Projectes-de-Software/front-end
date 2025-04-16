import { LeagueDTO } from "@DTOClasses/LeagueDTO";
import React from "react";
import { useNavigate } from "react-router-dom"; 
import WhiteButton from "@components/WhiteButton";


interface LeagueBarProps {
  leagues: LeagueDTO[];
  selectedLeagueId: number | null;
  onSelectLeague: (league: LeagueDTO) => void;  
}

const LeagueBar: React.FC<LeagueBarProps> = ({ leagues, selectedLeagueId, onSelectLeague }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/5 bg-black p-4 text-white min-h-screen">
      <WhiteButton className="w-full text-lg my-3 mb-6" onClick={() => navigate("/add-league")}>+ Add League</WhiteButton>
      <div className="flex flex-col gap-y-1">
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
      </div>
    </aside>
  );
};
export default LeagueBar;
