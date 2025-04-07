export interface MatchDTO {
    matchId: number;
    bot_local: {
      nom: string;
      topic: string;
    };
    bot_visitant: {
      nom: string;
      topic: string;
    };
    duracio: number;
  }