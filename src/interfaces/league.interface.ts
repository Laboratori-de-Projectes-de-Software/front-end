export interface LeagueResponseDTO {
  leagueId: number;
  state: "pendiente" | "en curso" | "finalizado";
  name: string;
  urlImagen: string;
  user: number; // Owner of the league
  rounds: number;
  matchTime: number;
  bots: number[];
}

export interface LeagueDTO {
  name: string;
  urlImagen: string;
  rounds: number;
  matchTime: number;
  bots: number[];
  userId: number;
}

// /* Interface propio */
// export interface LeaguesFilters {
//   name?: string;
//   date?: string;
//   numRounds?: number;
//   playTime?: number;
//   playing?: boolean;
// }

// /* Interface propio */
// export interface LeagueType {
//   id: number;
//   name: string;
//   date: string;
//   numRounds: number;
//   playTime: number;
//   playing: boolean;
// }
