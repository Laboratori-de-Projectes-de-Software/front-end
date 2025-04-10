export interface ConAPI {
    createUser: (user: UserDTORegister) => void;
    loginUser: (user: UserDTOLogin) => UserResponseDTO;
    postBot: (bot: BotDTO) => BotResponseDTO;
    getAllBotsUser: (userId: BigInteger) => Array<BotSummaryResponseDTO>;
    getBot: (botId: BigInteger) => BotResponseDTO;
    updateBot: (bot: BotDTO) => BotResponseDTO;
    postLeague: (league: LeagueDTO) => LeagueResponseDTO;
    getAllLeaguesUser: (userId: BigInteger) => Array<LeagueResponseDTO>;
    getLeague: (leagueId: BigInteger) => LeagueResponseDTO;
    updateLeague: (league: LeagueDTO) => LeagueResponseDTO;
    registerBotToLeague: (botId: BigInteger) => void;
    getClassLeague: () => Array<ParticipationResponseDTO>;
    deleteLeague: (leagueId: BigInteger) => LeagueResponseDTO;
    startLeague: (leagueId: BigInteger) => void;
    getAllMatchesLeague: (leagueId: BigInteger) => Array<MatchResponseDTO>;
    getAllMessagesMatch: (matchId: BigInteger) => Array<MessageResponseDTO>;
}

export interface UserDTORegister {
    user: string; mail: string; password: string;
}
export interface UserDTOLogin {
    user: string; password: string;
}

export interface BotDTO{
    name: string; description: string; urlImage: string; endpoint: string; userId: BigInteger
}

export interface LeagueDTO{
    name: string; urlImagen: string; rounds: BigInteger; matchTime: BigInteger; bots: Int32Array; userId:BigInteger;
}

export interface UserResponseDTO{
    token: string; expiresIn: Date; user: string, userId: BigInteger;
}

export interface BotSummaryResponseDTO{
    name: string; id: BigInteger; description: string;
}

export interface BotResponseDTO{
    botId: BigInteger; name: string; description: string; urlImage:string; nWins: BigInteger; nLosses: BigInteger; nDraws: BigInteger;
}

export interface LeagueResponseDTO{
    leagueId: BigInteger; state: string; name: string; urlImage: string; user: BigInteger; rounds: BigInteger; matchTime: BigInteger; bots: Array<BigInteger>;
}

export interface MatchResponseDTO{
    matchId: BigInteger; state: string; result: BigInteger; fighters: Array<BigInteger>;roundNumber: BigInteger;
}

export interface ParticipationResponseDTO{
    botId: BigInteger; name: string; points: BigInteger; postition: BigInteger;
}
export interface MessageResponseDTO{
    text:string; botId: BigInteger;time:string;
}

