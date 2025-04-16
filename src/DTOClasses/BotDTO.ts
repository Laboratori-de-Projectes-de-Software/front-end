export interface CreateBotDTO {
  name: string;
  quality: string;
  imageUrl: string | null;
  apiUrl: string;
}
  
export interface BotDTO {
  id: number;
  name: string;
  quality: string;
  imageUrl: string | null;
  apiUrl: string;
  nWins: number;
  nDraws: number;
  nLosses: number;
}