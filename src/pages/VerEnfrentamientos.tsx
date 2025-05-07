import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { MatchResponseDTO } from "../types/MatchResponseDTO.tsx";
import { getMatchesByLeague } from "../services/apiCalls.ts";
import {FaHandshake, FaTrophy} from "react-icons/fa";

function VerEnfrentamientos() {
    const { leagueId } = useParams();
    const [matches, setMatches] = useState<MatchResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await getMatchesByLeague(leagueId, {});
                setMatches(res.data);
            } catch (err) {
                setError("Error al cargar enfrentamientos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (leagueId) fetchMatches();
    }, [leagueId]);

    if (loading) return <p className="text-center fs-4 mt-5">Cargando enfrentamientos...</p>;
    if (error) return <p className="text-danger text-center fs-4 mt-5">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-4 text-center display-5">ENFRENTAMIENTOS</h2>

            {matches.length === 0 ? (
                <p className="text-muted text-center fs-5">Aún no hay enfrentamientos registrados.</p>
            ) : (
                <div className="table-responsive shadow-lg rounded-4 overflow-hidden">
                    <table className="table table-dark table-striped table-hover align-middle fs-5">
                        <thead className="table-light text-dark">
                        <tr>
                            <th>Jornada</th>
                            <th>Participantes</th>
                            <th>Estado</th>
                            <th>Resultado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {matches.map((match) => (
                            <tr
                                key={match.matchId}
                                onClick={() => navigate(`/enfrentamientos/${leagueId}/${match.matchId}`)}
                            >

                                    <td><strong>{match.roundNumber}</strong></td>
                                    <td className="fw-semibold">
                                        {match.fighters.join(" vs ")}
                                    </td>
                                    <td>
                                            <span className={`badge fs-6 ${
                                                match.state === "FINALIZADO"
                                                    ? "bg-primary"
                                                    : match.state === "POR JUGAR"
                                                        ? "bg-warning text-dark"
                                                        : match.state === "EN CURSO"
                                                            ? "bg-info text-dark"
                                                            : "bg-secondary"
                                            }`}>
                                            {match.state === "FINALIZADO"
                                                ? "Finalizado"
                                                : match.state === "POR JUGAR"
                                                    ? "Por jugar"
                                                    : match.state === "EN CURSO"
                                                        ? "En curso"
                                                        : "Pendiente"}
                                            </span>
                                    </td>
                                    <td>
                                        {match.result ? (
                                            <span className="d-flex align-items-center gap-2">
                                            {match.result === "EMPATE" ? (
                                                <>
                                                    <FaHandshake className="text-primary"/>
                                                    <span>EMPATE</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaTrophy className="text-warning"/>
                                                    <span>{match.result === "LOCAL" ? "LOCAL" : "VISITANTE"}</span>
                                                </>
                                            )}
                                         </span>
                                        ) : (
                                            <span className="text-muted"></span>
                                        )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                            </div>
                            )}
                </div>
            );
            }

            export default VerEnfrentamientos;
