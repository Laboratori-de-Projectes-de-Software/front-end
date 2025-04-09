export interface LeagueDTO {
  name: string;
  urlImage: string;
  rounds: number;
  matchTime: number;
  bots: number[];
  userId: number;  
}

export interface LeagueResponseDTO {
  leagueId: number;
  state: string;
  name: string;
  urlImage: string;
  user: number;
  rounds: number;
  matchTime: number;
  bots: number[];
}