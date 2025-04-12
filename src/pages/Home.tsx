import React, { useEffect, useState } from 'react';
import { home } from "../services/apiCalls.ts";
import {Button, Col, Row} from "react-bootstrap";
import {faCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import imgPlaceholder from "../assets/img/ligabanner.jpg";
import {NavLink} from "react-router-dom";
import Form from 'react-bootstrap/Form';

interface Ligas {
    leagueId: number
    status: string
    name: string
    urlImagen: string
    user: number
    rounds: number
    matchTime: number
    bots: number[]
}

const TodasLasLigas = () => {
    const [ligas, setLigas] = useState<Ligas[]>([]);
    const [filter, setFilter] = useState<string>("");

    const stateColor = {
        "ABIERTA": "#198754",
        "EN CURSO": "#ffc107",
        "FINALIZADA": "#dc3545",
    }

    useEffect(() => {
        const fetchLigas = async () => {
            const response = await home({});
            setLigas(response.data);
        };

        fetchLigas();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">HOME</h1>
            <Row className="d-flex justify-content-end">
                <Form.Select aria-label="Filtrar ligas"
                             className="w-25 custom-primary text-white custom-select-white"
                             onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="ABIERTA">Abiertas</option>
                    <option value="EN CURSO">En curso</option>
                    <option value="FINALIZADA">Finalizadas</option>
                </Form.Select>
            </Row>
            {
                ligas.length === 0 ?
                    <p className="fs-4 mt-4">No hay ligas disponibles actualmente</p>
                    :
                    <>
                    <Row className="d-flex align-items-center justify-content-between rounded-4">
                        {ligas.map((liga) => (
                            (liga.status.toUpperCase() === filter || filter === "") &&
                            <Col key={liga.leagueId} md={5} lg={3} className="custom-primary rounded-3 text-light p-0 mt-5 mx-2">
                                <img src={liga.urlImagen} alt="Imagen liga"
                                     className="object-fit- w-100 overflow-hidden rounded-top-4"
                                     style={{height: "175px"}}/>
                                <div className="p-3">
                                    <Row className="d-flex align-items-center mb-2 mt-3">
                                        <div>
                                            <FontAwesomeIcon icon={faCircle}
                                                             color={stateColor[liga.status] || "#000"} size={"sm"}
                                                             style={{maxWidth: "15px"}}/>
                                            <p className="d-inline ms-2"
                                               style={{color: stateColor[liga.status]}}>{liga.status}</p>
                                        </div>
                                    </Row>
                                    <h1 className="fs-3">{liga.name}</h1>
                                    <Row className="d-flex align-items-center mb-2">
                                        <div>
                                            <FontAwesomeIcon icon={faUser} size={"lg"} style={{maxWidth: "15px"}}/>
                                            <p className="d-inline ms-2">{liga.user}</p>
                                        </div>
                                    </Row>
                                    <p>{liga.bots.length} {liga.bots.length === 1 ? "participante" : "participantes"}</p>
                                    <NavLink to={`/league/${liga.leagueId}`} className="text-decoration-none">
                                        <Button className="custom-action w-100">
                                            Ver Liga
                                        </Button>
                                    </NavLink>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    </>
            }
        </div>
    );
};

export default TodasLasLigas;
