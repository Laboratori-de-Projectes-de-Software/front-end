/**
 * User response after authentication
 */
export interface UserResponseDTO {
    token: string;
    expiresIn: Date;
    user: string;
    userId: number;
}

/**
 * Summary information about a bot
 */
export interface BotSummaryResponseDTO {
    name: string;
    id: number;
    description: string;
}

/**
 * Detailed information about a bot
 */
export interface BotResponseDTO {
    botId: number;
    name: string;
    description: string;
    urlImage: string;
    nWins: number;
    nLosses: number;
    nDraws: number;
}

/**
 * Enum for league states
 */
export enum LeagueState {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}

/**
 * League information
 */
export interface LeagueResponseDTO {
    leagueId: number;
    state: LeagueState;
    name: string;
    urlImagen: string;
    user: number;  // owner ID
    rounds: number;
    matchTime: number;  // seconds
    bots: number[];    // array of bot IDs
}

/**
 * Enum for match results
 */
export enum MatchResult {
    BOT1_WINS = 1,
    BOT2_WINS = 2,
    DRAW = 0
}

/**
 * Enum for match states
 */
export enum MatchState {
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}

/**
 * Match information
 */
export interface MatchResponseDTO {
    matchId: number;
    state: MatchState;
    result: MatchResult;
    fighters: string[];  // bot names
    roundNumber: number;
}

/**
 * Message in a match
 */
export interface MessageResponseDTO {
    text: string;
    botId: number;
    time: string;  // ISO format
}

/**
 * Bot participation in a league
 */
export interface ParticipationResponseDTO {
    botId: number;
    name: string;
    points: number;
    position: number;
    nWins: number;
    nDraws: number;
    nLosses: number;
}