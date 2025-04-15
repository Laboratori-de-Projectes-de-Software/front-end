type MatchState = "PENDING" | "IN_PROCESS" | "COMPLETED"
type MatchResult = 0 | 1 | 2 | null;

export interface MatchDTO {
  id: number;
  state: MatchState;
  result: MatchResult;
  fighters: number[];
  roundNumber: number;
}