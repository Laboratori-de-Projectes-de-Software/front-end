import { AuthenticatedUserDTO } from "@interfaces/user.interface";
import React from "react";

interface ExtraInfoProps {
    user: AuthenticatedUserDTO | null;
}

const ExtraInfo: React.FC<ExtraInfoProps> = ({ user }) => {
    return (
        <div className="info-card">
            <div className="info-grid">
                <div className="info-item">
                    <img src="svg/calendar.svg" alt="" />
                    <div>
                        <p className="info-label">Fecha de nacimiento</p>
                        <p className="info-value">Añadir fecha de nacimiento</p>
                    </div>
                </div>
            </div>

            <div className="about-section">
                <h3 className="about-title">Sobre mí</h3>
                <p className="about-text">
                    Diseñador UX/UI con más de 8 años de experiencia creando interfaces intuitivas y atractivas.
                    Especializado en diseño minimalista y centrado en el usuario, con un enfoque en la accesibilidad y la
                    usabilidad. Apasionado por resolver problemas complejos a través del diseño.
                </p>
            </div>
        </div>
    )
}

export default ExtraInfo;