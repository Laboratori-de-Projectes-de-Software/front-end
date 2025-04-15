import { MatchDTO } from "@DTOClasses/MatchDTO";

interface Params {
    matches: MatchDTO[]
}

export const MatchesComponent: React.FC<Params> = ({matches}) => {
    return(<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {matches.length > 0 && matches.map((match, index) => (
          <div
            key={index}
            className="bg-black text-white text-lg p-4 rounded-lg text-center h-28"
          >
            <p className="font-bold text-gray-400">{match.fighters[0]} vs {match.fighters[1]}</p>
            {index < 7 ? (
              <p className="mt-4 text-white font-bold">Victoria {match.result}</p>
            ) : (
              <button className="mt-2 bg-gray-200 text-black px-4 py-2 rounded-md">
                Start ▶
              </button>
            )}
          </div>
        ))}
      </div>);
}