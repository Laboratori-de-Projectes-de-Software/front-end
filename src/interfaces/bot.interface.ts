export interface BotDTO {
  id: number;
  name: string;
  quality: string;
  imageUrl?: string;
  apiUrl: string;
  nWins?: number;
  nLosses?: number;
  nDraws?: number;
}

export interface CreateBotDTO {
  name: string;
  quality: string;
  imageUrl?: string;
  apiUrl: string;
}

