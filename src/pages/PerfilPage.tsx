
import { FaRobot, FaTrophy } from "react-icons/fa"; // Íconos para estadísticas
import { FiUser } from "react-icons/fi"; // Ícono para el encabezado//
import {useFetchPerfil} from "../hooks/usePerfilUsuario.tsx";
import robotFoto from "../assets/img/robot.png"
import ligaFoto from "../assets/img/liga.png"
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";


const PerfilPage: React.FC = () => {

    //TEMPORAL HASTA QUE ESTÉ LA AUTENTICACIÓN
    const { id } = useParams();
    console.log(id);
    const { perfil, loading, error } = useFetchPerfil(id);

    if (loading) return <p className="text-center mt-5">Cargando perfil...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
    if (!perfil) return null;


    return (
        <div className="container mt-4">
            {/* ENCABEZADO */}
            <div className="d-flex align-items-center mb-4">
                <FiUser size={24} className="me-2"/>
                <h3 className="fw-bold">MI PERFIL</h3>
            </div>

            {/* TARJETA DE PERFIL*/}
            <div className="card p-5 shadow-lg bg-dark text-white rounded-4">
                <div className="row align-items-center">
                    {/*IMAGEN PERFIL*/}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <img
                            src={perfil.imagenUrl}
                            alt="Avatar"
                            className="rounded-circle mb-3"
                            style={{
                                width: "180px",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        />
                        <button className="btn btn-primary btn-lg">Cambiar Foto</button>
                    </div>
                    {/* Datos del usuario */}
                    <div className="col-md-8">
                        <h2 className="fw-bold">{perfil.name}</h2>
                        <p className="text-light fs-4 fw-semibold">{perfil.email}</p>
                        <div className="d-flex gap-4 fs-4">
                             <span className="d-flex align-items-center">
                                <FaRobot className="me-2" size={24}/> {perfil.bots} Bots
                            </span>
                            <span className="d-flex align-items-center">
                                <FaTrophy className="me-2" size={24}/> {perfil.ligas} Ligas
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {/* BOTÓN CERRAR SESIÓN */}
            <div className="text-center mt-4">
                <button className="btn btn-primary">Cerrar sesión</button>
            </div>

            {/* TARJETAS DE ACCIONES */}
            <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-md-5">
                            <div className="card shadow-lg bg-dark text-white mx-auto">
                                <img src={robotFoto} alt="Bot"
                                     style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                                     className="card-img-top"
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Crea tu propio bot</h5>
                                    <Link to="/crear-bot" className="btn btn-primary">Crear Bot</Link>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-5">
                            <div className="card shadow-lg bg-dark text-white mx-auto">
                                <img src={ligaFoto} alt="Liga"
                                     style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                                     className="card-img-top"/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Crea tu propia liga</h5>
                                    <Link to="/crear-liga" className="btn btn-primary">Crear Liga</Link>
                                </div>
                            </div>
                    </div>
            </div>
        </div>
                );
                };

export default PerfilPage;