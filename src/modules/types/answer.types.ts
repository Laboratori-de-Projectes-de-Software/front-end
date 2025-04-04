export type UserResponseDTO = {
  token: string;
  expiresIn: number;
  user: string;
  userId: number;
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
  user: string; // Owner of the league
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

export type BotSumaryResponseDTO = { //TODO: Actualizar este type cuando esté definido
  botId: number;
  name: string;
  description: string;
  urlImagen: string;
  nWins: number;
  nLoses: number;
  nDraws: number;
}

export type ParticipationResponseDTO = { // TODO: Actualizar este type cuando esté definido
  participationId: number;
}