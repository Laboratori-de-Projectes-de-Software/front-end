import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import Button from "../components/Button";
import CreateLeagueModal from "../components/CreateLeagueModal";
import { fetchUserLeagues } from "../controllers/LeaguesController";
import LeagueModal from "../components/LeagueModal";

import "./LeaguesPage.css";
import ButtonCreate from "../components/ButtonCreate";

const LeaguesPage: React.FC = () => {
    const [leagues, setLeagues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<any | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const handleLeagueClick = (league: any) => {
        setSelectedLeague(league);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedLeague(null);
        // Recargar las ligas desde la base de datos
        setLoading(true);
        fetchUserLeagues(setLeagues, (error) => {
            console.error("Error fetching leagues:", error);
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUserLeagues(setLeagues, (error) => {
            console.error("Error fetching leagues:", error);
        }).finally(() => setLoading(false));
    }, []);

    const handleCreateLeague = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Recargar las ligas desde la base de datos
        setLoading(true);
        fetchUserLeagues(setLeagues, (error) => {
            console.error("Error fetching leagues:", error);
        }).finally(() => setLoading(false));
    };

    return (
        <div className="leagues-page">
            <NeuralBackground />
            <Navbar />

            <div className="leagues-content">
                <h1>Mis Ligas</h1>

                {loading ? (
                    <div className="loading">Cargando datos...</div>
                ) : (
                    <div className="leagues-grid">
                        {leagues.map((league) => (
                            <div
                                className="league-card"
                                key={league.id}
                                onClick={() => handleLeagueClick(league)}
                            >
                                <div className="league-name">{league.name}</div>
                                <img
                                    className="league-image"
                                    src={league.urlImagen || "default-image-url.jpg"} // Default image if none is provided
                                    alt={`Imagen de ${league.name}`}
                                />
                                <div className="league-status">Estado: {league.state}</div>
                            </div>
                        ))}
                    </div>
                )}
                <ButtonCreate
                    label="Crear nueva liga"
                    onClick={handleCreateLeague}
                />
            </div>

            <CreateLeagueModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <LeagueModal
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                league={selectedLeague}
            />
        </div>
    );
};

export default LeaguesPage;