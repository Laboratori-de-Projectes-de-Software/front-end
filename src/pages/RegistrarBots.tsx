import {useFetchListarBots} from "../hooks/useBot.tsx";
import {useState} from "react";
import {BotDetail} from "../types/BotDetail.tsx";
import {useNavigate} from "react-router-dom";
import {registerBotToLeague} from "../services/apiCalls.ts";
import {Button, ListGroup} from "react-bootstrap";
import {FiUser} from "react-icons/fi";
import TargetaBotComponent from "../components/TargetaBotComponent.tsx";



export default function RegisterBotPage() {
    const navigate = useNavigate();

    const bots = useFetchListarBots();

    const handleRegister = async (botId: number, leagueId: number) => {
        const res = await registerBotToLeague({ botId, leagueId });
        if (res.status === 200) {
            alert("Bot registrado correctamente");
            navigate(`/league/${leagueId}`);
        } else {
            alert("Error al registrar el bot");
        }
    };

    return (
        <div className="container my-4 text-light">
            <h2>Selecciona un bot para registrar</h2>
            <div className="container mt-4">
                {/* ENCABEZADO */}
                <div className="d-flex align-items-center mb-4">
                    <FiUser size={24} className="me-2"/>
                    <h3 className="fw-bold">MIS BOTS</h3>
                </div>
                {bots?.map((bot) => (
                    <TargetaBotComponent {...bot} ></TargetaBotComponent>
                ))}

            </div>
        </div>
    );
}
