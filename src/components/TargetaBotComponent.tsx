import { useNavigate } from "react-router-dom";
import { registerBotToLeague, deleteBot } from "../services/apiCalls.ts";
import { BotDetail } from "../types/BotDetail.tsx";
import iconoBot from "../assets/img/iconoBot.png";

interface Props extends BotDetail {
    leagueId?: string;
    editable?: boolean;
}

function TargetaBotComponent({ name, id, description, urlImage, leagueId, editable = false }: Props) {
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

    const handleDeleteBot = async () => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este bot?");
        if (!confirmar) return;

        try {
            const res = await deleteBot(id, {});
            if (res.status === 200 || res.status === 204) {
                alert("Bot eliminado exitosamente.");
                window.location.reload();
            } else {
                alert("No se pudo eliminar el bot.");
            }
        } catch (err) {
            console.error("Error al eliminar el bot:", err);
            alert("Error al eliminar el bot.");
        }
    };

    const handleEditBot = () => {
        navigate(`/crear-bot?editing=true&botId=${id}`);
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
                        <button className="btn btn-success btn-lg me-2" onClick={handleRegisterBot}>
                            Registrar en liga
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg me-2" onClick={() => goToDetalleBot(id)}>
                            Ver BOT
                        </button>
                    )}

                    {editable && (
                        <div className="mt-3 d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm" onClick={handleEditBot}>
                                Actualizar
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteBot}>
                                Borrar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TargetaBotComponent;
