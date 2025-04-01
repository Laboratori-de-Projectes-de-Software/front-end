import React, { useState } from 'react';

interface BotStats {
  victoria: number;
  empate: number;
  derrota: number;
}

interface BotDetailsProps {
  bot: {
    id: number;
    name: string;
    emotion: string;
    prompt: string;
    image: string;
    stats: BotStats;
  };
}

export default function BotDetails({ bot }: BotDetailsProps) {
  const [name, setName] = useState(bot.name);
  const [prompt, setPrompt] = useState(bot.prompt);
  const [image, setImage] = useState(bot.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="bg-zinc-700 rounded-xl w-full p-3 sm:p-6 relative flex flex-col gap-4">
        {/* Header con estadísticas y emoción */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">✌️</span>
              <span className="font-bold text-white">{bot.stats.victoria}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              <span className="font-bold text-white">{bot.stats.empate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💀</span>
              <span className="font-bold text-white">{bot.stats.derrota}</span>
            </div>
          </div>
          <div className="bg-zinc-800 px-3 py-1 rounded-full">
            <span className="text-white">{bot.emotion}</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-600 text-white rounded-xl py-2 px-4 pr-20"
                placeholder="Nombre del bot"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
                NAME
              </span>
            </div>

            <div className="relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-zinc-600 text-white rounded-xl py-2 px-4 min-h-[150px]"
                placeholder="Prompt del bot"
              />
              <span className="absolute top-2 right-2 bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
                PROMPT
              </span>
            </div>
          </div>

          <div className="flex-1 bg-zinc-600 rounded-xl flex items-center justify-center min-h-[300px]">
            <label className="cursor-pointer w-full h-full flex items-center justify-center p-4">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="bg-zinc-800 text-white px-4 py-2 rounded-full">
                  Upload Image
                </div>
              )}
              <input 
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};