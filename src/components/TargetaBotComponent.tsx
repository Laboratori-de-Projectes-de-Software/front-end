import { useNavigate } from "react-router-dom";
import { registerBotToLeague} from "../services/apiCalls.ts";
import { BotDetail } from "../types/BotDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png";

interface Props extends BotDetail {
    leagueId?: string;
}

function TargetaBotComponent({ name, id, description, urlImage, leagueId }: Props) {
    const navigate = useNavigate();


    const goToDetalleBot = (id: number) => {
        navigate(`/mis-bots/${id}`);
    };

    const handleRegisterBot = async () => {
        if (!leagueId) return;

        try {
            const res = await registerBotToLeague(leagueId, id);

            if (res.status === 201) {
                alert("Bot registrado con éxito");
                navigate(`/league/${leagueId}`);
            } else {
                alert("Error al registrar el bot");
            }
        } catch (err: any) {
            const status = err?.response?.status;

            if (status === 401) {
                alert("Este bot ya ha sido registrado");
            } else if (status === 409) {
                alert("Límite de participantes alcanzado");
            } else {
                alert("Error desconocido al registrar el bot");
            }

            console.error("Error al registrar bot:", err);
        }
    };

    return (
        <div className="card p-0 shadow-lg bg-dark text-white rounded-4 mb-4">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={urlImage || iconoBot}
                        alt="Bot"
                        className="card-img-left"
                        style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                    />
                </div>

                <div className="col-md-6">
                    <h2 className="fw-bold">{name}</h2>
                    <p className="text-light fs-4 fw-semibold">{description}</p>

                    {leagueId ? (
                        <button className="btn btn-success btn-lg" onClick={handleRegisterBot}>
                            Registrar en liga
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg" onClick={() => goToDetalleBot(id)}>
                            Ver BOT
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TargetaBotComponent;
