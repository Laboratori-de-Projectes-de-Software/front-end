import { useEffect, useState } from 'react';
import {getLeaguesByUserId, home} from "../services/apiCalls.ts";
import {Button, Col, Row} from "react-bootstrap";
import {faCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import imgPlaceholder from "../assets/img/ligabanner.jpg";
import {NavLink, useLocation} from "react-router-dom";
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
    const location = useLocation();
    const userId = localStorage.getItem("userId");
    const Title = location.pathname === "/mis-ligas" ? "MIS LIGAS" : "HOME";

    const stateColor = {
        "ABIERTA": "#198754",
        "EN CURSO": "#ffc107",
        "CERRADA": "#dc3545",
    }

    useEffect(() => {
        const fetchLigas = async () => {
            try {
                const response = location.pathname === "/mis-ligas"
                    ? await getLeaguesByUserId({ params: { owner: userId } })
                    : await home({});
                setLigas(response.data);
            } catch (err) {
                console.error("Error al obtener ligas", err);
            }
        };

        fetchLigas();
    }, [location.pathname, userId]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{Title}</h1>
            <Row className="d-flex justify-content-end">
                <Form.Select aria-label="Filtrar ligas"
                             className="w-25 custom-primary text-white custom-select-white"
                             onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="ABIERTA">Abiertas</option>
                    <option value="EN CURSO">En curso</option>
                    <option value="CERRADA">Finalizadas</option>
                </Form.Select>
            </Row>
            {
                ligas.length === 0 ?
                    <p className="fs-4 mt-4">No hay ligas disponibles actualmente</p>
                    :
                    <>
                    <Row className="d-flex align-items-center rounded-4">
                        {ligas.map((liga) => (
                            (liga.status.toUpperCase() === filter || filter === "") &&
                            <>
                                <Col key={liga.leagueId} md={5} lg={3} className="custom-primary rounded-3 text-light p-0 mt-5 mx-2">
                                    <img src={liga.urlImagen ? liga.urlImagen : imgPlaceholder } alt="Imagen liga"
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
                                <Col sm={1}></Col>
                            </>
                        ))}
                    </Row>
                    </>
            }
        </div>
    );
};

export default TodasLasLigas;
