import {FiUser} from "react-icons/fi";
import {useParams} from "react-router-dom";
import {useFetchObtenerBot} from "../hooks/useBot.tsx";
import iconoBot from "../assets/img/iconoBot.png";


function DetallesBot() {


    const {id} = useParams();
    console.log(id);
    const {bot, loading, error} = useFetchObtenerBot(id);

    if (loading) return <p className="text-center mt-5">Cargando detalles bot...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
    return (


        <div className="container mt-4">
            {/* ENCABEZADO */}
            <div className="d-flex align-items-center mb-4">
                <FiUser size={24} className="me-2"/>
                <h3 className="fw-bold">MIS BOTS</h3>
            </div>

            <div className="card p-0 shadow-lg bg-dark text-white rounded-4">
                <div className="row ">
                    {/*IMAGEN BOT*/}
                    <div className="col-md-4 ">
                        <img

                            src={iconoBot}
                            alt="Bot"
                            className="card-img-letf"
                            style={{width: "100%", maxHeight: "200px", objectFit: "contain"}}
                        />

                    </div>

                    {/* Datos del bot */}
                    <div className="col-md-6">

                        <h2 className="fw-bold">{bot?.name}</h2>
                        <p className="text-light fs-4 fw-semibold">{bot?.description}</p>
                        <p className="text-light fs-4 fw-semibold">Enfrentamientos ganados: {bot?.nWins}</p>
                        {/* <p className="text-light fs-4 fw-semibold">{bot?.nDraws}</p>
                        <p className="text-light fs-4 fw-semibold">{bot?.nLosses}</p>*/}


                    </div>

                </div>
            </div>


        </div>
    );
};

export default DetallesBot;

