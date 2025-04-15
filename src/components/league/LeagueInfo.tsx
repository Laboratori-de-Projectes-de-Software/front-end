import React from "react";

import type { LeagueCardProps } from "../LeagueCard";
import {
  type ParticipationResponseDTO,
  type MatchResponseDTO,
  type MessageResponseDTO,
} from "../../utils/responseInterfaces";
import { sendAuthedRequest } from "../../utils/auth";

export default function LeagueInfo(league: LeagueCardProps) {
  const [leaderboard, setLeaderboard] = React.useState<
    ParticipationResponseDTO[]
  >([]);
  const [matches, setMatches] = React.useState<MatchResponseDTO[]>([]);
  const [activeMatch, setActiveMatch] = React.useState<MatchResponseDTO | null>(
    null
  );

  // Peticion a la api de leaderboards
  React.useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(
          `http://localhost:8080/league/${league.leagueId}/leaderboard`
        );
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data);
        } else {
          console.error("Error fetching leaderboard:", response.status);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }

    fetchLeaderboard();
  }, []);

  // Peticion a la api de matches
  React.useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch(
          `http://localhost:8080/league/${league.leagueId}/match`
        );
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
        } else {
          console.error("Error fetching matches:", response.status);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();
  }, []);

  async function startLeague() {
    // Hacemos peticion post a ../league/{leagueId}/start

    const response = await sendAuthedRequest(
      "POST",
      `http://localhost:8080/league/${league.leagueId}/start`,
      "{}"
    );

    if (response.ok) {
      console.log("League started successfully");
    } else {
      console.error("Error starting league:", response.status);
    }
  }

  async function deleteLeague() {
    // Hacemos peticion delete a ../league/{leagueId}
    const response = await sendAuthedRequest(
      "DELETE",
      `http://localhost:8080/league/${league.leagueId}`,
      "{}"
    );

    if (response.ok) {
      console.log("League deleted successfully");
      // Redirigir a la página de búsqueda de ligas
      league.onClick();
    } else {
      console.error("Error deleting league:", response.status);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-gray-100">
      {/* Top Bar: Return Button */}
      <div className="flex justify-around p-4 sticky top-0 bg-zinc-800 z-10 shadow-md">
        <button
          onClick={league.onClick}
          className="bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 transition duration-150 ease-in-out"
        >
          Back
        </button>
        <button
          onClick={deleteLeague}
          className="bg-red-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-800 transition duration-150 ease-in-out"
        >
          Delete League
        </button>
        <button
          onClick={startLeague}
          className="ml-4 bg-green-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-800 transition duration-150 ease-in-out"
        >
          Start League
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center py-6 px-4">
        <h1
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-2xl md:text-3xl lg:text-4xl font-bold px-6 py-3 rounded-xl shadow-lg"
          title={league.name}
        >
          {league.name}
        </h1>
      </div>

      {/* Pills Section */}
      <div className="flex flex-wrap justify-center items-center gap-3 p-4 bg-zinc-700/50 rounded-lg mx-4 md:mx-8 lg:mx-12 mb-6 shadow">
        <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-colors">
          Participants: {league.bots.length}
        </span>
        <span className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors">
          Rounds: {league.rounds}
        </span>
        <span className="bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-600 transition-colors">
          Match Time: {league.matchTime}
        </span>
        <span className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-600 transition-colors">
          State: {league.estado}
        </span>
      </div>

      {/* Main Content Area (Responsive Columns) */}
      <div className="flex flex-col md:flex-row flex-grow p-4 md:p-6 lg:p-8 gap-6">
        {/* Left Column: Leaderboard */}
        <div className="w-full md:w-1/3 bg-zinc-800 rounded-lg shadow-xl p-5 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Leaderboard
          </h3>
          <div className="flex-grow overflow-y-auto">
            {" "}
            {/* Added for potential scroll */}
            {/* Placeholder for leaderboard content */}
            <ul className="space-y-2 text-base">
              {/* Map */}
              {leaderboard.map((player) => (
                <li
                  key={player.botId}
                  className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm"
                >
                  <span className="font-medium text-gray-200">
                    {player.name}
                  </span>
                  <span className="font-semibold text-green-400">
                    {player.points}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: League Details & Image */}
        <div className="w-full md:w-2/3 flex flex-col space-y-6">
          {/* All Matches Map*/}

          <div className="bg-zinc-800 rounded-lg shadow-xl p-5 flex-grow">
            <h3 className="text-xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              All Matches
            </h3>

            {/* If not selected, show matches board, else  show chat*/}
            {activeMatch ? (
              <MatchChat match={activeMatch} setActiveMatch={setActiveMatch} />
            ) : (
              matchesBoard(matches, setActiveMatch)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function matchesBoard(
  matches: MatchResponseDTO[],
  setActiveMatch: React.Dispatch<React.SetStateAction<MatchResponseDTO | null>>
) {
  return (
    <div className="overflow-y-auto h-full">
      <ul className="space-y-2 text-base">
        {matches.map((match) => (
          <li
            key={match.matchId}
            className="flex justify-between items-center bg-zinc-700/50 hover:bg-zinc-700 transition-colors duration-150 ease-in-out p-3 rounded-md shadow-sm"
            onClick={() => setActiveMatch(match)}
          >
            <span className="font-medium text-gray-200">
              {match.fighters[0]} vs {match.fighters[1]}
            </span>
            <span className="font-semibold text-green-400">{match.result}</span>
            <span className="font-semibold text-gray-400">
              {match.roundNumber} rounds
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Renamed from matchChat to MatchChat and made it a proper component
function MatchChat({
  match,
  setActiveMatch,
}: {
  match: MatchResponseDTO;
  setActiveMatch: React.Dispatch<React.SetStateAction<MatchResponseDTO | null>>;
}) {
  const [messages, setMessages] = React.useState<MessageResponseDTO[]>([]);

  // Fetch ../match/{matchId}/message
  React.useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await sendAuthedRequest(
          "GET",
          `http://localhost:8080/match/${match.matchId}/message`
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Error fetching messages:", response.status);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, [match.matchId]);

  return (
    <div className="overflow-y-auto h-full">
      {/* Add a button to go back to the matches list */}
      <button
        onClick={() => setActiveMatch(null)}
        className="mb-4 bg-gray-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-800 transition duration-150 ease-in-out"
      >
        Back to Matches
      </button>
      <ul className="space-y-2 text-base">
        {messages.map((message) => (
          <li
            key={message.time} // Consider using a more unique key if time isn't guaranteed unique
            className="flex justify-between items-center bg-zinc-700/50 p-3 rounded-md shadow-sm"
          >
            <span className="font-medium text-gray-200">
              {/* Display bot name if available, otherwise ID */}
              {message.botId}: {message.text}
            </span>
            {/* Optionally display timestamp or other message details */}
          </li>
        ))}
      </ul>
    </div>
  );
}
