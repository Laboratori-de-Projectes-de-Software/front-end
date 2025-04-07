import { BotResponseDTO } from "./bot.interface";
import { DateTime } from "luxon";

export interface LeagueResponseDTO {
  leagueId: number;
  name: string;
  urlImagen: string;
  user: number; // Owner of the league
  rounds: number;
  matchTime: number;
  bots: BotResponseDTO[];
}

export interface LeagueDTO {
  name: string;
  urlImagen: string;
  rounds: number;
  matchTime: number;
  bots: number[];
}

export interface LeaguesFilters {
  name?: string;
  date?: DateTime;
  numRounds?: number;
  playTime?: number;
  playing?: boolean;
}

export interface LeagueType {
  id: number;
  name: string;
  date: string;
  numRounds: number;
  playTime: number;
  playing: boolean;
}
