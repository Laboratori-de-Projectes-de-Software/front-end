import {BotDetail} from "../types/BotDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png"
import {useNavigate} from "react-router-dom";


function TargetaBotComponent({name, id, description}: BotDetail) {

    const navigate = useNavigate();
    const goToDetalleBot = (id) => {
        navigate(`${id}`);
    };
    return (
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

                    <h2 className="fw-bold">{name}</h2>
                    <p className="text-light fs-4 fw-semibold">{description}</p>

                    <button className="btn btn-primary btn-lg " onClick={() => goToDetalleBot(id)}>Ver BOT</button>

                </div>

            </div>
        </div>
    );
}

export default TargetaBotComponent;