type LeagueState = "PENDING" | "IN_PROCESS" | "COMPLETED"

export interface CreateLeagueDTO {
  name: string;
  imageUrl?: string | null;
  rounds: number;
  matchTime: number;  
}

export interface LeagueDTO {
  id: number;
  name: string;
  state: LeagueState
  imageUrl?: string | null;
  rounds: number;
  matchTime: number;
  bots: number[];
}