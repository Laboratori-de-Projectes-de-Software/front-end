import React, { useState } from "react";

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
  onClose: () => void;
}

export default function BotDetails({ bot, onClose }: BotDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(bot.name);
  const [prompt, setPrompt] = useState(bot.prompt);
  const [image, setImage] = useState(bot.image);

  // Guardamos los valores originales para poder cancelar
  const handleCancel = () => {
    setName(bot.name);
    setPrompt(bot.prompt);
    setImage(bot.image);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando cambios:", { name, prompt, image });
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full p-4">
      {/* Botón para volver atrás: flechita apuntando a la izquierda */}
      <button
        onClick={onClose}
        className="my-4 p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="bg-slate-900 border border-gray-700 rounded-xl w-full p-6 relative flex flex-col gap-6">
        {/* Header con estadísticas, emoción y botón de editar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
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
              <span className="text-white">{bot.stats.victoria}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <span className="text-white">{bot.stats.empate}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
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
              <span className="text-white">{bot.stats.derrota}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium border border-gray-700">
              {bot.emotion}
            </span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-700 bg-black/70 text-white hover:bg-black/90"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                Editar
              </button>
            )}
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
                disabled={!isEditing}
                className={`w-full bg-slate-800 text-white rounded-xl py-3 px-4 pr-20 border border-gray-700 
                  ${
                    isEditing
                      ? "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                      : "opacity-75 cursor-default"
                  }`}
                placeholder="Nombre del bot"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                NAME
              </span>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-800 text-white rounded-xl py-3 px-4 min-h-[200px] border border-gray-700 resize-none
                  ${
                    isEditing
                      ? "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                      : "opacity-75 cursor-default"
                  }`}
                placeholder="Prompt del bot"
              />
              <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                PROMPT
              </span>
            </div>
          </div>

          <div className="flex-1 bg-slate-800 rounded-xl border border-gray-700 overflow-hidden">
            <label
              className={`w-full h-full flex items-center justify-center min-h-[300px] relative group 
              ${isEditing ? "cursor-pointer" : "cursor-default"}`}
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="bg-black/70 text-white px-4 py-2 rounded-full border border-gray-700 group-hover:bg-black/90 transition-colors">
                  Upload Image
                </div>
              )}
              {isEditing && (
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              )}
            </label>
          </div>
        </div>

        {/* Botones de acción */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="py-2.5 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-700 bg-black/70 text-white hover:bg-black/90"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="py-2.5 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
