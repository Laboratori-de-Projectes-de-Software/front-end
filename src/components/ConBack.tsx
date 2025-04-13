// ConBack.ts

import axios, { AxiosError } from 'axios';
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
import { UserAlreadyExists, HttpError } from './ConErrors';

// The ConBack class implements the ConAPI interface and provides placeholder HTTP requests using Axios.
export class ConBack implements ConAPI {
    private DOMAIN: string = "http://localhost:8080"

    // TODO: add the fuil path of the routes with /api/v0
    private CREATE_USER_ROUTE: string = "/auth/register";
    private POST_BOT_ROUTE: string = "/bot";
    private GET_LEAGUE_ROUTE: string = "/league/";
    private GET_BOT_ROUTE: string = this.POST_BOT_ROUTE;
    private POST_LEAGUE_ROUTE: string = "/league/";
    private REGISTER_BOT_TO_LEAGUE_ROUTE: string = "/league/";
    private DELETE_LEAGUE_ROUTE: string = "/league/";
    private GET_MATCHES_LEAGUE_ROUTE: string = "/league/";
    // Create a new user.
    createUser(user: UserDTORegister): Promise<void> {
        // Method returns void, so no empty return type needed
        const errorHandler = (error: Error) => {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const statusCode = axiosError.response?.status;

                // Transform HTTP status codes into custom errors
                switch (statusCode) {
                    case 409:
                        throw new UserAlreadyExists();
                    default:
                        throw new HttpError(
                            statusCode || 500,
                            axiosError.message || 'Unknown error occurred'
                        );
                }
            }
            throw error;
        }

        return this.generalPost<void>(this.CREATE_USER_ROUTE, user, errorHandler);
    }

    // Login a user and return the user response data.
    loginUser(user: UserDTOLogin): Promise<UserResponseDTO> {
        return {} as Promise<UserResponseDTO>;
    }

    // Post a new bot and return its response data.
    // It is return as empty is an error is detected
    postBot(bot: BotDTO): Promise<BotResponseDTO> {
        return this.generalPost<BotResponseDTO>(this.POST_BOT_ROUTE, bot, (_ => { }));
    }

    // Retrieve all bot summaries associated with a given user.
    getAllBotsUser(userId: BigInteger): Promise<BotSummaryResponseDTO[]> {
        return {} as Promise<BotSummaryResponseDTO[]>;
    }

    // Retrieve a single bot (the interface takes userId as a parameter here as a placeholder).
    getBot(botId: BigInteger): Promise<BotResponseDTO> {
        return this.generalEnRouteGetter<BotResponseDTO>(`${this.GET_BOT_ROUTE}${botId}`, (_ => { }));
    }

    // Update a bot. (Note: Since BotDTO doesn't have an id in its structure, we use a placeholder endpoint.)
    updateBot(bot: BotDTO): Promise<BotResponseDTO> {
        return {} as Promise<BotResponseDTO>;
    }

    // Create a new league.
    async postLeague(league: LeagueDTO): Promise<LeagueResponseDTO> {
        console.log(league);
        return this.generalPost(this.POST_LEAGUE_ROUTE, league, (_ => { }));
    }

    // Retrieve all leagues associated with a specific user.
    getAllLeaguesUser(userId: BigInteger): Promise<LeagueResponseDTO[]> {
        return {} as Promise<LeagueResponseDTO[]>;
    }

    // Retrieve a specific league by its id.
    getLeague(leagueId: BigInteger): Promise<LeagueResponseDTO> {
        return this.generalEnRouteGetter<LeagueResponseDTO>(`${this.GET_LEAGUE_ROUTE}${leagueId}`, (_ => { }));
    }

    // Update an existing league.
    updateLeague(league: LeagueDTO): Promise<LeagueResponseDTO> {
        return {} as Promise<LeagueResponseDTO>;
    }

    // Registers a bot to a league.
    registerBotToLeague(leagueId: BigInteger, botId: BigInteger): Promise<void> {
        // Method returns void, so no empty return type needed
        return this.generalPost<void>(`${this.REGISTER_BOT_TO_LEAGUE_ROUTE}${leagueId}/bot`, botId, (_ => { }));
    }

    // Retrieves league class standings or participation info.
    getClassLeague(): Promise<ParticipationResponseDTO[]> {
        return {} as Promise<ParticipationResponseDTO[]>;
    }

    // Deletes a league and returns the deleted league data.
    deleteLeague(leagueId: BigInteger): Promise<LeagueResponseDTO> {
        return axios.delete<LeagueResponseDTO>(`${this.DELETE_LEAGUE_ROUTE}${leagueId}`).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    // Starts a league by its id.
    startLeague(leagueId: BigInteger): Promise<void> {
        // Method returns void, so no empty return type needed
        return {} as Promise<void>;
    }

    // Retrieve all matches in a given league.
    getAllMatchesLeague(leagueId: BigInteger): Promise<MatchResponseDTO[]> {
        return this.generalEnRouteGetter<MatchResponseDTO[]>(`${this.GET_MATCHES_LEAGUE_ROUTE}${leagueId}/match`, (_ => { }));
    }

    // Retrieve all messages for a specific match.
    getAllMessagesMatch(matchId: BigInteger): Promise<MessageResponseDTO[]> {
        return {} as Promise<MessageResponseDTO[]>;
    }

    private generalEnRouteGetter<T>(route: string, errorHandler: (error: Error) => void): Promise<T> {
        return axios.get<T>(`${this.DOMAIN}${route}`).then(response => {
            return response.data;
        })
            .catch(error => {
                errorHandler(error);

                throw error;
            });

    }

    private generalPost<T>(route: string, paramStructure: any, errorHandler: (error: Error) => void): Promise<T> {
        return axios.post<T>(`${this.DOMAIN}${route}`, paramStructure)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                errorHandler(error);

                throw error;

            });
    }



}