export interface Bot {
  id: number
  name: string
  quality: string
  imageUrl: string
  apiUrl: string
  PJ?: number
  nWins?: number
  nLosses?: number
  nDraws?: number
}

export interface League {
  id: number
  name: string
  imageUrl: string
  rounds: number
  matchTime: number
  bots: number[]
  state: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

export interface Participation {
  botId: number
  botName: string
  points: number
  position: number
  nWins: number
  nDraws: number
  nLosses: number
}

export interface Match {
  id: number
  state: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  result: -1 | 0 | 1
  fighters: [Bot, Bot]
  roundNumber: number
}

export interface Message {
  botId: number
  text: string
  timestamp: number
}

// Interfaz para la gestión de los bots:
// - id: Es el identificador del bot
export interface BotSummary {
  id: number
  name: string
  description: string
}

export interface BotLeagueSummary {
  botId?: number
  leagueId: number
  classification: Participation[] // [Pos - 1][Pos][Pos + 1]
}
