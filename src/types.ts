export interface Participation {
  botId: number
  name: string
  points: number
  position: number
  nWins: number
  nDraws: number
  nLosses: number
  nMatches?: number
}

export interface Bot {
  botId: number
  name: string
  description: string
  urlImage: string
  PJ?: number
  nWins: number
  nLosses: number
  nDraws: number
}

// TODO: Cambiar cuando se siga el Contrato de LeagueResponse (ABB-142)
// export interface League {
//   leagueId: number
//   state: "PENDIENTE" | "EN CURSO" | "FINALIZADO"
//   name: string
//   urlImagen: string
//   user: number
//   rounds: number
//   matchTime: number
//   bots: number[]
// }
export interface League {
  id: number
  estado: 'PENDIENTE' | 'EN CURSO' | 'FINALIZADO'
  nombre: string
  urlImagen: string
  user: number
  rondas: number
  matchTime: number
  bots: number[]
}

export interface Message {
  text: string
  botId: number
  time: number
}

export interface Match {
  matchId: number
  state: 'PENDIENTE' | 'EN CURSO' | 'FINALIZADO'
  result: 1 | 2 | 3
  fighters: [string, string]
  roundNumber: number
}

// Interfaz para la gestión de los bots:
// - id: Es el identificador del bot
export interface BotSummary {
  id: number
  name: string
  description: string
}

export interface BotLeagueSummary {
  botId: number
  league: League
  classification: Participation[] // [Pos - 1][Pos][Pos + 1]
}
