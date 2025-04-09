import {Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faHouse, faRobot, faTrophy, faUser} from "@fortawesome/free-solid-svg-icons";
import {NavLink, useLocation} from "react-router-dom";
import {useFetchPerfil} from "../hooks/usePerfilUsuario.tsx";

type MenuProps = {
    menuExpanded: boolean;
    handleMenuExpanded: (expanded: boolean) => void;
};

function MenuComponent({menuExpanded, handleMenuExpanded}: MenuProps) {
    const location = useLocation();

    //TEMPORAL
    const id = `0`;
    const { perfil } = useFetchPerfil(id);
    return (
        <>
            <div className="d-flex flex-column justify-content-between custom-primary py-5 px-3 pe-4" style={{ height: '100%'}}>
                <div className="w-100">
                    <Row className="d-flex align-items-center mb-5">
                        <Col xs={10}>
                            <h1 className="text-white fw-bold fs-3 mb-0">CYBER ARENA</h1>
                        </Col>
                        <Col xs={2} className="d-flex justify-content-end">
                            <Button
                                className="bg-transparent border-0"
                                onClick={() => handleMenuExpanded(!menuExpanded)}
                            >
                                <FontAwesomeIcon icon={faBars} size={"xl"} />
                            </Button>
                        </Col>
                    </Row>
                    <NavLink
                        to="/"
                        className="text-decoration-none"
                    >
                        <Button className={`d-block mb-4 border-0 w-100 custom-primary-dark ${location.pathname === "/" ? "text-custom-primary custom-secondary" : ""}`}>
                            <div className={`d-flex align-items-center ${!menuExpanded ? "justify-content-center": ""}`}>
                                <FontAwesomeIcon icon={faHouse} size={"xl"}/>
                                {
                                    menuExpanded &&
                                    <p className="ms-4 mb-0 fs-4">INICIO</p>
                                }
                            </div>
                        </Button>
                    </NavLink>
                    <NavLink
                        to="/mis-bots"
                        className="text-decoration-none"
                    >
                        <Button className={`d-block mb-4 border-0 w-100 custom-primary-dark ${location.pathname === "/mis-bots" ? "text-custom-primary custom-secondary" : ""}`}>
                            <div className={`d-flex align-items-center ${!menuExpanded ? "justify-content-center": ""}`}>
                                <FontAwesomeIcon icon={faRobot} size={"xl"}/>
                                {
                                    menuExpanded &&
                                    <p className="ms-4 mb-0 fs-4">MIS BOTS</p>
                                }
                            </div>
                        </Button>
                    </NavLink>
                    <NavLink to="/mis-ligas" className="text-decoration-none">
                        <Button className={`d-block mb-4 border-0 w-100 custom-primary-dark ${location.pathname === "/mis-ligas" ? "text-custom-primary custom-secondary" : ""}`}>
                            <div className={`d-flex align-items-center ${!menuExpanded ? "justify-content-center": ""}`}>
                                <FontAwesomeIcon icon={faTrophy} size={"xl"}/>
                                {
                                    menuExpanded &&
                                    <p className="ms-4 mb-0 fs-4">MIS LIGAS</p>
                                }
                            </div>
                        </Button>
                    </NavLink>
                </div>
                <div className="d-flex">
                    <NavLink to={`api/v0/perfil/${id}`} className={`d-flex w-100 align-items-center text-decoration-none text-white py-1 px-4 ${!menuExpanded ? "justify-content-center": ""}`}>
                        <FontAwesomeIcon icon={faUser} size={"xl"}/>
                        {
                            menuExpanded &&
                            <p className="fs-5 ms-4 mb-0">{perfil?.name}</p>
                        }
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default MenuComponent;