import React from "react";

interface AddLeagueBarProps {
  leagues: string[]; // Llista de lligues a mostrar
  selectedLeague: string; // LLiga a marcar
  onSelectLeague: (league: string) => void; // Per si s'ha ed actualizar
}

const AddLeagueBar: React.FC<AddLeagueBarProps> = ({ leagues, selectedLeague, onSelectLeague }) => {
  return (
        
        <aside className="w-1/4 bg-black p-4 text-white min-h-screen">
        <button className="w-full bg-white text-black py-2 mb-4  rounded-lg font-bold text-lg">+ Add League</button>
        {leagues.map((league) => (
        <button
            key={league}
            className={`w-full py-2 mb-2 rounded-lg font-medium text-md ${
            selectedLeague === league ? "bg-(--lliga-btn-sel)" : "bg-(--lliga-btn)"
            }`}
            onClick={() => onSelectLeague(league)}
        >
            {league}
        </button>
        ))}
    </aside>
    )
}

export default AddLeagueBar;