// ConBack.ts

import axios from 'axios';
// Adjust the import path to where your interfaces are defined.
import {
    ConAPI,
    UserDTORegister,
    UserDTOLogin,
    UserResponseDTO,
    BotDTO,
    BotSummaryResponseDTO,
    BotResponseDTO,
    LeagueDTO,
    LeagueResponseDTO,
    MatchResponseDTO,
    ParticipationResponseDTO,
    MessageResponseDTO
} from './ConAPI';

// The ConBack class implements the ConAPI interface and provides placeholder HTTP requests using Axios.
export class ConBack implements ConAPI {
    private CREATE_USER_ROUTE: string = "/api/v0/auth/register";
    private POST_BOT_ROUTE: string = "/api/v0/bot";
    private GET_LEAGUE_ROUTE: string = "/api/v0/league/";
    private GET_BOT_ROUTE: string = this.POST_BOT_ROUTE;
    private POST_LEAGUE_ROUTE: string ="";
    // Create a new user.
    createUser(user: UserDTORegister): void {
        // Method returns void, so no empty return type needed
        this.generalPost<void>(this.CREATE_USER_ROUTE,user,(_=>{}));
    }

    // Login a user and return the user response data.
    loginUser(user: UserDTOLogin): UserResponseDTO {
        return {} as UserResponseDTO;
    }

    // Post a new bot and return its response data.
    // It is return as empty is an error is detected
    postBot(bot: BotDTO): BotResponseDTO {
        return this.generalPost<BotResponseDTO>(this.POST_BOT_ROUTE,bot,(_=>{}));
    }

    // Retrieve all bot summaries associated with a given user.
    getAllBotsUser(userId: BigInteger): BotSummaryResponseDTO[] {
        return [] as BotSummaryResponseDTO[];
    }

    // Retrieve a single bot (the interface takes userId as a parameter here as a placeholder).
    getBot(botId: BigInteger): BotResponseDTO {
        return this.generalEnRouteGetter<BotResponseDTO>(`${this.GET_BOT_ROUTE}${botId}`,(_=>{}));
    }

    // Update a bot. (Note: Since BotDTO doesn't have an id in its structure, we use a placeholder endpoint.)
    updateBot(bot: BotDTO): BotResponseDTO {
        return {} as BotResponseDTO;
    }

    // Create a new league.
    postLeague(league: LeagueDTO): LeagueResponseDTO {
        return this.generalPost(this.POST_LEAGUE_ROUTE,league,(_=>{}));
    }

    // Retrieve all leagues associated with a specific user.
    getAllLeaguesUser(userId: BigInteger): LeagueResponseDTO[] {
        return [] as LeagueResponseDTO[];
    }

    // Retrieve a specific league by its id.
    getLeague(leagueId: BigInteger): LeagueResponseDTO {
        return this.generalEnRouteGetter<LeagueResponseDTO>(`${this.GET_LEAGUE_ROUTE}${leagueId}`,(_=>{}));
    }

    // Update an existing league.
    updateLeague(league: LeagueDTO): LeagueResponseDTO {
        return {} as LeagueResponseDTO;
    }

    // Registers a bot to a league.
    registerBotToLeague(botId: BigInteger): void {
        // Method returns void, so no empty return type needed
    }

    // Retrieves league class standings or participation info.
    getClassLeague(): ParticipationResponseDTO[] {
        return [] as ParticipationResponseDTO[];
    }

    // Deletes a league and returns the deleted league data.
    deleteLeague(leagueId: BigInteger): LeagueResponseDTO {
        return {} as LeagueResponseDTO;
    }

    // Starts a league by its id.
    startLeague(leagueId: BigInteger): void {
        // Method returns void, so no empty return type needed
    }

    // Retrieve all matches in a given league.
    getAllMatchesLeague(leagueId: BigInteger): MatchResponseDTO[] {
        return [] as MatchResponseDTO[];
    }

    // Retrieve all messages for a specific match.
    getAllMessagesMatch(matchId: BigInteger): MessageResponseDTO[] {
        return [] as MessageResponseDTO[];
    }

    private generalEnRouteGetter<T>(route: string, errorHandler: (error: Error) => void): T{
        let responseT: T = {} as T;

        axios.get(route).then(response => {
            responseT = response.data as T;
        })
            .catch(error => {
                errorHandler(error);
            });
        return responseT;
    }

    private generalPost<T>(route: string, paramStructure: any,errorHandler: (error: Error) => void): T{
        let responseT: T = {} as T;

        axios.post(route, paramStructure)
            .then(response => {
                responseT = response.data as T;
            })
            .catch(error => {
                errorHandler(error);
            });

        return responseT;
    }



}