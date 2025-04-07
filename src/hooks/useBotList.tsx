import { FC, useEffect, useState } from 'react';
import {botLiga} from "../types/botLiga.tsx";
import {API} from "../config.tsx";
import {BotCard} from "../components/BotCard.tsx";


const useBotList: FC = () => {
    const [bots, setBots] = useState<botLiga[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBots = async () => {
            try {
                // Reemplaza esta URL con la URL real de tu backend
                const response = await fetch(`${API}/league/{leagueId}`);
                const data = await response.json();
                setBots(data);
            } catch (error) {
                console.error("Error al obtener los bots:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBots();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {bots.map((bot) => (
                <BotCard
                    key={bot.posicion}
                    posicion={bot.posicion}
                    nombre={bot.nombre}
                    cualidad={bot.cualidad}
                    imagen={bot.imagen}
                    estadisticas={bot.estadisticas}
                />
            ))}
        </div>
    );
};

export default useBotList;