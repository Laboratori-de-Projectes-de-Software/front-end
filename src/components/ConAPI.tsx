export interface ConAPI {
    createUser: (user: UserDTORegister) => Promise<void>;
    loginUser: (user: UserDTOLogin) => Promise<UserResponseDTO>;
    postBot: (bot: BotDTO) => Promise<BotResponseDTO>;
    getAllBotsUser: (userId: BigInteger) => Promise<Array<BotSummaryResponseDTO>>;
    getBot: (botId: BigInteger) => Promise<BotResponseDTO>;
    updateBot: (bot: BotDTO) => Promise<BotResponseDTO>;
    postLeague: (league: LeagueDTO) => Promise<LeagueResponseDTO>;
    getAllLeaguesUser: (userId: BigInteger) => Promise<Array<LeagueResponseDTO>>;
    getLeague: (leagueId: BigInteger) => Promise<LeagueResponseDTO>;
    updateLeague: (league: LeagueDTO) => Promise<LeagueResponseDTO>;
    registerBotToLeague: (leagueId: BigInteger, botId: BigInteger) => Promise<void>;
    getClassLeague: () => Promise<Array<ParticipationResponseDTO>>;
    deleteLeague: (leagueId: BigInteger) => Promise<LeagueResponseDTO>;
    startLeague: (leagueId: BigInteger) => Promise<void>;
    getAllMatchesLeague: (leagueId: BigInteger) => Promise<Array<MatchResponseDTO>>;
    getAllMessagesMatch: (matchId: BigInteger) => Promise<Array<MessageResponseDTO>>;
}

export interface UserDTORegister {
    user: string; mail: string; password: string;
}
export interface UserDTOLogin {
    user: string; password: string;
}

export interface BotDTO {
    name: string; description: string; urlImage: string; endpoint: string; userId: BigInteger
}

export interface LeagueDTO {
    name: string; urlImagen: string; rounds: BigInteger; matchTime: BigInteger; bots: Int32Array; userId: BigInteger;
}

export interface UserResponseDTO {
    token: string; expiresIn: Date; user: string, userId: BigInteger;
}

export interface BotSummaryResponseDTO {
    name: string; id: BigInteger; description: string;
}

export interface BotResponseDTO {
    botId: BigInteger; name: string; description: string; urlImage: string; nWins: BigInteger; nLosses: BigInteger; nDraws: BigInteger;
}

export interface LeagueResponseDTO {
    leagueId: BigInteger; state: string; name: string; urlImage: string; user: BigInteger; rounds: BigInteger; matchTime: BigInteger; bots: Array<BigInteger>;
}

export interface MatchResponseDTO {
    matchId: BigInteger; state: string; result: BigInteger; fighters: Array<BigInteger>; roundNumber: BigInteger;
}

export interface ParticipationResponseDTO {
    botId: BigInteger; name: string; points: BigInteger; postition: BigInteger;
}
export interface MessageResponseDTO {
    text: string; botId: BigInteger; time: string;
}

