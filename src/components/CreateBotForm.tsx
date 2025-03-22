import React, { useState } from "react";

interface CreateBotForm {
  name: string;
  prompt: string;
  referenceUrl: string;
  image: string | null;
}

export const CreateBotForm = ({ className }: { className?: string }) => {
  const [form, setForm] = useState<CreateBotForm>({
    name: "",
    prompt: "",
    referenceUrl: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

  };

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="bg-zinc-700 rounded-xl w-full p-3 sm:p-6 relative flex flex-col gap-4 sm:gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row w-full gap-4 sm:gap-6">
          
          <div className="flex-1 bg-zinc-600 rounded-xl flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
            <label htmlFor="upload" className="cursor-pointer w-full h-full flex items-center justify-center p-4">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="bg-[#222] hover:bg-[#333] text-white px-4 py-2 rounded-full text-sm sm:text-base">
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
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            {/* Prompt textarea */}
            <div className="bg-zinc-600 rounded-xl p-3 sm:p-4 relative min-h-[120px] sm:min-h-[150px]">
              <div className="absolute top-0 right-0 bg-zinc-800 text-white text-xs px-2 sm:px-3 py-1 rounded-bl-xl">
                PROMPT
              </div>
              <textarea 
                className="w-full h-full bg-transparent text-white placeholder-zinc-400 focus:outline-none resize-none text-sm sm:text-base"
                placeholder="Escribe el prompt..."
                value={form.prompt}
                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
              />
            </div>

            {/* Name input */}
            <div className="relative">
              <input 
                type="text"
                className="w-full bg-zinc-600 text-white rounded-xl py-2 px-3 sm:px-4 pr-16 sm:pr-20 text-sm sm:text-base"
                placeholder="Nombre del bot"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white text-xs px-2 sm:px-3 py-1 rounded-full">
                NAME
              </span>
            </div>

            {/* URL input */}
            <div className="relative">
              <input 
                type="text"
                className="w-full bg-zinc-600 text-white rounded-xl py-2 px-3 sm:px-4 pr-16 sm:pr-20 text-sm sm:text-base"
                placeholder="URL de referencia"
                value={form.referenceUrl}
                onChange={(e) => setForm({ ...form, referenceUrl: e.target.value })}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white text-xs px-2 sm:px-3 py-1 rounded-full">
                URL
              </span>
            </div>

            {/* Submit button */}
            <button 
              type="submit"
              className="bg-gray-400 hover:bg-gray-300 text-black rounded-full py-2 sm:py-3 mt-2 font-bold text-sm sm:text-base"
            >
              Create Bot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBotForm;