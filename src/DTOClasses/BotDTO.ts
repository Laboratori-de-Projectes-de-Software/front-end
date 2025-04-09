export interface BotDTO {
  name: string;
  description: string;
  urlImage: string;
  endpoint: string;
  userId: number;
}
  
export interface BotResponseDTO {
  botId: number;
  name: string;
  description: string;
  urlImage: string;
  nWins: number;
  nLosses: number;
  nDraws: number;
}
  
export interface BotSummaryResponseDTO {
  name: string;
  id: number;
  description: string;
}