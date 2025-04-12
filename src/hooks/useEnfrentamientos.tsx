import { useState, useEffect } from "react";
import { getEnfrentamiento } from "../services/apiCalls.ts";
import { EnfrentamientoDetail } from "../types/EnfrentamientoDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png";

export const useFetchEnfrentamiento = (matchId: number | undefined) => {
    const [enfrentamiento, setEnfrentamiento] = useState<EnfrentamientoDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                if (!matchId) {
                    throw new Error("ID de enfrentamiento no proporcionado");
                }

                const response = await getEnfrentamiento(matchId);
                if (response.status !== 200) {
                    throw new Error("Error al obtener los detalles del enfrentamiento");
                }
                
                const data = response.data;
                
                // Format data for frontend consumption
                const formattedData: EnfrentamientoDetail = {
                    id: data.id,
                    leagueId: data.jornada?.liga?.id || 0,
                    leagueName: data.jornada?.liga?.nombre || "Liga sin nombre",
                    bots: data.participaciones.map(participacion => ({
                        id: participacion.bot.id,
                        name: participacion.bot.nombreBot,
                        description: participacion.bot.descripcionBot || "",
                        urlImage: participacion.bot.fotoBot || iconoBot,
                        position: participacion.posicion || "Sin posición",
                        quality: participacion.cualidad || "Sin cualidad",
                        nWins: participacion.bot.numVictorias || 0,
                        nLosses: 0,
                        nDraws: 0,
                        isWinner: participacion.bot.id === data.ganador?.id
                    })),
                    winner: data.ganador?.id || 0,
                    messages: [],
                    resultado: data.resultado || "Pendiente"
                };

                setEnfrentamiento(formattedData);
            } catch (err) {
                setError((err as Error).message);
                console.error("Error fetching enfrentamiento:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [matchId]);

    return { enfrentamiento, loading, error };
};