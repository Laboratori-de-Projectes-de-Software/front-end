import { BotDTO } from "./bot.interface";

export interface MatchDTO {
  id: number;
  result: number;
  state: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  fighters: BotDTO[];
  roundNumber: number;
}
