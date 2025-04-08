export interface BotSumaryResponseDTO {
  nombre: string;
  id: number;
  cualidad: string;
}

export interface BotResponseDTO {
  botId: number;
  name: string;
  description: string;
  urlImagen: string;
  nWins: number;
  nLoses: number;
  nDraws: number;
}

export interface BotDTO {
  name: string;
  description: string;
  urlImagen: string;
  endpoint: string;
}
