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
  async createUser(user: UserDTORegister): Promise<void> {
    try {
      await axios.post('/api/users/register', user);
    } catch (error) {
      console.error('Error in createUser:', error);
    }
  }

  // Login a user and return the user response data.
  async loginUser(user: UserDTOLogin): Promise<UserResponseDTO> {
    try {
      const response = await axios.post('/api/users/login', user);
      return response.data as UserResponseDTO;
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  }

  // Post a new bot and return its response data.
  async postBot(bot: BotDTO): Promise<BotResponseDTO> {
    try {
      const response = await axios.post('/api/bots', bot);
      return response.data as BotResponseDTO;
    } catch (error) {
      console.error('Error in postBot:', error);
      throw error;
    }
  }

  // Retrieve all bot summaries associated with a given user.
  async getAllBotsUser(userId: BigInteger): Promise<BotSummaryResponseDTO[]> {
    try {
      const response = await axios.get(`/api/users/${userId}/bots`);
      return response.data as BotSummaryResponseDTO[];
    } catch (error) {
      console.error('Error in getAllBotsUser:', error);
      throw error;
    }
  }

  // Retrieve a single bot (the interface takes userId as a parameter here as a placeholder).
  async getBot(userId: BigInteger): Promise<BotResponseDTO> {
    try {
      const response = await axios.get(`/api/users/${userId}/bot`);
      return response.data as BotResponseDTO;
    } catch (error) {
      console.error('Error in getBot:', error);
      throw error;
    }
  }

  // Update a bot. (Note: Since BotDTO doesn’t have an id in its structure, we use a placeholder endpoint.)
  async updateBot(bot: BotDTO): Promise<BotResponseDTO> {
    try {
      const response = await axios.put('/api/bots/update', bot);
      return response.data as BotResponseDTO;
    } catch (error) {
      console.error('Error in updateBot:', error);
      throw error;
    }
  }

  // Create a new league.
  async postLeague(league: LeagueDTO): Promise<LeagueResponseDTO> {
    try {
      const response = await axios.post('/api/leagues', league);
      return response.data as LeagueResponseDTO;
    } catch (error) {
      console.error('Error in postLeague:', error);
      throw error;
    }
  }

  // Retrieve all leagues associated with a specific user.
  async getAllLeaguesUser(userId: BigInteger): Promise<LeagueResponseDTO[]> {
    try {
      const response = await axios.get(`/api/users/${userId}/leagues`);
      return response.data as LeagueResponseDTO[];
    } catch (error) {
      console.error('Error in getAllLeaguesUser:', error);
      throw error;
    }
  }

  // Retrieve a specific league by its id.
  async getLeague(leagueId: BigInteger): Promise<LeagueResponseDTO> {
    try {
      const response = await axios.get(`/api/leagues/${leagueId}`);
      return response.data as LeagueResponseDTO;
    } catch (error) {
      console.error('Error in getLeague:', error);
      throw error;
    }
  }

  // Update an existing league.
  async updateLeague(league: LeagueDTO): Promise<LeagueResponseDTO> {
    try {
      const response = await axios.put('/api/leagues/update', league);
      return response.data as LeagueResponseDTO;
    } catch (error) {
      console.error('Error in updateLeague:', error);
      throw error;
    }
  }

  // Registers a bot to a league.
  async registerBotToLeague(botId: BigInteger): Promise<void> {
    try {
      await axios.post(`/api/leagues/registerBot/${botId}`);
    } catch (error) {
      console.error('Error in registerBotToLeague:', error);
    }
  }

  // Retrieves league class standings or participation info.
  async getClassLeague(): Promise<ParticipationResponseDTO[]> {
    try {
      const response = await axios.get('/api/leagues/class');
      return response.data as ParticipationResponseDTO[];
    } catch (error) {
      console.error('Error in getClassLeague:', error);
      throw error;
    }
  }

  // Deletes a league and returns the deleted league data.
  async deleteLeague(leagueId: BigInteger): Promise<LeagueResponseDTO> {
    try {
      const response = await axios.delete(`/api/leagues/${leagueId}`);
      return response.data as LeagueResponseDTO;
    } catch (error) {
      console.error('Error in deleteLeague:', error);
      throw error;
    }
  }

  // Starts a league by its id.
  async startLeague(leagueId: BigInteger): Promise<void> {
    try {
      await axios.post(`/api/leagues/start/${leagueId}`);
    } catch (error) {
      console.error('Error in startLeague:', error);
    }
  }

  // Retrieve all matches in a given league.
  async getAllMatchesLeague(leagueId: BigInteger): Promise<MatchResponseDTO[]> {
    try {
      const response = await axios.get(`/api/leagues/${leagueId}/matches`);
      return response.data as MatchResponseDTO[];
    } catch (error) {
      console.error('Error in getAllMatchesLeague:', error);
      throw error;
    }
  }

  // Retrieve all messages for a specific match.
  async getAllMessagesMatch(matchId: BigInteger): Promise<MessageResponseDTO[]> {
    try {
      const response = await axios.get(`/api/matches/${matchId}/messages`);
      return response.data as MessageResponseDTO[];
    } catch (error) {
      console.error('Error in getAllMessagesMatch:', error);
      throw error;
    }
  }
}
