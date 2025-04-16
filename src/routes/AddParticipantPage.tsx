import React, { useState } from "react";
import WhiteButton from "@components/WhiteButton";
import { registerBot } from "@use-cases/UseCases";
import { CreateBotDTO } from "@DTOClasses/BotDTO";


const AddParticipantPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");

  const handleSubmit = async (botData: CreateBotDTO) => {
    console.log({ name, quality, imageUrl, apiUrl });
    // Send to backend
    const bot = await registerBot(botData);

    if(bot && bot.id) {
      alert("Registration succesful");
    } else {
      alert("Fail to register bot");
    }
  };

  return (
    <div className="min-h-full min-w-full flex flex-col gap-y-4 items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Add participant</h1>
      <form onSubmit={() => handleSubmit({name, quality, imageUrl, apiUrl})}>
        <div className="flex gap-5 my-6">
          <label htmlFor="Name" className="block text-left mb-2 font-bold text-2xl h-full w-64">Name </label>
          <input
            type="text"
            id="Name"
            className="w-full p-2 rounded bg-(--input-bkg) text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-5 my-6">
          <label htmlFor="Quality" className="block text-left mb-2 font-bold text-2xl h-full w-64">Quality </label>
          <input
            type="text"
            id="Quality"
            className="w-full p-2 rounded bg-(--input-bkg) text-white"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          />
        </div>

        <div className="flex gap-5 my-6">
          <label htmlFor="Image URL" className="block text-left mb-2 font-bold text-2xl h-full w-64">Image URL </label>
          <input
            type="text"
            id="Image URL"
            className="w-full p-2 rounded bg-(--input-bkg) text-white"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="flex gap-5 my-6">
          <label htmlFor="API URL" className="block text-left mb-2 font-bold text-2xl h-full w-64">API URL </label>
          <input
            type="text"
            id="API URL"
            className="w-full p-2 rounded bg-(--input-bkg) text-white"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>
        
        <WhiteButton type="submit" className="block mx-auto mt-20 w-1/2 h-16 text-2xl" >Add</WhiteButton>
      </form>
    </div>
  );
};

export default AddParticipantPage;
