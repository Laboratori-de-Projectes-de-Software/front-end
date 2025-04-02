import React, { useState } from "react";
import BotDetails from "./BotDetails";

interface Bot {
  id: number;
  name: string;
  emotion: string;
  image: string;
  user: string;
}

const initialBots: Bot[] = [
  {
    id: 1,
    name: "BOT 1",
    emotion: "TRISTEZA",
    image: "/bots/tristeza.png",
    user: "/users/user1.jpg",
  },
  {
    id: 2,
    name: "BOT 2",
    emotion: "ASCO",
    image: "/public/inside/asco.jpg",
    user: "/users/user2.jpg",
  },
  {
    id: 3,
    name: "BOT 3",
    emotion: "ALEGRÍA",
    image: "/bots/alegria.png",
    user: "/users/user3.jpg",
  },
  {
    id: 4,
    name: "BOT 4",
    emotion: "IRA",
    image: "/bots/ira.png",
    user: "/users/user4.jpg",
  },
  {
    id: 5,
    name: "BOT 5",
    emotion: "ENVIDIA",
    image: "/public/inside/envy.webp",
    user: "/users/user5.jpg",
  },
  {
    id: 6,
    name: "BOT 6",
    emotion: "MIEDO",
    image: "/bots/miedo.png",
    user: "/users/user6.jpg",
  },
  {
    id: 7,
    name: "BOT 7",
    emotion: "VERGÜENZA",
    image: "/bots/verguenza.png",
    user: "/users/user7.jpg",
  },
  {
    id: 8,
    name: "BOT 8",
    emotion: "ANSIEDAD",
    image: "/public/inside/ansiedad.jpeg",
    user: "/users/user8.jpg",
  },
];

export const BotList = () => {
  const [bots, setBots] = useState<Bot[]>(initialBots);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clickedBot, setClickedBot] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleBotClick(botId: number) {
    // Aquí puedes manejar la lógica para abrir el modal o redirigir a otra página
    setClickedBot(botId);
    console.log("Bot clicked:", botId);
  }

  function handleOnClose() {
    // Aquí puedes manejar la lógica para cerrar el modal o volver a la lista de bots
    setClickedBot(null);
  }

  if (clickedBot) {
    const selectedBot = bots.find((bot) => bot.id === clickedBot);
    if (!selectedBot) return null;

    // Completamos datos que no estén presentes en BotList con valores por defecto
    const botDetailsData = {
      ...selectedBot,
      prompt: "Prompt del bot", // dato por defecto; puedes reemplazarlo con el valor real
      stats: { victoria: 0, empate: 0, derrota: 0 }, // datos de estadística por defecto
    };

    // Todo : Poder volver atras
    return <BotDetails bot={botDetailsData} onClose={handleOnClose} />;
  }

  return (
    <div className="w-full p-4">
      <div className="bg-slate-900 border border-gray-700 rounded-xl w-full p-6 relative flex flex-col gap-6">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-full px-4 py-2 bg-slate-800 text-white shadow-md text-sm"
          />
          <button className="bg-black/70 border border-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black/90">
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

        {/* Grid de Bots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredBots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onClick={() => handleBotClick(bot.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface BotCardProps {
  bot: Bot;
  onClick?: () => void;
}
const BotCard: React.FC<BotCardProps> = ({ bot, onClick }) => {
  const botUrl = bot.name.toLowerCase().replace(/\s+/g, "");

  return (
    <a
      // href={`/auth/bots/${botUrl}`}
      onClick={onClick}
      className="group flex flex-col bg-slate-900 border border-gray-700 rounded-xl hover:shadow-md transition"
    >
      <div className="relative rounded-t-xl overflow-hidden">
        <img
          src={bot.image}
          alt={bot.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50" />
        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium border border-gray-700">
          {bot.emotion}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <img
            src={bot.user}
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-600">
              {bot.name}
            </h3>
            <p className="text-sm text-white">Created by User</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between p-4 border-t border-gray-700">
        <div className="flex space-x-4">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
              />
            </svg>
            <span className="text-xs text-white">12</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
            <span className="text-xs text-white">3</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-xs text-white">5</span>
          </div>
        </div>
        <button className="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-700 bg-black/70 text-white hover:bg-black/90">
          Ver detalles
        </button>
      </div>
    </a>
  );
};
