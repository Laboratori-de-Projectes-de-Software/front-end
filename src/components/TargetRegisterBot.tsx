import {BotDetail} from "../types/BotDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png"
import {useNavigate} from "react-router-dom";
import {registerBotToLeague} from "../services/apiCalls.ts";


function TargetRegisterBot({name, id, description, urlImage}: BotDetail, leagueId: number) {

    const navigate = useNavigate();

    const handleRegister = async () => {
        const res = await registerBotToLeague( id, leagueId );
        if (res.status === 200) {
            alert("Bot registrado correctamente");
            navigate(`/league/${leagueId}`);
        } else {
            alert("Error al registrar el bot");
        }
    };
    return (
        <div className="card p-0 shadow-lg bg-dark text-white rounded-4">
            <div className="row ">
                {/*IMAGEN BOT*/}
                <div className="col-md-4 ">
                    <img

                        src={urlImage != null ? urlImage : iconoBot}
                        alt="Bot"
                        className="card-img-letf"
                        style={{width: "100%", maxHeight: "200px", objectFit: "contain"}}
                    />

                </div>

                {/* Datos del bot */}
                <div className="col-md-6">

                    <h2 className="fw-bold">{name}</h2>
                    <p className="text-light fs-4 fw-semibold">{description}</p>

                    <button className="btn btn-primary btn-lg " onClick={() => handleRegister()}>registrar BOT</button>

                </div>

            </div>
        </div>
    );
}

export default TargetRegisterBot;