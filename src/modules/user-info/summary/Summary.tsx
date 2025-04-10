import { UserResponseDTO } from "@interfaces/user.interface";
import "./Summary.scss";

interface SummaryProps {
    user: UserResponseDTO | null;
}

const Summary: React.FC<SummaryProps> = ({ user }) => {


    return (
        <section className="profile-card">
            <div className="avatar">
                <div className="avatar-fallback">{user?.user.charAt(0).toUpperCase()}</div>
            </div>
            <div className="user-info">
                <h2 className="user-name">{user?.user}</h2>
                <div className="user-location">
                    <img src="svg/location.svg" alt="" />
                    <span>Palma de Mallorca, España</span>
                </div>
                <div className="user-badges">
                    <span className="badge">REST</span>
                    <span className="badge">Inteligencia Artificial</span>
                    <span className="badge">Frontend</span>
                </div>
            </div>
        </section>
    )
}

export default Summary;