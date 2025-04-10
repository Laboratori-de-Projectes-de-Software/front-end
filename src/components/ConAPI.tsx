interface ConAPI {
    createUser: (user: UserDTORegister) => void;
    loginUser: (user: UserDTOLogin) => UserResponseDTO;
    postBot: (bot: BotDTO) => BotResponseDTO;
    getAllBotsUser: (userId: BigInteger) => Array<BotSummaryResponseDTO>;
    getBot: (userId: BigInteger) => BotResponseDTO;
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

interface UserDTORegister {
    user: string; mail: string; password: string;
}
interface UserDTOLogin {
    user: string; password: string;
}

interface BotDTO{
    name: string; description: string; urlImage: string; endpoint: string; userId: BigInteger
}

interface LeagueDTO{
    name: string; urlImagen: string; rounds: BigInteger; matchTime: BigInteger; bots: Int32Array; userId:BigInteger;
}

interface UserResponseDTO{
    token: string; expiresIn: Date; user: string, userId: BigInteger;
}

interface BotSummaryResponseDTO{
    name: string; id: BigInteger; description: string;
}

interface BotResponseDTO{
    botId: BigInteger; name: string; description: string; urlImage:string; nWins: BigInteger; nLosses: BigInteger; nDraws: BigInteger;
}

interface LeagueResponseDTO{
    leagueId: BigInteger; state: string; name: string; urlImage: string; user: BigInteger; rounds: BigInteger; matchTime: BigInteger; bots: Array<BigInteger>;
}

interface MatchResponseDTO{
    matchId: BigInteger; state: string; result: BigInteger; fighters: Array<BigInteger>;roundNumber: BigInteger;
}

interface ParticipationResponseDTO{
    botId: BigInteger; name: string; points: BigInteger; postition: BigInteger;
}
interface MessageResponseDTO{
    text:string; botId: BigInteger;time:string;
}