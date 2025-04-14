import { FiUser } from "react-icons/fi";
import TargetaBotComponent from "../components/TargetaBotComponent.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchListarBots, useFetchTodosLosBots } from "../hooks/useBot.tsx";
import { getLeagueOwnerById } from "../services/apiCalls.ts";

function MisBots() {
    const { leagueId } = useParams();
    const [isCreator, setIsCreator] = useState(false);
    const userId = localStorage.getItem("userId");

    const { botList: misBots, loading: loadingMisBots, error: errorMisBots } = useFetchListarBots();
    const { botList: todosBots, loading: loadingTodos, error: errorTodos } = useFetchTodosLosBots();

    useEffect(() => {
        const fetchLeagueCreator = async () => {
            if (!leagueId) return;
            try {
                const owner = await getLeagueOwnerById(leagueId, {});
                if (owner?.data.toString() === userId?.toString()) {
                    setIsCreator(true);
                }
            } catch (err) {
                console.error("Error comprobando creador de liga", err);
            }
        };

        fetchLeagueCreator();
    }, [leagueId, userId]);

    const botList = leagueId
        ? isCreator
            ? todosBots
            : misBots
        : misBots;

    const loading = leagueId
        ? isCreator
            ? loadingTodos
            : loadingMisBots
        : loadingMisBots;

    const error = leagueId
        ? isCreator
            ? errorTodos
            : errorMisBots
        : errorMisBots;

    if (loading) return <p className="text-center mt-5">Cargando bots...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <FiUser size={24} className="me-2" />
                <h3 className="fw-bold">MIS BOTS</h3>
            </div>

            {botList?.map((bot) => (
                <TargetaBotComponent key={bot.id} {...bot} leagueId={leagueId} />
            ))}
        </div>
    );
}

export default MisBots;
