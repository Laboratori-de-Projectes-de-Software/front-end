import foto from "../assets/img/robot.png"

import { FC } from 'react';
import {botLiga} from "../types/botLiga.tsx";



export const BotCard: FC<botLiga> = ({ posicion, nombre, cualidad, imagen, estadisticas }) => (
    <div className="card bg-dark text-light mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <h3 className="me-3 mb-0">{posicion}</h3>
                <img src={foto} alt={nombre} className="me-3 rounded" style={{ width: 64, height: 64 }} />
                <div>
                    <h5 className="card-title mb-1">{nombre}</h5>
                    <p className="card-text mb-1">Cualidad: {cualidad}</p>
                    <button className="btn btn-primary btn-sm">Ver BOT</button>
                </div>
            </div>
            <div className="text-end small">
                <div>{estadisticas.total} enfrentamientos</div>
                <div>🏆 {estadisticas.victorias} victorias</div>
                <div>❌ {estadisticas.derrotas} derrotas</div>
                <div>🤝 {estadisticas.empates} empates</div>
            </div>
        </div>
    </div>
);