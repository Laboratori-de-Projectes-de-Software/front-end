export interface MatchResponseDTO {
  matchId: number;
  result: 0 | 1 | 2; // 0: empate; 1: victoria bot1; 2: victoria bot2
  state: "pendiente" | "en curso" | "finalizado";
  fighters: string[];
  roundNumber: number;
}
