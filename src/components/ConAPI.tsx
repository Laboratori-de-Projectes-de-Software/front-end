export interface ConAPI {
    createUser: (user: UserDTORegister) => Promise<void>;
    loginUser: (user: UserDTOLogin) => Promise<UserResponseDTO>;
    postBot: (bot: BotDTO) => Promise<BotResponseDTO>;
    getAllBotsUser: (userId: number) => Promise<Array<BotSummaryResponseDTO>>;
    getBot: (botId: number) => Promise<BotResponseDTO>;
    updateBot: (bot: BotDTO, botId: number) => Promise<BotResponseDTO>;
    postLeague: (league: LeagueDTO) => Promise<LeagueResponseDTO>;
    getAllLeaguesUser: (userId: number) => Promise<Array<LeagueResponseDTO>>;
    getLeague: (leagueId: number) => Promise<LeagueResponseDTO>;
    updateLeague: (league: LeagueDTO, leagueId: number) => Promise<LeagueResponseDTO>;
    registerBotToLeague: (leagueId: number, botId: number) => Promise<void>;
    getClassLeague: (leagueId: number) => Promise<Array<ParticipationResponseDTO>>;
    deleteLeague: (leagueId: number) => Promise<LeagueResponseDTO>;
    startLeague: (leagueId: number) => Promise<void>;
    getAllMatchesLeague: (leagueId: number) => Promise<Array<MatchResponseDTO>>;
    getAllMessagesMatch: (matchId: number) => Promise<Array<MessageResponseDTO>>;
}

export interface UserDTORegister {
    user: string; mail: string; password: string;
}
export interface UserDTOLogin {
    user: string; password: string;
}

export interface BotDTO {
    name: string; description: string; urlImage: string; endpoint: string; userId: number;
}

export interface LeagueDTO {
    name: string; urlImagen: string; rounds: number; matchTime: number; bots: Array<number>; userId: number;
}

export interface UserResponseDTO {
    token: string; expiresIn: Date; user: string, userId: number;
}

export interface BotSummaryResponseDTO {
    name: string; id: number; description: string;
}

export interface BotResponseDTO {
    botId: number; name: string; description: string; urlImage: string; nWins: number; nLosses: number; nDraws: number;
}

export interface LeagueResponseDTO {
    leagueId: number; state: string; name: string; urlImage: string; user: number; rounds: number; matchTime: number; bots: Array<number>;
}

export interface MatchResponseDTO {
    matchId: number; state: string; result: number; fighters: Array<number>; roundNumber: number;
}

export interface ParticipationResponseDTO {
    botId: number; name: string; points: number; postition: number;
}
export interface MessageResponseDTO {
    text: string; botId: number; time: string;
}

