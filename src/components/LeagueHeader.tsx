import banner from "../assets/img/ligabanner.jpg"


import { FC } from "react";
import { Button } from "react-bootstrap";
type LeagueHeaderProps = {
    creador: string;
    estado: "Cerrada" | "Abierta";
    participantes: number;

};


export const LeagueHeader: FC<LeagueHeaderProps> = ({creador, estado, participantes
}) => {

    const statusColor = estado === "Cerrada" ? "danger" : "success";

    return (
        <div>
            <img
                src={banner}
                alt="Banner"
                className="img-fluid rounded"
                style={{maxHeight: 200, objectFit: "cover", width: "100%"}}
            />

            <div className="row align-items-center mt-4">
                <div className="col-md-4 text-start">
                    <h4 className={`text-${statusColor} fw-medium d-block mb-1`}>● {estado}</h4>
                </div>
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

                <div className="col-md-4 d-flex justify-content-end gap-3">
                    <Button
                        variant="outline-light"
                        size="lg"
                        disabled={estado === "Cerrada"}
                    >
                        Iniciar Liga
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        //onClick={() => navigate("/enfrentamientos")}
                    >
                        Ver Enfrentamientos
                    </Button>
                </div>
            </div>


        </div>
    );
};