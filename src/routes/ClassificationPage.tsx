import React, { useEffect, useState } from "react";
import LeagueBar from "@components/LeagueBar";
import { getAllLeagues, getLeagueClassification } from "../use-cases/UseCases";
import { ParticipationDTO } from "../DTOClasses/ParticipationDTO";
import { LeagueResponseDTO } from "@DTOClasses/LeagueDTO";

const LeagueTable: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueResponseDTO[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedLeagueName, setSelectedLeagueName] = useState<string>("");
  const [participants, setParticipants] = useState<ParticipationDTO[]>([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) return;  
      
      const userData = JSON.parse(storedUser);
      if (!userData.userId) return;
      
      if (userData.token && !localStorage.getItem("token")) {
        localStorage.setItem("token", userData.token);
      }

      const data = await getAllLeagues(userData.userId);
      if (data && data.length > 0) {
        setLeagues(data);
        setSelectedLeagueId(data[0].leagueId);
        setSelectedLeagueName(data[0].name);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagueId === null) return;

    const fetchClassification = async () => {
      const data: ParticipationDTO[] | null = await getLeagueClassification(selectedLeagueId);
      if (data) setParticipants(data);
    };

    fetchClassification();
  }, [selectedLeagueId]);


  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start gap-8">
      <LeagueBar
          leagues={leagues}
          selectedLeagueId={selectedLeagueId}
          onSelectLeague={(league: LeagueResponseDTO) => {
            setSelectedLeagueId(league.id);
            setSelectedLeagueName(league.name);
          }}
        />
        <div className="flex-1">
          <h1 className="pt-5 pb-2 text-3xl font-bold text-center mb-4">
            {selectedLeagueName}
          </h1>
          <div className="pb-12 flex justify-center mb-4">
            <button className="bg-(--clas-btn-sel) px-4 py-2 rounded-l">Classification</button>
            <button className="bg-(--secondary) px-4 py-2 rounded-r">Confrontations</button>
          </div>
          <div className="pr-10 pl-10 overflow-x-auto">
            <table className="w-full border border-(--table-border)">
              <thead className="bg-(--table-index) text-white">
                <tr className="border border-(--table-border)">
                  <th className="p-2 border-r border-(--table-border)">Bot</th>
                  <th className="p-2 border-r border-(--table-border)">Points</th>
                  <th className="p-2 border-r border-(--table-border)">Debates</th>
                  <th className="p-2 border-r border-(--table-border)">Wins</th>
                  <th className="p-2 border-r border-(--table-border)">Draws</th>
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
