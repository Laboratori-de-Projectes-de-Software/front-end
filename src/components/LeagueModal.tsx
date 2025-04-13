import React, { useState, useEffect } from "react";
import "./Modal.css";
import Button from "./Button";
import EditLeagueModal from "./EditLeagueModal";
import AddBotsModal from "./AddBotsModal";
import {
    fetchLeagueById,
    fetchLeagueStart,
    fetchMatchesByLeague,
    fetchStandingsByLeague
} from "../controllers/LeaguesController";


interface LeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        id: number;
        name: string;
        urlImagen: string;
        matchTime: number;
        bots: { id: number; imageUrl: string }[];
        rounds: number;
        state: string;
    } | null;
}

const LeagueModal: React.FC<LeagueModalProps> = ({ isOpen, onClose, league }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddBotsModalOpen, setIsAddBotsModalOpen] = useState(false);
    const [currentLeague, setCurrentLeague] = useState(league);
    const [matches, setMatches] = useState<any[]>([]);
    const [standings, setStandings] = useState<any[]>([]);

    // Sincronizar currentLeague con league cuando esta cambie
    useEffect(() => {
        setCurrentLeague(league);
        if (league && (league.state === "Started" || league.state === "Finished")) {
            fetchMatchesByLeague(league.id).then(setMatches).catch(console.error);
            fetchStandingsByLeague(league.id).then(setStandings).catch(console.error);
        }
    }, [league]);

    console.log("LeagueModal props:", { isOpen, league });
    if (!isOpen || !currentLeague) return null;

    const reloadLeagueData = () => {
        if (currentLeague) {
            fetchLeagueById(currentLeague.id)
                .then((updatedLeague) => setCurrentLeague(updatedLeague))
                .catch((error) => console.error("Error fetching league data:", error));
        }
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        reloadLeagueData();
    };

    const handleAddBotClick = () => {
        setIsAddBotsModalOpen(true);
    };

    const handleCloseAddBotModal = () => {
        setIsAddBotsModalOpen(false);
        reloadLeagueData();
    };

    const handleStartClick = () => {
        if (currentLeague) {
            try {
                fetchLeagueStart(currentLeague.id);
                console.log("League started successfully");
                reloadLeagueData(); // Refresh league data after starting
            } catch (error) {
                console.error("Error starting league:", error);
            }
        }
    }

    return (

        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{currentLeague.name}</h2>

                {currentLeague.state === "Created" ? (
                    <>
                        {/* Original Design */}
                        <h3>Bots Inscritos:</h3>
                        <div className="bot-images-container">
                            {currentLeague.bots.map((bot) => (
                                <img
                                    key={bot.id}
                                    src={bot.imageUrl}
                                    alt={`Bot ${bot.id}`}
                                    className="bot-image"
                                />
                            ))}
                        </div>
                        <p>Number of Rounds: {currentLeague.rounds}</p>
                            <div className="button-group">
                                <Button label={"Inscribir Bot"} onClick={handleAddBotClick}/>
                                <Button label={"Editar"} onClick={handleEditClick}/>
                                <Button label={"Iniciar"} onClick={handleStartClick}/>
                            </div>
                    </>
                ) : (
                    <div className="league-details">
                        <div className="matches-column">
                            <h3>Enfrentamientos por Jornada</h3>
                            {matches.map((round) => (
                                <div key={round.id} className="round">
                                    <h4>Jornada {round.num_jornada}</h4>
                                    <ul>
                                        {round.enfrentamientos.map((match: any) => (
                                            <li key={match.id}>
                                                Enfrentamiento {match.id} - Estado: {match.estado}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="standings-column">
                            <h3>Clasificación</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Bot</th>
                                    <th>Ganados</th>
                                    <th>Perdidos</th>
                                    <th>Empatados</th>
                                    <th>Puntos</th>
                                </tr>
                                </thead>
                                <tbody>
                                {standings.map((bot) => (
                                    <tr key={bot.bot_id}>
                                        <td>{bot.bot_id}</td>
                                        <td>{bot.num_ganados}</td>
                                        <td>{bot.num_perdidos}</td>
                                        <td>{bot.num_empatados}</td>
                                        <td>{bot.puntuacion}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <AddBotsModal
                    isOpen={isAddBotsModalOpen}
                    onClose={handleCloseAddBotModal}
                    leagueId={currentLeague.id}
                    currentBots={currentLeague.bots}
                />

                <EditLeagueModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    league={currentLeague}
                />
            </div>
        </div>


    );
};

export default LeagueModal;