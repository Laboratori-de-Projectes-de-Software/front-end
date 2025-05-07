import {Row, Col, Container} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {getConversacion, getEnfrentamiento, getLeague} from "../services/apiCalls.ts";
import {EnfrentamientoResponse} from "../types/EnfrentamientoResponse.tsx";
import {Message} from "../types/Message.tsx";

type RouteParams = {
    leagueId: string;
    matchId: string;
};

const Enfrentamientos = () => {
    const { leagueId, matchId } = useParams<RouteParams>();
    const [enfrentamiento, setEnfrentamiento] = useState<EnfrentamientoResponse | undefined>();
    const [leagueName, setLeagueName] = useState<string>("");
    const [conversacion, setConversacion] = useState<Message | undefined>();

    useEffect(() => {
        const fetchMatchData = async () => {
            const enfrentamientos = await getEnfrentamiento(parseInt(matchId));
            setEnfrentamiento(enfrentamientos.data);

            const league = await getLeague(leagueId, {});
            setLeagueName(league.data.name);

            const conversacion = await getConversacion(matchId);
            setConversacion(conversacion.data);
        }

        fetchMatchData();
    }, []);

    return(
        <>
            <Container className="d-flex flex-column custom-primary w-100 h-100 rounded-3 text-white p-4 px-5">
                <h1>{leagueName}</h1>
                <h2 className="text-center my-4">Enfrentamiento</h2>
                <Row>
                    <Col sm={5} className="text-center fs-1">{enfrentamiento?.fighters[0]}</Col>
                    <Col className="text-center fs-2 fw-semibold">VS</Col>
                    <Col sm={5} className="text-center fs-1">{enfrentamiento?.fighters[1]}</Col>
                </Row>
                <Row className="my-4 py-3 bg-black flex-grow-1 rounded-3 overflow-y-scroll" style={{height: "100px"}}>
                    {
                        conversacion ?
                        conversacion?.map((message, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={index} className={`w-100 d-flex ${isLeft ? "justify-content-end": "justify-content-start"}`}>
                                    <div
                                        className={`message-bubble p-3 rounded custom-action mx-4 my-3 w-50`}
                                    >
                                        <p className="mb-0 fs-5">{message.text}</p>
                                        <small>{message.time}</small>
                                    </div>
                                </div>
                            );
                        })
                            :
                        <p className="text-center">No hay conversación</p>
                    }
                </Row>
            </Container>
        </>
    );
};

export default Enfrentamientos;