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
import {fetchBotById} from "../controllers/BotController";
import MatchModal from "./MatchModal"; // Importa el componente MatchModal


interface LeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        id: number;
        name: string;
        imageUrl: string;
        matchTime: number;
        bots: number[];
        rounds: number;
        state: string;
    } | null;
}

interface Bot {
    id: number;
    name: string;
    imageUrl: string; // Image URL
}

const LeagueModal: React.FC<LeagueModalProps> = ({ isOpen, onClose, league }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddBotsModalOpen, setIsAddBotsModalOpen] = useState(false);
    const [currentLeague, setCurrentLeague] = useState(league);
    const [matches, setMatches] = useState<any[]>([]);
    const [standings, setStandings] = useState<any[]>([]);
    const [bots, setBots] = useState<Bot[]>([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [selectedMatch, setSelectedMatch] = useState<any>(null); // Estado para el match seleccionado

    const handleMatchClick = (match: any) => {
        setSelectedMatch(match); // Establece el match seleccionado
    };

    const closeMatchModal = () => {
        setSelectedMatch(null); // Cierra el modal
    };

    const Match = ({ match }: { match: any }) => {
        if (!match.fighters || match.fighters.length < 2) {
            return <div className="match-card">Invalid match data</div>;
        }

        const bot1 = bots.find((bot) => bot.name === match.fighters[0]);
        const bot2 = bots.find((bot) => bot.name === match.fighters[1]);

        if (!bot1 || !bot2) {
            return <div className="match-card">Bot data not found</div>;
        }

        return (
            <div
                className="match-card"
                onClick={() => handleMatchClick(match)} // Abre el modal al hacer clic
            >
                <img src={bot1.imageUrl} alt={bot1.name} />
                <div className="match-card-content">
                    <p>
                        {bot1.name} vs {bot2.name}
                    </p>
                    <p>Estado: {match.state}</p>
                </div>
                <img src={bot2.imageUrl} alt={bot2.name} />
            </div>
        );
    };

    // Sincronizar currentLeague con league cuando esta cambie
    useEffect(() => {
        console.log("League prop changed:", league?.id); // Log para probar los datos
        setCurrentLeague(league);
        // if (league && (league.state === "IN_PROCESS" || league.state === "Finished")) {
        //     fetchMatchesByLeague(league.leagueId).then(setMatches).catch(console.error);
        //     fetchStandingsByLeague(league.leagueId).then(setStandings).catch(console.error);
        // }
        if (league) {
            fetchMatchesByLeague(league.id)
                .then((matches) => {
                    console.log("Fetched matches:", matches); // Log para probar los datos
                    setMatches(matches);
                })
                .catch(console.error);

            fetchStandingsByLeague(league.id)
                .then((standings) => {
                    console.log("Fetched standings:", standings); // Log para probar los datos
                    setStandings(standings);
                })
                .catch(console.error);
        }
    }, [league]);

    useEffect(() => {
        if (league && league.bots.length > 0) {
            const fetchBots = async () => {
                try {
                    const fetchedBots = await Promise.all(
                        league.bots.map((botId) => fetchBotById(botId))
                    );
                    setBots(fetchedBots);
                    console.log("Fetched bots:", fetchedBots); // Log para probar los datos
                } catch (error) {
                    console.error("Error fetching bots:", error);
                }
            };

            fetchBots();
        }
    }, [league?.bots]);

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

    const handleStartClick = async () => {
        if (currentLeague) {
            try {
                console.log("Starting league with ID:", currentLeague.id);
                await fetchLeagueStart(currentLeague.id);
                console.log("League started successfully");
                reloadLeagueData(); // Refresh league data after starting
            } catch (error) {
                console.error("Error starting league:", error);
            }
        }
    };

    return (

        <div className="modal-overlay">
            <div className={currentLeague.state === "PENDING" ? "modal-content" : "modal-content-started"}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{currentLeague.name}</h2>

                {currentLeague.state === "PENDING" ? (
                    <>
                        {/* Original Design */}
                        <h3>Bots Inscritos:</h3>
                        <div className="bot-images-container">
                            {bots.map((bot) => (
                                <img
                                    key={bot.id}
                                    src={bot.imageUrl}
                                    alt={`Bot ${bot.id}`}
                                    className="bot-league-image"
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
                            <h3>Enfrentamientos</h3>
                            {matches && matches.length > 0 ? (
                                <div className="round-matches">
                                    {matches.map((match: any) => (
                                        <Match key={match.matchId} match={match}/>
                                    ))}
                                </div>
                            ) : (
                                <p>No matches available.</p>
                            )}
                        </div>
                        {/* MatchModal */}
                        {selectedMatch && (
                            <MatchModal
                                isOpen={!!selectedMatch}
                                onClose={closeMatchModal}
                                match={selectedMatch}
                                bots={bots} // Pasar los bots dinámicamente
                            />
                        )}
                        <div className="standings-column">
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
                                    <tr key={bot.botId}>
                                        <td>{bot.name}</td>
                                        <td>{bot.nwins}</td>
                                        <td>{bot.nlosses}</td>
                                        <td>{bot.ndraws}</td>
                                        <td>{bot.points}</td>
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