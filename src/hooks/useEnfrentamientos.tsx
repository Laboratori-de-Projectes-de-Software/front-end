import { useState, useEffect } from "react";
import { getEnfrentamiento, getLeague } from "../services/apiCalls.ts";
import { EnfrentamientoDetail } from "../types/EnfrentamientoDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png";

interface BotData {
    id: number;
    nombreBot: string;
    descripcionBot?: string;
    fotoBot?: string;
}

interface ParticipacionData {
    id?: number;
    bot: BotData;
}

export const useFetchEnfrentamiento = (
    matchId: number | undefined,
    leagueId: number | undefined
) => {
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

                let parsedData;
                if (typeof response.data === 'string') {
                    const match = response.data.match(/^\{"id":(\d+),"clasificacion":"[^"]*","resultado":"([^"]*)"(?:,"participaciones":(\[.*?\]))?/);
                    
                    if (!match) {
                        throw new Error("Invalid data format");
                    }
                    
                    const id = parseInt(match[1]);
                    const resultado = match[2];
                    
                    parsedData = { 
                        id, 
                        resultado, 
                        participaciones: [] as ParticipacionData[] 
                    };
                    
                    if (match[3]) {
                        const botPattern = /"bot".*?"id":(\d+).*?"nombreBot":"([^"]*?)".*?"descripcionBot":"([^"]*?)"/g;
                        const altBotPattern = /"id":(\d+).*?"nombreBot":"([^"]*?)".*?"descripcionBot":"([^"]*?)"/g;
                        
                        const allMatches = [
                            ...match[3].matchAll(botPattern),
                            ...match[3].matchAll(altBotPattern)
                        ];
                        
                        const uniqueBotIds = new Set();
                        const uniqueBots = [];
                        
                        for (const botMatch of allMatches) {
                            const botId = parseInt(botMatch[1]);
                            if (!uniqueBotIds.has(botId)) {
                                uniqueBotIds.add(botId);
                                uniqueBots.push({
                                    id: uniqueBots.length + 1,
                                    bot: {
                                        id: botId,
                                        nombreBot: botMatch[2],
                                        descripcionBot: (botMatch[3] || "").replace(/\\r\\n/g, ' ').trim(),
                                        fotoBot: ""
                                    }
                                });
                                
                                if (uniqueBots.length >= 2) break;
                            }
                        }
                        
                        parsedData.participaciones = uniqueBots;
                    }
                } else {
                    parsedData = response.data;
                }

                let leagueName = "Liga de Debate";
                const actualLeagueId = leagueId || parsedData.jornada?.liga?.id || 0;
                
                if (actualLeagueId > 0) {
                    try {
                        const leagueResponse = await getLeague(actualLeagueId, {});
                        if (leagueResponse.status === 200) {
                            leagueName = leagueResponse.data.name || "Liga de Debate";
                        }
                    } catch (leagueError) {
                        console.error("Error fetching league details:", leagueError);
                    }
                }

                const formattedData: EnfrentamientoDetail = {
                    id: parsedData.id,
                    leagueId: actualLeagueId,
                    leagueName: leagueName,
                    bots: (parsedData.participaciones || [])
                        .map((participacion: ParticipacionData) => ({
                            id: participacion.bot.id,
                            name: participacion.bot.nombreBot,
                            description: participacion.bot.descripcionBot || "",
                            urlImage: participacion.bot.fotoBot || iconoBot
                        }))
                        .reverse(),
                    resultado: parsedData.resultado || "Pendiente"
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
    }, [matchId, leagueId]);
    
    return { enfrentamiento, loading, error };
};