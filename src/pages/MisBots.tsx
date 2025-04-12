import {FiUser} from "react-icons/fi";
import TargetaBotComponent from "../components/TargetaBotComponent.tsx";
import {useParams} from "react-router-dom";
import {useFetchListarBots} from "../hooks/useBot.tsx";


function MisBots() {


    const {leagueId: leagueId} = useParams();
    const {botList, loading, error} = useFetchListarBots();

    if (loading) return <p className="text-center mt-5">Cargando bot...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
    return (


        <div className="container mt-4">
            {/* ENCABEZADO */}
            <div className="d-flex align-items-center mb-4">
                <FiUser size={24} className="me-2"/>
                <h3 className="fw-bold">MIS BOTS</h3>
            </div>
            {botList?.map((bot)=>(
                <TargetaBotComponent key={bot.id} {...bot} leagueId={leagueId} />
            ))}

        </div>
    );
};

export default MisBots;

