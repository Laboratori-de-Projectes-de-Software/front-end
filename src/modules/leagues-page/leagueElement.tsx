import { FC } from "react";
import "./leagueElement.scss";
import { LeagueResponseDTO } from "@interfaces/league.interface";
import { useNavigate } from "react-router-dom";
import { useModal } from "@modules/modalManager/ModalProvider";

const LeagueElement: FC<LeagueResponseDTO> = (element) => {

    const navigate = useNavigate();
    const { openModal } = useModal();

    const getLeagueStatusLabel = () => {
        switch (element.state) {
            case "PENDING":
                return "Inscripción abierta";
            case "en curso":
                return "En curso";
            case "finalizado":
                return "Finalizada";
            default:
                return "Desconocido";
        }
    }

    return (
        <article className="league-card">
            <div className="league-card-image">
                <img src={element.urlImagen || "/image-placeholder.jpg"} alt="" onError={event => {
                    event.target.src = "/image-placeholder.jpg"
                }
                } />
                <div className={`league-status ${element.state}`}>
                    {getLeagueStatusLabel()}
                </div>
            </div>
            <div className="league-card-content">
                <h3 className="league-card-title">{element.name}</h3>
                <ul className="league-card-details">
                    <li className="league-detail">
                        <span className="detail-label">Rondas</span>
                        <span className="detail-value">{element.rounds}</span>
                    </li>
                    <li className="league-detail">
                        <span className="detail-label">Duración</span>
                        <span className="detail-value">{element.matchTime} s</span>
                    </li>
                    <li className="league-detail">
                        <span className="detail-label">Participantes</span>
                        <span className="detail-value">{element.bots.length}</span>
                    </li>
                </ul>
                <div className="league-card-actions">
                    <button className="league-card-button more-details" onClick={() => navigate("/league/" + element.leagueId)}>Ver detalles</button>
                    {element.state === "PENDING" && (
                        <button className="league-card-button add-bot" onClick={() => openModal("add-bot")}>Inscribir bot</button>
                    )}
                </div>
            </div>
        </article>
    );
}

export default LeagueElement;