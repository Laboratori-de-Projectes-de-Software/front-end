import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BotDTO } from "../../interfaces/bot.interface";
import type {
  BotResponseDTO,
  BotSummaryResponseDTO,
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
import { ClientResponse } from "@interfaces/client.interface";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    /*/ --- auth --- /*/
    postAuthRegister: builder.mutation<
      ClientResponse<undefined>,
      UserDTORegister
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    postAuthLogin: builder.mutation<
      ClientResponse<UserResponseDTO>,
      UserDTOLogin
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    /*/ --- bot --- /*/
    postBot: builder.mutation<ClientResponse<BotResponseDTO>, BotDTO>({
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

    getBot: builder.query<
      ClientResponse<BotSummaryResponseDTO[]>,
      number | undefined
    >({
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

    getBotBotId: builder.query<ClientResponse<BotResponseDTO>, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${id}`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    putBotBotId: builder.mutation<
      ClientResponse<BotResponseDTO>,
      { id: number; bot: BotDTO }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${data.id}`,
        method: "PUT",
        body: data.bot,
      }),
    }),

    /*/ --- league --- /*/
    postLeague: builder.mutation<ClientResponse<LeagueResponseDTO>, LeagueDTO>({
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
    getLeague: builder.query<ClientResponse<LeagueResponseDTO[]>, number>({
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

    getLeagueLeagueId: builder.query<ClientResponse<LeagueResponseDTO>, number>(
      {
        query: (id) => ({
          url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${id}`,
          method: "GET",
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
          },
        }),
      }
    ),

    putLeagueLeagueId: builder.mutation<
      ClientResponse<LeagueResponseDTO>,
      { id: number; league: LeagueDTO }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${data.id}`,
        method: "PUT",
        body: data.league,
      }),
    }),

    postLeagueLeagueIdBot: builder.mutation<
      ClientResponse<undefined>,
      { leagueId: number; botId: number }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${
          data.leagueId
        }/bot`,
        method: "POST",
        body: JSON.stringify(data.botId),
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
          "Content-Type": "application/json",
        },
      }),
    }),

    getLeagueLeagueIdLeaderboard: builder.query<
      ClientResponse<ParticipationResponseDTO[]>,
      number
    >({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/leaderboard`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    deleteLeagueLeagueId: builder.mutation<ClientResponse<undefined>, number>({
      query: (leagueId) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/league/${leagueId}`,
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    postLeagueLeagueIdStart: builder.mutation<
      ClientResponse<undefined>,
      number
    >({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/start`,
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    getLeagueLeagueIdMatch: builder.query<
      ClientResponse<MatchResponseDTO[]>,
      number
    >({
      query: (leagueId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/league/${leagueId}/match`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    /*/ --- match --- /*/
    getMatchMatchIdMessage: builder.query<
      ClientResponse<MessageResponseDTO[]>,
      number
    >({
      query: (matchId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/match/${matchId}/message`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),

    postMatchMatchIdStart: builder.mutation<
      ClientResponse<undefined>,
      number
    >({
      query: (matchId) => ({
        url: `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/match/${matchId}/start`,
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") ?? "{}").body.token,
        },
      }),
    }),
  }),
});
