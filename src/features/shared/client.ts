import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateBotDTO } from "../../interfaces/bot.interface";
import type {
  BotDTO,
} from "../../interfaces/bot.interface";
import type { CreateLeagueDTO } from "../../interfaces/league.interface";
import type { LeagueDTO } from "../../interfaces/league.interface";
import type { ParticipationDTO } from "../../interfaces/participation.interface";
import type {
  UserLoginDTO,
  UserRegisterDTO,
} from "../../interfaces/user.interface";
import type { AuthenticatedUserDTO } from "../../interfaces/user.interface";
import { MatchDTO } from "@interfaces/match.interface";
import { MessageDTO } from "@interfaces/message.interface";
import { ClientResponse } from "@interfaces/client.interface";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    /*/ --- auth --- /*/
    postAuthRegister: builder.mutation<
      ClientResponse<undefined>,
      UserRegisterDTO
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    postAuthLogin: builder.mutation<
      ClientResponse<AuthenticatedUserDTO>,
      UserLoginDTO
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    /*/ --- bot --- /*/
    postBot: builder.mutation<ClientResponse<BotDTO>, CreateBotDTO>({
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
      ClientResponse<BotDTO[]>,
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

    getBotBotId: builder.query<ClientResponse<BotDTO>, number>({
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
      ClientResponse<BotDTO>,
      { id: number; bot: CreateBotDTO }
    >({
      query: (data) => ({
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/bot/${data.id}`,
        method: "PUT",
        body: data.bot,
      }),
    }),

    /*/ --- league --- /*/
    postLeague: builder.mutation<ClientResponse<LeagueDTO>, CreateLeagueDTO>({
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
    getLeague: builder.query<ClientResponse<LeagueDTO[]>, number>({
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

    getLeagueLeagueId: builder.query<ClientResponse<LeagueDTO>, number>(
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
      ClientResponse<LeagueDTO>,
      { id: number; league: CreateLeagueDTO }
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
      ClientResponse<ParticipationDTO[]>,
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
      ClientResponse<MatchDTO[]>,
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
      ClientResponse<MessageDTO[]>,
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
