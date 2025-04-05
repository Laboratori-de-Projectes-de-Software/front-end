import { DateTime } from "luxon";

export type UserResponseDTO = {
  token: string;
  expiresIn: DateTime; // FIXME: No estoy muy a favor ni seguro de esto
  user: string;
  userId: number;
}

export type BotSumaryResponseDTO = {
  nombre: string;
  id: number;
  cualidad: string;
}

export type BotResponseDTO = {
  botId: number;
  name: string;
  description: string;
  urlImagen: string;
  nWins: number;
  nLoses: number;
  nDraws: number;
}

export type LeagueResponseDTO = {
  leagueId: number;
  name: string;
  urlImagen: string;
  user: number; // Owner of the league
  rounds: number;
  matchTime: number;
  bots: BotResponseDTO[];
}

export type MatchResponseDTO = {
  state: string;
  result: number;
  fighters: string[];
  roundNumber: number;
}

export type MessageResponseDTO = {
  text: string;
  botId: number;
  time: string;
}

export type ParticipationResponseDTO = { // TODO: Actualizar este type cuando esté definido
  botId: number;
  name: string;
  points: number;
  position: number;
}