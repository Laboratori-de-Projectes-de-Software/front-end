import { BotDTO } from "@DTOClasses/BotDTO";
import React from "react";

interface BotSidebarProps {
  bot: BotDTO;
  onSendMessage: (sender: string, text: string) => void;
}

const BotSidebar: React.FC<BotSidebarProps> = ({ bot, onSendMessage }) => {
  return (
    <aside className="w-1/6 bg-black flex flex-col justify-between items-center py-8">
      <h2 className="font-bold text-xl">{bot.name}</h2>
      <button
        onClick={() =>
          onSendMessage(bot.id.toString(), "Missatge de prova. A tope amb " + bot.quality)
        }
      >
        Simula Missatge
      </button>
      <p className="text-sm">Tema: {bot.quality}</p>
    </aside>
  );
};

export default BotSidebar;
