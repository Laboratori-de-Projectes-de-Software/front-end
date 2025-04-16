type MatchState = "PENDING" | "IN_PROCESS" | "COMPLETED"
type MatchResult = 0 | 1 | -1 | null;

export interface MatchDTO {
  id: number;
  state: MatchState;
  result: MatchResult;
  roundNumber: number;
  fighters: number[];
}