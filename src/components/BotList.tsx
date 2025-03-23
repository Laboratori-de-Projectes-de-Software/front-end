import React, { useState } from "react";

interface Bot {
  id: number;
  name: string;
  emotion: string;
  image: string;
  user: string;
}

const initialBots: Bot[] = [
  { id: 1, name: "BOT 1", emotion: "TRISTEZA", image: "/bots/tristeza.png", user: "/users/user1.jpg" },
  { id: 2, name: "BOT 2", emotion: "ASCO", image: "/public/inside/asco.jpg", user: "/users/user2.jpg" },
  { id: 3, name: "BOT 3", emotion: "ALEGRÍA", image: "/bots/alegria.png", user: "/users/user3.jpg" },
  { id: 4, name: "BOT 4", emotion: "IRA", image: "/bots/ira.png", user: "/users/user4.jpg" },
  { id: 5, name: "BOT 5", emotion: "ENVIDIA", image: "/public/inside/envy.webp", user: "/users/user5.jpg" },
  { id: 6, name: "BOT 6", emotion: "MIEDO", image: "/bots/miedo.png", user: "/users/user6.jpg" },
  { id: 7, name: "BOT 7", emotion: "VERGÜENZA", image: "/bots/verguenza.png", user: "/users/user7.jpg" },
  { id: 8, name: "BOT 8", emotion: "ANSIEDAD", image: "/public/inside/ansiedad.jpeg", user: "/users/user8.jpg" },
];

export const BotList = () => {
  const [bots, setBots] = useState<Bot[]>(initialBots);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <div className="bg-zinc-700 rounded-xl w-full p-3 sm:p-6 relative flex flex-col gap-4 sm:gap-6">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-full px-4 py-2 bg-white shadow-md text-sm"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold">
            FILTERS
          </button>
        </div>

        {/* Bot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredBots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface BotCardProps {
  bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={bot.image}
        alt={bot.name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-full">
        {bot.emotion}
      </div>
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        <img
          src={bot.user}
          alt="user"
          className="w-6 h-6 rounded-full border-2 border-white"
        />
        <span className="text-white text-xs font-bold bg-black px-2 py-1 rounded-full">
          {bot.name}
        </span>
      </div>
    </div>
  );
};