// Cambiar cuando este bien deficnido
export interface Bot {
  botId?: number
  id?: number
  name: string
  description: string
  urlImage?: string
  PJ?: number
  nwins?: number
  nlosses?: number
  ndraws?: number
}

export interface League {
  leagueId: number
  state: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO'
  name: string
  urlImagen: string
  user: number
  rounds: number
  matchTime: number
  bots: number[]
}

// TODO: (ABB-146) Actualizar cuando siga el Contrato de ParticipationResponse
export interface Participation {
  botId: number
  // name: string
  botName: string
  points: number
  position: number
  // nWins: number
  // nDraws: number
  // nLosses: number
  nwins: number
  ndraws: number
  nlosses: number
  nMatches?: number
}

export interface Message {
  mensaje: string
  idBot: number
  timestamp: number
}

export interface Match {
  id: number
  state: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO'
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
  botId?: number
  leagueId: number
  classification: Participation[] // [Pos - 1][Pos][Pos + 1]
}
