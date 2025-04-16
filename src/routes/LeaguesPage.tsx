import React, { useEffect, useState } from "react";
import LeagueBar from "@components/LeagueBar";
import { LeagueDTO } from "@DTOClasses/LeagueDTO";
import { getAllLeagues, getLeagueClassification, getMatchesFromLeague } from "@use-cases/UseCases";
import { ParticipationDTO } from "@DTOClasses/ParticipationDTO";
import { LeaderboardComponent } from "@components/LeaderboardComponent";
import { MatchesComponent } from "@components/MatchesComponent";
import { MatchDTO } from "@DTOClasses/MatchDTO";

const leaguesMockup: LeagueDTO[] = [{id: 1, state: "PENDING", name: "League 1", imageUrl: "", rounds: 3, matchTime: 2, bots: []},
                                      {id: 2, state: "PENDING", name: "League 2", imageUrl: "", rounds: 3, matchTime: 2, bots: []},
                                      {id: 3, state: "PENDING", name: "League 3", imageUrl: "", rounds: 3, matchTime: 2, bots: []}];

const matchesMockup: MatchDTO[] = [{id: 1, state: "PENDING", result: null, roundNumber: 3, fighters: [1, 2]},
                                    {id: 2, state: "PENDING", result: null, roundNumber: 4, fighters: [1, 2]},
                                    {id: 3, state: "IN_PROCESS", result: null, roundNumber: 1, fighters: [1, 2]},
                                    {id: 4, state: "COMPLETED", result: 0, roundNumber: 2, fighters: [1, 2]},
                                    {id: 5, state: "COMPLETED", result: 1, roundNumber: 3, fighters: [1, 2]}];

type componentShow = "Classification" | "Confrontations"

const LeaguesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueDTO | null>(null);
  const [leagues, setLeagues] = useState<LeagueDTO[]>([]);
  const [showComponent, setShowComponent] = useState<componentShow>("Classification");
  const [participants, setParticipants] = useState<ParticipationDTO[]>([]);
  const [matches, setMatches] = useState<MatchDTO[]>([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            const userId = localStorage.getItem("userId");
            if(userId) {
                const leaguesFetch = await getAllLeagues();
                setLeagues(leaguesFetch);
            } else {
                alert("You are not logged in. Complete the login to acces the page");
            }
        }
    }, []);
  
    useEffect(() => {
        if (selectedLeague === null) return;

        const fetchClassification = async () => {
            const data: ParticipationDTO[] | null = await getLeagueClassification(selectedLeague.id);
            if (data) setParticipants(data);
        };
    }, [selectedLeague]);

    useEffect(() => {
        if (selectedLeague === null) return;

        const fetchMatches = async () => {
            const matches: MatchDTO[] | null = await getMatchesFromLeague(selectedLeague.id);
            if (matches) setMatches(matches);
        };
    }, [selectedLeague]);

  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start gap-8">
        <LeagueBar
          leagues={leaguesMockup ? leaguesMockup : leagues}
          selectedLeagueId={selectedLeague ? selectedLeague.id : null}
          onSelectLeague={setSelectedLeague}
        />

        <div className="flex-1">
          <h1 className="pt-5 pb-2 text-3xl font-bold text-center mb-4">
            {selectedLeague?.name}
          </h1>

          <div className="pb-12 flex justify-center mb-4">
            <button className={`px-4 py-2 rounded-l ${showComponent === "Classification" ? "bg-gray-500 text-white" : "bg-black text-white" }`}
                    onClick={() => setShowComponent("Classification")}>
              Classification
            </button>
            <button className={`px-4 py-2 rounded-l ${showComponent === "Classification" ? "bg-black text-white" : "bg-gray-500 text-white" }`}
                    onClick={() => setShowComponent("Confrontations")}>
              Confrontations
            </button>
          </div>

            {
                showComponent === "Classification"
                ? <LeaderboardComponent participants={participants}/>
                : <MatchesComponent matches={matchesMockup ? matchesMockup : matches}/>
            }

        </div>
      </main>
    </div>
  );
};

export default LeaguesPage;