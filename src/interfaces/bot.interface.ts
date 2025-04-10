export interface BotSummaryResponseDTO {
  nombre: string;
  id: number;
  description: string;
}

export interface BotResponseDTO {
  botId: number;
  name: string;
  description: string;
  urlImagen: string;
  nWins: number;
  nLosses: number;
  nDraws: number;
}

export interface BotDTO {
  name: string;
  description: string;
  urlImagen: string;
  endpoint: string;
  userId: number;
}
