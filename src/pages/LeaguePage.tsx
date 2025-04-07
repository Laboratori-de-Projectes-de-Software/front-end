import { BotCard } from "../components/BotCard";
import { LeagueHeader } from "../components/LeagueHeader";
import foto from "../assets/img/robot.png"


const bots = Array.from({ length: 5 }).map((_, i) => ({
    posicion: i + 1,
    nombre: "R2D2",
    cualidad: "Generosidad",
    imagen: foto, // usa tu propia imagen
    estadisticas: {
        total: 13,
        victorias: 9,
        derrotas: 2,
        empates: 1
    }
}));

export default function LeaguePage() {
    return (
        <div className="d-flex vh-100 bg-black text-light">
            <main className="flex-grow-1 p-4 overflow-auto bg-secondary">
                <div className="container bg-dark p-4 rounded">
                    <LeagueHeader creador="Antonio" estado="Abierta" participantes={8}  />
                    <h4 className="mt-4">CLASIFICACIÓN</h4>
                    {bots.map(bot => (
                        <BotCard key={bot.posicion} {...bot} />
                    ))}
                </div>
            </main>
        </div>
    );
}