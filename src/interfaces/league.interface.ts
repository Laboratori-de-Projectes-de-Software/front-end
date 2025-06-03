import { BotDTO } from "./bot.interface";

export interface LeagueDTO {
  id: number;
  state: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  name: string;
  imageUrl?: string;
  rounds: number;
  matchMaxMessages: number;
  bots: BotDTO[];
}

export interface CreateLeagueDTO {
  name: string;
  imageUrl?: string;
  rounds: number;
  matchMaxMessages: number;
}

// /* Interface propio */
// export interface LeaguesFilters {
//   name?: string;
//   date?: string;
//   numRounds?: number;
//   playTime?: number;
//   playing?: boolean;
// }

// /* Interface propio */
// export interface LeagueType {
//   id: number;
//   name: string;
//   date: string;
//   numRounds: number;
//   playTime: number;
//   playing: boolean;
// }
