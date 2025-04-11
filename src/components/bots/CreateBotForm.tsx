import React, { useState } from "react";
import { sendAuthedRequest, getUserInfo } from "../../utils/auth";

const url_create_bot = "http://localhost:8080/bot";

interface CreateBotForm {
  name: string;
  userId: number;
  description: string;
  urlImagen: string;
  endpoint: string;
}

export const CreateBotForm = ({ className }: { className?: string }) => {
  const [form, setForm] = useState<CreateBotForm>({
    name: "",
    description: "",
    urlImagen: "",
    endpoint: "",
    userId: getUserInfo().id,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, urlImagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const promise = await sendAuthedRequest("POST", url_create_bot, form);

    if (promise.status === 201) {
      const data = await promise.json();
      console.log("Bot creado con éxito:", data);
      // Aquí puedes manejar la respuesta del servidor
      setSuccess("Bot creado con éxito: " + data.name);
      setError("");
      setForm({
        name: "",
        description: "",
        urlImagen: "",
        endpoint: "",
        userId: getUserInfo().id,
      });
      setImagePreview("");
    } else {
      const errorData = await promise.json();
      console.error("Error al crear el bot:", errorData);
      // Aquí puedes manejar el error
      setError("Error al crear el bot: " + errorData.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="bg-slate-900 border border-gray-700 rounded-xl w-full p-6 relative flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Imagen Upload */}
          <div className="flex-1 bg-slate-800 rounded-xl border border-gray-700 overflow-hidden">
            <label
              htmlFor="upload"
              className="cursor-pointer w-full h-full flex items-center justify-center min-h-[300px] relative group"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="bg-black/70 text-white px-4 py-2 rounded-full border border-gray-700 group-hover:bg-black/90 transition-colors">
                  Upload Image
                </div>
              )}
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </div>

          {/* Form fields section */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Prompt textarea */}
            <div className="relative">
              <textarea
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 min-h-[200px] border border-gray-700 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Escribe el prompt..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                PROMPT
              </span>
            </div>

            {/* Name input */}
            <div className="relative">
              <input
                type="text"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 pr-20 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="Nombre del bot"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                NAME
              </span>
            </div>

            {/* URL input */}
            <div className="relative">
              <input
                type="text"
                className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 pr-20 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                placeholder="URL de referencia"
                value={form.endpoint}
                onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-gray-700">
                URL
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="py-2.5 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 mt-2"
            >
              Create Bot
            </button>

            {/* SUCCESS */}
            {success && (
              <div className="text-green-500 text-sm mt-2">{success}</div>
            )}
            {/* ERROR */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBotForm;
