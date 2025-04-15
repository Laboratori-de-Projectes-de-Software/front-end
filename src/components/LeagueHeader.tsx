import banner from "../assets/img/ligabanner.jpg"
import {getStatusColor} from "../pages/LeagueOverviewPage.tsx"

import { FC } from "react";
import { Button } from "react-bootstrap";
import {NavLink, useNavigate, useParams} from "react-router-dom";
type LeagueHeaderProps = {
    creador: string;
    estado: "CERRADA" | "ABIERTA" | "EN CURSO";
    participantes: number;

};


export const LeagueHeader: FC<LeagueHeaderProps> = ({creador, estado, participantes
}) => {

    const {leagueId} = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <img
                src={banner}
                alt="Banner"
                className="img-fluid rounded"
                style={{maxHeight: 200, objectFit: "cover", width: "100%"}}
            />

            <div className="row align-items-center mt-4">
                <p className={`col-md-4 text-start ${getStatusColor(estado)}`}>
                    ● {estado}
                </p>
                <div className="col-md-4 text-center">
                    <h4 className="text-light fw-medium">{participantes} participantes</h4>
                </div>
                <div className="col-md-4 text-end">
                    <h4 className="text-light fw-medium mb-1">👤 {creador}</h4>
                </div>
            </div>

            <div className="row align-items-center mt-4">

                <div className="col-md-4 text-left">
                    <h1 className="text-white fw-bold mb-3" style={{marginTop: "-20px"}}>
                        LIGA
                    </h1>
                </div>

                <div className="col-md-4 d-flex justify-content-center gap-3">
                    <Button
                        variant="outline-light"
                        size="lg"
                        onClick={() => navigate(`/league/${leagueId}/match`)}
                    >
                        Ver Enfrentamientos
                    </Button>
                </div>
                <div className="col-md-4 d-flex justify-content-end gap-3">
                    <Button
                        variant="outline-danger"
                        size="lg"
                        //onClick={handleDeleteLeague}
                        className="d-flex align-items-center justify-content-center"
                        style={{width: "48px", height: "48px"}}
                        title="Eliminar Liga"
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            </div>
        </div>
            );
            };