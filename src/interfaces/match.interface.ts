export interface MatchResponseDTO {
  matchId: number;
  state: 0 | 1 | 2; // 0: empate; 1: victoria bot1; 2: victoria bot2
  result: "pendiente" | "en curso" | "finalizado";
  fighters: string[];
  roundNumber: number;
}
