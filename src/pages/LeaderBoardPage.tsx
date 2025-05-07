import {Leaderboard} from "../components/BotClasification.tsx";





export default function LeaderBoardPage() {
    return (
        <div className="d-flex vh-100 bg-black text-light">
            <main className="flex-grow-1 p-4 overflow-auto bg-secondary">
                <div className="container bg-dark p-4 rounded">

                    <Leaderboard />

                </div>
            </main>
        </div>
    );
}