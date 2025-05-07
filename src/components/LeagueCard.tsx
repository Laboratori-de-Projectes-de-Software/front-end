import "react";

// Define the interface for the component props
export interface LeagueCardProps {
  leagueId: number;
  estado: string;
  name: string;
  urlImagen: string; // Assuming this is a general image URL for the league/bot
  user: number; // Assuming this is a user ID
  matchTime: string;
  rounds: number;
  bots: number[]; // Array of bot IDs, length represents participants
  onClick?: () => void; // Optional click handler
}

export default function BotCard({
  leagueId,
  estado,
  name,
  urlImagen,
  user,
  matchTime,
  rounds,
  bots,
  onClick,
}: LeagueCardProps) {
  const participantCount = bots.length; // Calculate participant count from bots array

  return (
    <div
      className="flex flex-col text-center justify-between rounded-2xl bg-zinc-700 text-white shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
      onClick={onClick} // Attach the click handler if provided
    >
      {/* Header with League Name */}
      <div
        className="bg-zinc-800 py-2 px-4 font-semibold text-lg truncate"
        title={name}
      >
        {name}
      </div>

      <div className="p-4 space-y-3">
        {/* Optional: Display League Image if urlImagen is provided */}
        {urlImagen && (
          <div className="flex justify-center">
            <img
              src={urlImagen}
              alt={name} // Use league name as alt text
              className="rounded object-cover w-full h-32 shadow-lg mb-2" // Adjusted styling
            />
          </div>
        )}

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-left">
            <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
              State
            </span>
            <span className="text-base">{estado}</span>
          </div>
          <div className="text-right">
            <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
              Match Time
            </span>
            <span className="text-base">{matchTime}</span>
          </div>
          <div className="text-left">
            <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
              Rounds
            </span>
            <span className="text-base">{rounds}</span>
          </div>
          <div className="text-right">
            <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
              Bots
            </span>
            <span className="text-base">{participantCount}</span>
          </div>
          {/* Optional: Display League ID and User ID if needed */}
          {/*
           <div className="text-left">
             <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
               League ID
             </span>
             <span className="text-base">{leagueId}</span>
           </div>
           <div className="text-right">
             <span className="block font-semibold text-gray-300 uppercase tracking-wider text-xs">
               User ID
             </span>
             <span className="text-base">{user}</span>
           </div>
           */}
        </div>
      </div>
    </div>
  );
}
