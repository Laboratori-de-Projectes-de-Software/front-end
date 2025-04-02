import "react";

import Layout from "../../layouts/Layout.astro";
import AplicationLayout from "../../layouts/AplicationLayout.astro";
import BotDetails from "../../components/BotDetails";

interface BotProps {
  id: number;
  name: string;
  emotion: string;
  prompt: string;
  image: string;
  stats: {
    victoria: number;
    empate: number;
    derrota: number;
  };
}

export default function BotDescription({ bot }: { bot: BotProps }) {
  return (
    <div className="bot-description">
      <h2>{bot.name}</h2>
      <img src={bot.image} alt={bot.name} />
      <p>Emotion: {bot.emotion}</p>
      <p>Prompt: {bot.prompt}</p>
      <p>Victories: {bot.stats.victoria}</p>
      <p>Draws: {bot.stats.empate}</p>
      <p>Defeats: {bot.stats.derrota}</p>
    </div>
  );
}
const { id } = Astro.params;

//plantilla base sin datos
const bot = {
  id: 0,
  name: id, // el nombre del bot es la url
  emotion: "N/A",
  prompt: "",
  image: "/placeholder.png",
  stats: {
    victoria: 0,
    empate: 0,
    derrota: 0,
  },
};

// aqui conectamos con la API para obtener los datos reales
// const botData = await fetchBotData(id);

<Layout title={`Bot: ${id}`}>
  <AplicationLayout>
    <BotDetails bot={bot} client:load />
  </AplicationLayout>
</Layout>;
