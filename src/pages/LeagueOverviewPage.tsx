import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import foto from "../assets/img/ligabanner.jpg";
import { leagueResponse } from "../types/LeagueResponse.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {deleteLeague, getLeague} from "../services/apiCalls.ts"; // Ajusta la ruta según tu estructura



export const getStatusColor = (status: string): string => {
    switch (status) {
        case "ABIERTA":
            return "text-success";
        case "CERRADA":
            return "text-danger";
        case "EN CURSO":
            return "text-warning";
        default:
            return "text-light";
    }
};


export default function LeagueOverviewPage() {
    const [league, setLeague] = useState<leagueResponse | null>(null);
    const navigate = useNavigate();
    const { leagueId} = useParams();




    useEffect(() => {
        const fetchLeague = async () => {
            const res = await getLeague(leagueId, {});
            setLeague(res.data);
        };
        fetchLeague();
    }, [leagueId]);

    const handleRegisterBot = () => {
        alert("Registro de bot no implementado");
    };

    const handleViewLeague = () => {
        //CAMBIAR POR EL ID DE LA LIGA
        navigate(`/league/${leagueId}/leaderboard`);
    };

    const handleDeleteLeague = async() => {
        const response = await deleteLeague(leagueId, {});
        if (response) {
            alert("LIGA ELIMINADA")
            navigate(`/home`);
        }

    };

    if (!league) return <div className="text-light p-4">No se encontró la liga.</div>;

    const isOwner = localStorage.getItem("username") === league.user;

    return (
        <div className="container my-4">
            <Card className="bg-dark text-light shadow-lg rounded">
                <Card.Img
                    variant="top"
                    src={league.urlImagen ? league.urlImagen : foto }
                    alt="Imagen de la liga"
                    style={{ maxHeight: 250, objectFit: "cover" }}
                />
                <Card.Body>
                    <h2 className="fw-bold">{league.name}</h2>
                    <p className={`mb-1 ${getStatusColor(league.status)}`}>
                        ● {league.status}
                    </p>
                    <p className="mb-1"><strong>Rondas:</strong> {league.rounds}</p>
                    <p className="mb-1"><strong>Tiempo por partida:</strong> {league.matchTime} segundos</p>
                    <p className="mb-1"><strong>Bots registrados:</strong> {league.bots.length}</p>
                    <p className="mb-3"><strong>Creador :</strong> {league.user}</p>

                    {/* Condición para los botones según el estado de la liga */}
                    <div className="d-flex flex-column gap-3">
                        {league.status === "ABIERTA" && (
                            <>
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    onClick={handleRegisterBot}
                                    //disabled={league.status === "CERRADA"}
                                    >
                                    Registrar un bot
                                </Button>
                                { isOwner && (<Button
                                    variant="outline-light"
                                    size="lg"
                                    //onClick={handleStartLeague}
                                    //disabled={league.status === "CERRADA"}
                                    >
                                    Iniciar Liga
                                </Button>)}
                            </>
                        )}

                        {league.status === "EN CURSO" && (
                            <Button
                                variant="outline-light"
                                size="lg"
                                onClick={handleViewLeague}
                                disabled={false}>
                                Ver Liga
                            </Button>
                        )}

                        {league.status === "CERRADA" && (
                            <>
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    onClick={handleViewLeague}
                                    disabled={false}>
                                    Ver Liga
                                </Button>
                                {isOwner && (<Button
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={handleDeleteLeague}
                                    disabled={false}>
                                    Borrar Liga
                                </Button>)}
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
);
}