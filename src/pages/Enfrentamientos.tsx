import { Row, Col } from "react-bootstrap";
import iconoBot from "../assets/img/iconoBot.png";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons";
import { useFetchEnfrentamiento } from "../hooks/useEnfrentamientos.tsx";

const Enfrentamientos = () => {
    const { leagueId, matchId } = useParams();
    const { enfrentamiento, loading, error } = useFetchEnfrentamiento(
        matchId ? parseInt(matchId) : undefined,
        leagueId ? parseInt(leagueId) : undefined
    );
    console.log(enfrentamiento);
    const messages = [
        { bot: 1, message: "La generosidad es la clave para construir relaciones fuertes y un mundo mejor." },
        { bot: 2, message: "Pero la inteligencia permite resolver problemas complejos y avanzar como sociedad." },
        { bot: 1, message: "Sin generosidad, la inteligencia se vuelve egoísta y no beneficia a los demás." },
        { bot: 2, message: "La inteligencia puede ser usada para encontrar soluciones que ayuden a todos." },
        { bot: 1, message: "La generosidad inspira confianza y cooperación, algo que la inteligencia sola no puede lograr." },
        { bot: 2, message: "Entiendo, ganas el debate." },
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-5" role="alert">
                <h4 className="alert-heading">Error al cargar el enfrentamiento</h4>
                <p>{error}</p>
            </div>
        );
    }

    if (!enfrentamiento || !enfrentamiento.bots || enfrentamiento.bots.length < 2) {
        return (
            <div className="alert alert-warning m-5" role="alert">
                <h4 className="alert-heading">No se encontró el enfrentamiento</h4>
                <p>No se pudo encontrar información para este enfrentamiento o no hay suficientes bots participantes.</p>
            </div>
        );
    }
    
    const getBackgroundClass = (botIndex: number) => {
        if (!enfrentamiento.resultado) {
            return "bg-primary bg-opacity-25";
        }
        
        if (enfrentamiento.resultado === "empate") {
            return "bg-info bg-opacity-25";
        }
        
        if ((enfrentamiento.resultado === "local" && botIndex === 0) || 
            (enfrentamiento.resultado === "visitante" && botIndex === 1)) {
            return "bg-success bg-opacity-50";
        }
        
        return "bg-primary bg-opacity-25";
    };
    
    const isFinished = enfrentamiento.resultado === "local" || 
                       enfrentamiento.resultado === "visitante" || 
                       enfrentamiento.resultado === "empate";
    const timerDisplay = isFinished ? "0:00" : "5:00";

    const botContainerStyle = {
        position: "relative" as const
    };

    return (
        <div className="container-fluid p-4">
            <div className="card p-5 shadow-lg bg-dark text-white rounded-4">
                <div className="mb-4">
                    <h2 className="fw-bold">{enfrentamiento.leagueName}</h2>
                    <h4 className="text-center fw-bold">{timerDisplay}</h4>
                </div>

                <Row className="align-items-center mb-4">
                    <Col md={5} style={botContainerStyle}>
                        {enfrentamiento.resultado === "local" && (
                            <div className="position-absolute" 
                                style={{ 
                                    top: "-15px", 
                                    zIndex: 10,
                                    left: "62.5%",
                                    transform: "translateX(-50%)" 
                                }}>
                                <span className="badge bg-warning text-dark p-2">
                                    <FontAwesomeIcon icon={faCrown} className="me-2" />
                                    GANADOR
                                </span>
                            </div>
                        )}
                        <div className={`rounded-4 overflow-hidden mt-3 ${getBackgroundClass(0)}`}>
                            <div className="row align-items-center g-0">
                                <div className="col-3 p-0">
                                    <img
                                        src={enfrentamiento.bots[0].urlImage || iconoBot}
                                        alt={enfrentamiento.bots[0].name}
                                        className="img-fluid h-100"
                                        style={{ objectFit: "cover", width: "100%", maxHeight: "90px" }}
                                    />
                                </div>
                                <div className="col-9 text-center py-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <h5 className="fw-bold mb-0 me-2">{enfrentamiento.bots[0].name}</h5>
                                        <span className="badge bg-secondary text-white">
                                            <FontAwesomeIcon icon={faChessKnight} className="me-1" />
                                            {"2° Posición"}
                                        </span>
                                    </div>
                                    <p className="mb-0 small">{enfrentamiento.bots[0].description}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={2} className="text-center">
                        <h2 className="fw-bold">VS</h2>
                    </Col>
                    
                    <Col md={5} style={botContainerStyle}>
                        {enfrentamiento.resultado === "visitante" && (
                            <div className="position-absolute" 
                                style={{ 
                                    top: "-15px", 
                                    zIndex: 10,
                                    left: "62.5%",
                                    transform: "translateX(-50%)" 
                                }}>
                                <span className="badge bg-warning text-dark p-2">
                                    <FontAwesomeIcon icon={faCrown} className="me-2" />
                                    GANADOR
                                </span>
                            </div>
                        )}
                        <div className={`rounded-4 overflow-hidden mt-3 ${getBackgroundClass(1)}`}>
                            <div className="row align-items-center g-0">
                                <div className="col-3 p-0">
                                    <img
                                        src={enfrentamiento.bots[1].urlImage || iconoBot}
                                        alt={enfrentamiento.bots[1].name}
                                        className="img-fluid h-100"
                                        style={{ objectFit: "cover", width: "100%", maxHeight: "90px" }}
                                    />
                                </div>
                                <div className="col-9 text-center py-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <h5 className="fw-bold mb-0 me-2">{enfrentamiento.bots[1].name}</h5>
                                        <span className="badge bg-secondary text-white">
                                            <FontAwesomeIcon icon={faChessKnight} className="me-1" />
                                            {"4° Posición"}
                                        </span>
                                    </div>
                                    <p className="mb-0 small">{enfrentamiento.bots[1].description}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="mt-4">
                    <div className="rounded-4 p-3">
                        <div style={{ height: "400px", overflowY: "auto" }}>
                            {isFinished ? (
                                messages.map((message, index) => {
                                    const isRightMessage = message.bot === 2;
                                    return (
                                        <div key={index} className={`mb-3 d-flex ${isRightMessage ? "justify-content-end" : "justify-content-start"}`}>
                                            <div
                                                className={`message-bubble p-3 rounded ${isRightMessage ? "bg-secondary" : "bg-primary"}`}
                                                style={{
                                                    maxWidth: "45%",
                                                    marginRight: isRightMessage ? "20px" : "0",
                                                    marginLeft: isRightMessage ? "0" : "20px",
                                                }}
                                            >
                                                <p className="mb-0">{message.message}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                                    <div className="text-center p-3">
                                        <div className="spinner-border text-secondary mb-3" role="status"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enfrentamientos;