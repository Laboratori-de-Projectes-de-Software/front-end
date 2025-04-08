import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import foto from "../assets/img/ligabanner.jpg";
import { leagueResponse } from "../types/LeagueResponse.tsx";
import {API_LEAGUE} from "../config.tsx"; // Ajusta la ruta según tu estructura

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


export default function LeagueOverviewPage({ leagueId }: { leagueId: number }) {
    const [league, setLeague] = useState<leagueResponse | null>(null);
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        const fetchLeague = async () => {
            try {
                const response = await fetch(`${API_LEAGUE}/${leagueId}`);
                const data = await response.json();
                console.log("league", data);
                setLeague(data);
            } catch (err) {
                console.error("Error al cargar la liga:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeague();
    }, [leagueId]);

    const handleRegisterBot = () => {
        alert("Registro de bot no implementado");
    };

    if (loading) return <div className="text-light p-4">Cargando datos de la liga...</div>;
    if (!league) return <div className="text-light p-4">No se encontró la liga.</div>;

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

                    <Button
                            variant="outline-light"
                            size="lg"
                            onClick={handleRegisterBot}
                            disabled={league.status === "CERRADA"}>
                        Registrar un bot
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        disabled={league.status === "CERRADA"}
                    >
                        Iniciar Liga
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}