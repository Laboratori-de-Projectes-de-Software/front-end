import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import Button from "../components/Button";
import CreateLeagueModal from "../components/CreateLeagueModal";
import { fetchUserLeagues } from "../controllers/LeaguesController";
import "./LeaguesPage.css";

const LeaguesPage: React.FC = () => {
    const [leagues, setLeagues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                            <div className="league-card" key={league.id}>
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
                <Button
                    isTransparent={false}
                    className="create-league-button"
                    label="Crear nueva liga"
                    onClick={handleCreateLeague}
                />
            </div>

            <CreateLeagueModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default LeaguesPage;