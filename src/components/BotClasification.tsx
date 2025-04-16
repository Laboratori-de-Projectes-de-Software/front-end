import { useEffect, useState} from "react";
import {participationResponse} from "../types/ParticipationResponse.tsx";
import {API_LEAGUE} from "../config.tsx";
import {useParams} from "react-router-dom";
import {LeagueHeader} from "./LeagueHeader.tsx";
import {getLeague} from "../services/apiCalls.ts";
import {leagueResponse} from "../types/LeagueResponse.tsx";


export const Leaderboard =() => {
    const [bots, setBots] = useState<participationResponse[]>([]);
    const [league, setLeague] = useState<leagueResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const {leagueId} = useParams();

    useEffect(() => {
        const fetchLeague = async () => {
            const res = await getLeague(leagueId, {});
            setLeague(res.data);
        };
        fetchLeague();
    }, [leagueId]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${API_LEAGUE}/${leagueId}/leaderboard`);
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                const data = await response.json();
                setBots(data);
            } catch (error) {
                console.error("Error al cargar el leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return <div>Cargando clasificación...</div>;

    return (
        <div>
            <LeagueHeader creador={league?.user || ""} estado={league?.status || ""} participantes={league?.bots.length || 0}  />
            <h4>CLASIFICACIÓN</h4>
            {bots.map(bot => (
                <div key={bot.botId} className="card bg-dark text-light mb-3 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{bot.position}.</strong> {bot.name}
                        </div>
                        <div>
                            <span>{bot.points} pts</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}