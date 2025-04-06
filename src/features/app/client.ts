import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BotDTO, BotResponseDTO, BotSumaryResponseDTO, LeagueDTO, LeagueResponseDTO, ParticipationResponseDTO, UserDTOLogin, UserDTORegister, UserResponseDTO } from 'src/modules/types';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    /*/ --- auth --- /*/
    postAuthRegister: builder.mutation<undefined, UserDTORegister>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
    postAuthLogin: builder.mutation<UserResponseDTO, UserDTOLogin>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    /*/ --- bot --- /*/
    postBot: builder.mutation<BotResponseDTO, BotDTO>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot`,
        method: 'POST',
        body: data,
      }),
    }),

    getBot: builder.query<BotSumaryResponseDTO[], number | undefined>({
      query: (owner?: number) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot${owner ? `?owner=${owner}` : ''}`,
        method: 'GET',
      }),
    }),
    getBotBotId: builder.query<BotResponseDTO, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${id}`,
        method: 'GET',
      }),
    }),
    putBotBotId: builder.mutation<BotResponseDTO, {id: number, bot: BotDTO}>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${data.id}`,
        method: 'PUT',
        body: data.bot,
      }),
    }),
    /*/ --- league --- /*/
    postLeague: builder.mutation<LeagueResponseDTO, LeagueDTO>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league`,
        method: 'POST',
        body: data,
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getLeague: builder.query<LeagueResponseDTO, number>({
      query: (owner) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league${owner ? `?owner=${owner}` : ''}`,
        method: 'GET',
      }),
    }),
    getLeagueLeagueId: builder.query<LeagueResponseDTO, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}`,
        method: 'GET',
      }),
    }),
    putLeagueLeagueId: builder.mutation<LeagueResponseDTO, {id: number, league: LeagueDTO}>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data.id}`,
        method: 'PUT',
        body: data.league,
      }),
    }),
    postLeagueLeagueIdBot: builder.mutation<undefined, {leagueId: number, botId: number}>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data.leagueId}/bot`,
        method: 'POST',
        body: data.botId,
      }),
    }),
    getLeagueLeagueIdLeaderboard: builder.query<ParticipationResponseDTO, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}/leaderboard`,
        method: 'GET',
      }),
    }),
    deleteLeagueLeagueId: builder.mutation<undefined, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}`,
        method: 'DELETE',
      }),
    }),
    postLeagueLeagueIdStart: builder.mutation<undefined, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}/start`,
        method: 'POST',
      }),
    }),
    getLeagueLeagueIdMatch: builder.query<undefined, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}/match`,
        method: 'GET',
      }),
    }),
    /*/ --- match --- /*/
    getMatchMatchIdMessage: builder.query<undefined, number>({
      query: (matchId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/match/${matchId}/message`,
        method: 'GET',
      }),
    }),
  }),
});