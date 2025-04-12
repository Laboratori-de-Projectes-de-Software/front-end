import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons";
import iconoBot from "../assets/img/iconoBot.png";

// import { useParams } from "react-router-dom";
// import { useFetchEnfrentamiento } from "../hooks/useEnfrentamientos.tsx";

const Enfrentamientos = () => {
    //Datos placeholder, falta conexión
    const leagueName = "Liga Amateur";
    const bots = [
        {
            id: 1,
            name: "R2D2",
            position: "4° Posición",
            quality: "Generosidad",
            image: iconoBot,
            isWinner: false,
        },
        {
            id: 2,
            name: "C3PO",
            position: "5° Posición",
            quality: "Inteligencia",
            image: iconoBot,
            isWinner: true,
        },
    ];

    const messages = [
        { bot: 1, message: "La generosidad es la clave para construir relaciones fuertes y un mundo mejor." },
        { bot: 2, message: "Pero la inteligencia permite resolver problemas complejos y avanzar como sociedad." },
        { bot: 1, message: "Sin generosidad, la inteligencia se vuelve egoísta y no beneficia a los demás." },
        { bot: 2, message: "La inteligencia puede ser usada para encontrar soluciones que ayuden a todos." },
        { bot: 1, message: "La generosidad inspira confianza y cooperación, algo que la inteligencia sola no puede lograr." },
        { bot: 2, message: "Entiendo, ganas el debate." },
    ];

    /* IDEA DE CONEXIÓN
    // Get enfrentamiento ID from URL
    // const { matchId } = useParams();
    // const { enfrentamiento, loading, error } = useFetchEnfrentamiento(Number(matchId));
    
    // Handle loading state
    // if (loading) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
    //             <div className="spinner-border text-primary" role="status">
    //                 <span className="visually-hidden">Cargando...</span>
    //             </div>
    //         </div>
    //     );
    // }
    
    // Handle error state
    // if (error) {
    //     return (
    //         <div className="alert alert-danger m-5" role="alert">
    //             <h4 className="alert-heading">Error al cargar el enfrentamiento</h4>
    //             <p>{error}</p>
    //         </div>
    //     );
    // }
    
    // Handle no data
    // if (!enfrentamiento) {
    //     return (
    //         <div className="alert alert-warning m-5" role="alert">
    //             <h4 className="alert-heading">No se encontró el enfrentamiento</h4>
    //             <p>No se pudo encontrar información para este enfrentamiento.</p>
    //         </div>
    //     );
    // }
    
    // Format data from API to component format
    // const leagueName = enfrentamiento.leagueName;
    // const botsFromAPI = enfrentamiento.bots.map(bot => ({
    //     id: bot.id,
    //     name: bot.name,
    //     position: bot.position,
    //     quality: bot.quality || 'Sin cualidad',
    //     image: bot.urlImage || iconoBot,
    //     isWinner: bot.id === enfrentamiento.winner
    // }));

    */

    return (
        <div className="container-fluid mt-1 px-4">
            <div className="card p-5 shadow-lg bg-dark text-white rounded-4">
                <div className="mb-4">
                    <h2 className="fw-bold">{leagueName}</h2>
                    <h4 className="text-center">ENFRENTAMIENTO</h4>
                </div>

                <Row className="align-items-center mb-4">
                    {/* Primer Bot */}
                    <Col md={5} className="position-relative">
                        {bots[0].isWinner && (
                            <div className="position-absolute top-0 start-50 translate-middle-x" style={{ zIndex: 10, marginTop: "-20px" }}>
                                <span className="badge bg-warning text-dark p-2">
                                    <FontAwesomeIcon icon={faCrown} className="me-2" />
                                    Ganador
                                </span>
                            </div>
                        )}
                        <div className={`rounded-4 overflow-hidden mt-3 ${bots[0].isWinner ? 'bg-success bg-opacity-25' : 'bg-danger bg-opacity-25'}`}>
                            <div className="row align-items-center g-0">
                                <div className="col-3 p-0">
                                    <img
                                        src={bots[0].image}
                                        alt={bots[0].name}
                                        className="img-fluid h-100"
                                        style={{ objectFit: "cover", width: "100%", maxHeight: "90px" }}
                                    />
                                </div>
                                <div className="col-9 text-center py-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <h5 className="fw-bold mb-0 me-2">{bots[0].name}</h5>
                                        <span className="badge bg-info text-dark">
                                            <FontAwesomeIcon icon={faChessKnight} className="me-1" />
                                            {bots[0].position}
                                        </span>
                                    </div>
                                    <p className="mb-0 small">Cualidad: {bots[0].quality}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={2} className="text-center">
                        <h2 className="fw-bold">VS</h2>
                    </Col>
                    
                    {/* Segundo Bot */}
                    <Col md={5} className="position-relative">
                        {bots[1].isWinner && (
                            <div className="position-absolute top-0 start-50 translate-middle-x" style={{ zIndex: 10, marginTop: "-20px" }}>
                                <span className="badge bg-warning text-dark p-2">
                                    <FontAwesomeIcon icon={faCrown} className="me-2" />
                                    Ganador
                                </span>
                            </div>
                        )}
                        <div className={`rounded-4 overflow-hidden mt-3 ${bots[1].isWinner ? 'bg-success bg-opacity-25' : 'bg-danger bg-opacity-25'}`}>
                            <div className="row align-items-center g-0">
                                <div className="col-3 p-0">
                                    <img
                                        src={bots[1].image}
                                        alt={bots[1].name}
                                        className="img-fluid h-100"
                                        style={{ objectFit: "cover", width: "100%", maxHeight: "90px" }}
                                    />
                                </div>
                                <div className="col-9 text-center py-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <h5 className="fw-bold mb-0 me-2">{bots[1].name}</h5>
                                        <span className="badge bg-info text-dark">
                                            <FontAwesomeIcon icon={faChessKnight} className="me-1" />
                                            {bots[1].position}
                                        </span>
                                    </div>
                                    <p className="mb-0 small">Cualidad: {bots[1].quality}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="mt-4">
                    <div className="rounded-4 p-3">
                        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {messages.map((message, index) => {
                                const isRightMessage = message.bot === bots[1].id;
                                
                                return (
                                    <div
                                        key={index}
                                        className={`mb-3 d-flex ${
                                            isRightMessage ? "justify-content-end" : "justify-content-start"
                                        }`}
                                    >
                                        <div
                                            className={`message-bubble p-3 rounded ${
                                                isRightMessage ? "bg-secondary" : "bg-primary"
                                            }`}
                                            style={{ 
                                                maxWidth: "45%", 
                                                marginRight: isRightMessage ? "20px" : "0",
                                                marginLeft: isRightMessage ? "0" : "20px"
                                            }}
                                        >
                                            <p className="mb-0">{message.message}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enfrentamientos;