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

    // TODO: Revisar como hacer lo de los query params
    getBot: builder.query<BotSumaryResponseDTO[], undefined>({
      query: () => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot`,
        method: 'GET',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getBotBotId: builder.query<BotResponseDTO, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${id}`,
        method: 'GET',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    putBotBotId: builder.mutation<BotResponseDTO, BotDTO>({
      query: (data) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${data}`,
        method: 'PUT',
        body: data,
      }),
    }),
    /*/ --- league --- /*/
    postLeague: builder.mutation<undefined, undefined>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league`,
        method: 'POST',
        body: data,
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getLeague: builder.query<LeagueResponseDTO, undefined>({
      query: () => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league`,
        method: 'GET',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getLeagueLeagueId: builder.query<LeagueResponseDTO, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}`,
        method: 'GET',
      }),
    }),
    putLeagueLeagueId: builder.mutation<LeagueResponseDTO, LeagueDTO>({
      query: (data) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data}`,
        method: 'PUT',
        body: data,
      }),
    }),
    postLeagueLeagueIdBot: builder.mutation<undefined, number>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data}`,
        method: 'POST',
        body: data,
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getLeagueLeagueIdLeaderboard: builder.query<ParticipationResponseDTO, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}/leaderboard`,
        method: 'GET',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    deleteLeagueLeagueId: builder.mutation<undefined, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}`,
        method: 'DELETE',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    postLeagueLeagueIdStart: builder.mutation<undefined, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}/start`,
        method: 'POST',
      }),
    }),
    // TODO: Revisar como hacer lo de los query params
    getLeagueLeagueIdMatch: builder.query<undefined, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}/match`,
        method: 'GET',
      }),
    }),
    /*/ --- match --- /*/
    // TODO: Revisar como hacer lo de los query params
    getMatchMatchIdMessage: builder.query<undefined, number>({
      query: (id) => ({ // FIXME: esto no tiene pinta de estar bien
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/match/${id}/message`,
        method: 'GET',
      }),
    }),
  }),
});