/**
 * Interface for user registration data
 */
export interface UserDTORegister {
    user: string;
    mail: string;
    password: string;
}

/**
 * Interface for user login data
 */
export interface UserDTOLogin {
    user: string;
    password: string;
}

/**
 * Interface for bot information
 */
export interface BotDTO {
    name: string;
    description: string;
    urlImagen: string;
    endpoint: string;
}

/**
 * Interface for league information
 */
export interface LeagueDTO {
    name: string;
    urlImagen: string;
    rounds: number;
    matchTime: number; // in seconds
    bots: string[]; // Array of bot IDs
}