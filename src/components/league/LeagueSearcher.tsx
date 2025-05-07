import { useEffect, useState } from "react";
import LeagueCard from "../LeagueCard";
import LeagueInfo from "./LeagueInfo";
import { getUserInfo } from "../../utils/auth";

export interface LeagueProps {
  leagueId: number;
  estado: string;
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
  const [selectedResult, setSelected] = useState<LeagueProps | null>(null);
  const [filtrado, setFiltrado] = useState<boolean>(false);
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

  // Función para filtrar ligas por usuario
  function filterByMe(userId: number): void {
    // Peticion fetch a /league?owner={userId}
    const response = fetch(`http://localhost:8080/league?owner=${userId}`);

    response
      .then((res) => {
        if (!res.ok) {
          console.error("API response error:", res.status);
          setSearchResults([]); // Set empty array on error
          return;
        }
        res.json().then((data) => setSearchResults(data));
      })
      .catch((error) => {
        console.error("Failed to fetch leagues by owner:", error);
        setSearchResults([]);
      });
  }

  if (selectedResult) {
    return (
      <LeagueInfo
        leagueId={selectedResult.leagueId}
        estado={selectedResult.estado}
        name={selectedResult.name}
        urlImagen={selectedResult.urlImagen}
        user={selectedResult.user}
        matchTime={selectedResult.matchTime}
        rounds={selectedResult.rounds}
        bots={selectedResult.bots}
        onClick={() => setSelected(null)} // Close the selected league
      />
    );
  }

  return (
    <div className="container mx-auto p-4 hover:cursor-pointer">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="Search by league..."
          className="border p-2 rounded w-full rounded-4xl text-center"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          className="bg-black/70 border border-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
          onClick={() => {
            if (filtrado) {
              setFiltrado(false);
              // Volver a cargar todas las ligas
              setSearchResults(allLeagues);
              return;
            }

            filterByMe(getUserInfo().id);
            setFiltrado(true);
          }}
          // Hover title
          title={filtrado ? "Ver todas las ligas" : "Ver mis ligas"}
        >
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 12.586V17a1 1 0 01-.553.894l-4 2a1 1 0 01-1.447-1.105V12.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Enseña las cartas de los bots */}
        {searchResults.map((bot, index) => (
          <LeagueCard key={index} {...bot} onClick={() => setSelected(bot)} />
        ))}
      </div>
    </div>
  );
}
