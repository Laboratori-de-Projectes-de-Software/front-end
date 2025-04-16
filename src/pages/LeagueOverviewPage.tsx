import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import foto from "../assets/img/ligabanner.jpg";
import { leagueResponse } from "../types/LeagueResponse.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {deleteLeague, getLeague, iniciarLiga} from "../services/apiCalls.ts";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteModal from "../components/DeleteModal.tsx";



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
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchLeague = async () => {
            const res = await getLeague(leagueId, {});
            setLeague(res.data);
        };
        fetchLeague();
    }, [leagueId]);

    function handleRegisterBot () {
        navigate(`/league/${leagueId}/register`);
    };

    const handleViewLeague = () => {
        navigate(`/league/${leagueId}/leaderboard`);
    };

    const handleDeleteLeague = async() => {
        const response = await deleteLeague(leagueId, {});
        if (response) {
            navigate(`/`);
        }

    };

    const handleStartLeague = async() => {
        const response = await iniciarLiga(leagueId, {});
        if (response) {
            navigate(`/league/${leagueId}/leaderboard`);
        }

    };

    if (!league) return <div className="text-light p-4">No se encontró la liga.</div>;

    const isOwner = localStorage.getItem("username") === league.user;

    return (
        <>
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDeleteLeague={handleDeleteLeague}
            >
            </DeleteModal>
            <div className="container my-4">
                <Card className="bg-dark text-light shadow-lg rounded">
                    <Card.Img
                        variant="top"
                        src={league.urlImagen ? league.urlImagen : foto}
                        alt="Imagen de la liga"
                        style={{maxHeight: 250, objectFit: "cover"}}
                    />
                    <Card.Body>
                        <div className="d-flex align-items-center justify-content-between">
                            <h2 className="fw-bold">{league.name}</h2>
                            {
                                isOwner &&
                                <div>
                                    <NavLink to={`/crear-liga?editing=true&leagueId=${league.leagueId}`}
                                             className="text-decoration-none text-white">
                                        <FontAwesomeIcon icon={faEdit} size={"lg"} className="me-4"/>
                                    </NavLink>
                                    <Button className="bg-transparent border-0" onClick={() => setShowDeleteModal(true)}>
                                        <FontAwesomeIcon icon={faTrash} color={"#dc3545"} size={"lg"} className="me-3"/>
                                    </Button>
                                </div>
                            }
                        </div>
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

                                    >
                                        Registrar un bot
                                    </Button>
                                    {isOwner && (<Button
                                        variant="outline-light"
                                        size="lg"
                                        onClick={handleStartLeague}

                                    >
                                        Iniciar Liga
                                    </Button>)}
                                </>
                            )}

                            {(league.status === "EN CURSO" || league.status === "CERRADA") && (
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    onClick={handleViewLeague}
                                    disabled={false}>
                                    Ver Liga
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}