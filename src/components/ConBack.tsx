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
    // Create a new user.
    createUser(user: UserDTORegister): void {
        // Method returns void, so no empty return type needed
    }

    // Login a user and return the user response data.
    loginUser(user: UserDTOLogin): UserResponseDTO {
        return {} as UserResponseDTO;
    }

    // Post a new bot and return its response data.
    postBot(bot: BotDTO): BotResponseDTO {
        return {} as BotResponseDTO;
    }

    // Retrieve all bot summaries associated with a given user.
    getAllBotsUser(userId: BigInteger): BotSummaryResponseDTO[] {
        return [] as BotSummaryResponseDTO[];
    }

    // Retrieve a single bot (the interface takes userId as a parameter here as a placeholder).
    getBot(userId: BigInteger): BotResponseDTO {
        return {} as BotResponseDTO;
    }

    // Update a bot. (Note: Since BotDTO doesn't have an id in its structure, we use a placeholder endpoint.)
    updateBot(bot: BotDTO): BotResponseDTO {
        return {} as BotResponseDTO;
    }

    // Create a new league.
    postLeague(league: LeagueDTO): LeagueResponseDTO {
        return {} as LeagueResponseDTO;
    }

    // Retrieve all leagues associated with a specific user.
    getAllLeaguesUser(userId: BigInteger): LeagueResponseDTO[] {
        return [] as LeagueResponseDTO[];
    }

    // Retrieve a specific league by its id.
    getLeague(leagueId: BigInteger): LeagueResponseDTO {
        return {} as LeagueResponseDTO;
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
}