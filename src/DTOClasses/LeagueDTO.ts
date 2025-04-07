import { BotSummaryResponseDTO } from "./BotDTO";

export interface LeagueDTO {
    name: string;
    bots: string[]; // IDs o noms dels bots
    maxRounds: number;
    maxTime: number;
  }

  export interface LeagueResponseDTO {
    leagueId: number;
    name: string;
    ownerId: number;
    bots: BotSummaryResponseDTO[];
    maxRounds: number;
    maxTime: number;
  }