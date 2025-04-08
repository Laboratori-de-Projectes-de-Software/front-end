export interface MatchResponseDTO {
  matchId: number;
  state: string;  // TODO: cambiar a enum
  result: number; // TODO: cambiar a enum
  fighters: string[];
  roundNumber: number;
}
