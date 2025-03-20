import React from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Importa useNavigate

interface AddLeagueBarProps {
  leagues: string[]; // Llista de lligues a mostrar
  selectedLeague: string; // LLiga a marcar
  onSelectLeague: (league: string) => void; // Per si s'ha de actualizar
}

const AddLeagueBar: React.FC<AddLeagueBarProps> = ({ leagues, selectedLeague, onSelectLeague }) => {
  const navigate = useNavigate(); // 🔹 Hook per navegar

  return (
    <aside className="w-1/4 bg-black p-4 text-white min-h-screen">
      <button 
        className="w-full bg-white text-black py-2 mb-4 rounded-lg font-bold text-lg 
        hover:cursor-pointer hover:bg-gray-200 transition duration-100"
        onClick={() => navigate("/add-league")} // 🔹 Navega a la pàgina d'afegir lligues
      >
        + Add League
      </button>
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
  );
};

export default AddLeagueBar;
