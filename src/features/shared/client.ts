import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BotDTO } from "../../interfaces/bot.interface";
import type {
  BotResponseDTO,
  BotSumaryResponseDTO,
} from "../../interfaces/bot.interface";
import type { LeagueDTO } from "../../interfaces/league.interface";
import type { LeagueResponseDTO } from "../../interfaces/league.interface";
import type { ParticipationResponseDTO } from "../../interfaces/participation.interface";
import type {
  UserDTOLogin,
  UserDTORegister,
} from "../../interfaces/user.interface";
import type { UserResponseDTO } from "../../interfaces/user.interface";
import { MatchResponseDTO } from "@interfaces/match.interface";
import { MessageResponseDTO } from "@interfaces/message.interface";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    /*/ --- auth --- /*/
    postAuthRegister: builder.mutation<undefined, UserDTORegister>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    postAuthLogin: builder.mutation<UserResponseDTO, UserDTOLogin>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    /*/ --- bot --- /*/
    postBot: builder.mutation<BotResponseDTO, BotDTO>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot`,
        method: "POST",
        body: data,
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    getBot: builder.query<BotSumaryResponseDTO[], number | undefined>({
      query: (owner?: number) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot${
          owner ? `?owner=${owner}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),
    getBotBotId: builder.query<BotResponseDTO, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${id}`,
        method: "GET",
      }),
    }),
    putBotBotId: builder.mutation<BotResponseDTO, { id: number; bot: BotDTO }>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${data.id}`,
        method: "PUT",
        body: data.bot,
      }),
    }),
    /*/ --- league --- /*/
    postLeague: builder.mutation<LeagueResponseDTO, LeagueDTO>({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league`,
        method: "POST",
        body: data,
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),
    getLeague: builder.query<LeagueResponseDTO, number>({
      query: (owner) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league${
          owner ? `?owner=${owner}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),
    getLeagueLeagueId: builder.query<LeagueResponseDTO, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),
    putLeagueLeagueId: builder.mutation<
      LeagueResponseDTO,
      { id: number; league: LeagueDTO }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data.id}`,
        method: "PUT",
        body: data.league,
      }),
    }),
    postLeagueLeagueIdBot: builder.mutation<
      undefined,
      { leagueId: number; botId: number }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${
          data.leagueId
        }/bot`,
        method: "POST",
        body: data.botId,
      }),
    }),
    getLeagueLeagueIdLeaderboard: builder.query<
      ParticipationResponseDTO[],
      number
    >({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/leaderboard`,
        method: "GET",
      }),
    }),
    deleteLeagueLeagueId: builder.mutation<undefined, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}`,
        method: "DELETE",
      }),
    }),
    postLeagueLeagueIdStart: builder.mutation<undefined, number>({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/start`,
        method: "POST",
      }),
    }),
    getLeagueLeagueIdMatch: builder.query<MatchResponseDTO[], number>({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/match`,
        method: "GET",
      }),
    }),
    /*/ --- match --- /*/
    getMatchMatchIdMessage: builder.query<MessageResponseDTO[], number>({
      query: (matchId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/match/${matchId}/message`,
        method: "GET",
      }),
    }),
  }),
});
