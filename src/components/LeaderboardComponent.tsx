import { ParticipationDTO } from "@DTOClasses/ParticipationDTO";

interface LeaderboardComponentProps {
    participants: ParticipationDTO[];
}

export const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ participants }) => {
    return(<div className="flex-1">
        <div className="pr-10 pl-10 overflow-x-auto">
          <table className="w-full border border-(--table-border)">
            <thead className="bg-(--table-index) text-white">
              <tr className="border border-(--table-border)">
                <th className="p-2 border-r border-(--table-border)">Position</th>
                <th className="p-2 border-r border-(--table-border)">Bot</th>
                <th className="p-2 border-r border-(--table-border)">Points</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((bot) => (
                <tr key={bot.botName} className="bg-(--secondary) text-center">
                  <td className="p-2 border-r border-(--table-border)">{bot.position}</td>
                  <td className="p-2 border-r border-(--table-border)">{bot.botName}</td>
                  <td className="p-2 border-r border-(--table-border)">{bot.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>);
}