import React from "react";

interface BotInfo {
  name: string;
  topic: string;
}

interface BotSidebarProps {
  bot: BotInfo;
  onSendMessage: (sender: string, text: string) => void;
}

const BotSidebar: React.FC<BotSidebarProps> = ({ bot, onSendMessage }) => {
  return (
    <aside className="w-1/6 bg-black flex flex-col justify-between items-center py-8">
      <h2 className="font-bold text-xl">{bot.name}</h2>
      <button
        onClick={() =>
          onSendMessage(bot.name, "Missatge de prova. A tope amb " + bot.topic)
        }
      >
        Simula Missatge
      </button>
      <p className="text-sm">Tema: {bot.topic}</p>
    </aside>
  );
};

export default BotSidebar;
