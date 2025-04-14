import { useEffect, useState } from "react";
import LeagueCard from "../LeagueCard";

interface LeagueProps {
  leagueId: number;
  state: string;
  name: string;
  urlImagen: string;
  user: number;
  matchTime: string;
  rounds: number;
  bots: number[];
}

export default function HistorySearcher() {
  // Guardamos los bots en un array

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<LeagueProps[]>([]);

  useEffect(() => {
    // Peticion a http://localhost:8080/league
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/league");
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const data = await response.json();
        setSearchResults(data);
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  // Función para buscar por el nombre de la liga
  const [allLeagues, setAllLeagues] = useState<LeagueProps[]>([]); // Store all leagues

  useEffect(() => {
    // Peticion a http://localhost:8080/league
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/league");
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const data = await response.json();
        setAllLeagues(data); // Store all fetched leagues
        setSearchResults(data); // Initialize search results with all leagues

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  // Función para buscar por el nombre de la liga
  const onSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    // Filter from the original list of all leagues
    const results = allLeagues.filter((league) =>
      league.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results); // Update the displayed results
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      <input
        type="text"
        placeholder="Search by league..."
        className="border p-2 rounded w-full rounded-4xl text-center"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Enseña las cartas de los bots */}
        {searchResults.map((bot, index) => (
          <LeagueCard key={index} {...bot} />
        ))}
      </div>
    </div>
  );
}
