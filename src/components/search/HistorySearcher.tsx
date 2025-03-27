import { useState } from "react";
import BotCard from "../BotCard";

interface BotCardProps {
  liga: string;
  fecha: string;
  participantes: number;
  nombre_ganador: string;
  img_ganador: string;
  puntos_ganador: number;
}

export default function HistorySearcher() {
  // Guardamos los bots en un array
  const searchHistory: BotCardProps[] = [
    {
      liga: "Champions League",
      fecha: "2023-05-28",
      participantes: 32,
      nombre_ganador: "Manchester City",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/281.png?lm=1683544584",
      puntos_ganador: 95,
    },
    {
      liga: "Premier League",
      fecha: "2023-05-28",
      participantes: 20,
      nombre_ganador: "Arsenal",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/11.png?lm=1683544944",
      puntos_ganador: 84,
    },
    {
      liga: "La Liga",
      fecha: "2023-05-28",
      participantes: 20,
      nombre_ganador: "Real Madrid",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/418.png?lm=1683544676",
      puntos_ganador: 87,
    },
    {
      liga: "Bundesliga",
      fecha: "2023-05-27",
      participantes: 18,
      nombre_ganador: "Bayern Munich",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/27.png?lm=1683544612",
      puntos_ganador: 78,
    },
    {
      liga: "Serie A",
      fecha: "2023-05-28",
      participantes: 20,
      nombre_ganador: "Napoli",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/6399.png?lm=1661949255",
      puntos_ganador: 90,
    },
    {
      liga: "Ligue 1",
      fecha: "2023-05-27",
      participantes: 20,
      nombre_ganador: "Paris Saint-Germain",
      img_ganador:
        "https://tmssl.akamaized.net/images/wappen/verysmall/583.png?lm=1683544571",
      puntos_ganador: 85,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] =
    useState<BotCardProps[]>(searchHistory);

  // Función para buscar por el nombre de la liga
  const onSearch = (searchTerm: string) => {
    // Contengan
    const results = searchHistory.filter((bot) =>
      bot.liga.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchTerm(searchTerm);
    setSearchResults(results);
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
          <BotCard key={index} {...bot} />
        ))}
      </div>
    </div>
  );
}
