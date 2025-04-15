export interface CreateBotDTO {
  name: string;
  quality: string;
  imageUrl: string | null;
  apiUrl: string;
}
  
export interface BotDTO {
  id: number;
  name: string;
  description: string;
  urlImage: string | null;
  apiUrl: string
}