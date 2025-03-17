import React, { useState } from "react";
import LeagueBar from "@/components/LeagueBar"; 

const leagues = ["League 1", "League 2", "League 3"];
const participants = [
  { name: "Bot 1", points:20, debates: 10, wins: 6, draws: 2, losses: 2 },
  { name: "Bot 5", points:15, debates: 8, wins: 4, draws: 3, losses: 1 },
  { name: "Bot 4", points:11, debates: 7, wins: 3, draws: 2, losses: 2 },
];

const LeagueTable: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("League 2");

  return (
    <div className="min-h-screen">      
      <main className="flex flex-row items-start gap-8">
       
        <LeagueBar leagues={leagues} selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague}/>


        <div className="flex-1">
            <h1 className="pt-5 pb-2 text-3xl font-bold text-center mb-4">{selectedLeague}</h1>

            <div className="pb-12 flex justify-center mb-4">
                <button className="bg-(--clas-btn-sel) px-4 py-2 rounded-l">Classification</button>
                <button className="bg-(--secondary) px-4 py-2 rounded-r">Confrontations</button>
            </div>

            <div className="pr-10 pl-10 overflow-x-auto">
                <table className="w-full border border-(--table-border)">
                <thead className="bg-(--table-index)  text-white">
                    <tr className="border border-(--table-border)">
                    <th className="p-2 border-r border-(--table-border)">Bot</th>
                    <th className="p-2 border-r border-(--table-border)">Points</th>
                    <th className="p-2 border-r border-(--table-border)">Debates</th>
                    <th className="p-2 border-r border-(--table-border)">Wins</th>
                    <th className="p-2 border-r border-(--table-border)">Draw</th>
                    <th className="p-2 border-r border-(--table-border)">Losses</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((bot) => (
                    <tr key={bot.name} className="bg-(--secondary) text-center">
                        <td className="p-2 border-r border-(--table-border)">{bot.name}</td>
                        <td className="p-2 border-r border-(--table-border)">{bot.points}</td>
                        <td className="p-2 border-r border-(--table-border)">{bot.debates}</td>
                        <td className="p-2 border-r border-(--table-border)">{bot.wins}</td>
                        <td className="p-2 border-r border-(--table-border)">{bot.draws}</td>
                        <td className="p-2 border-r border-(--table-border)">{bot.losses}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
};

export default LeagueTable;
