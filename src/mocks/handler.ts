import { ClientResponse } from "@interfaces/client.interface";
import { LeagueDTO } from "@interfaces/league.interface";
import { MatchDTO } from "@interfaces/match.interface";
import { ParticipationDTO } from "@interfaces/participation.interface";
import { AuthenticatedUserDTO } from "@interfaces/user.interface";
import { DateTime } from "luxon";
import { http, HttpResponse } from "msw";

const basePath = `${import.meta.env.VITE_REACT_APP_API_URL}`;

export const handlers = [
  /*/ --- auth --- /*/
  http.post(`${basePath}/auth/register`, () => {
    return HttpResponse.json(
      { code: "201", message: "User registered successfully", body: null },
      { status: 201 }
    );
  }),

  http.post(`${basePath}/auth/login`, () => {
    return HttpResponse.json<ClientResponse<AuthenticatedUserDTO>>(
      {
        code: "200",
        message: "User logged in successfully",
        body: {
          token: "mocked_token",
          id: 1,
          expiresIn: DateTime.now().plus({ hours: 1 }).toString(),
          user: "mocked_user",
        }
      },
      { status: 200 }
    );
  }),

  /*/ --- bot --- /*/
  // TODO: Completar mocks de llamadas al bot
  http.get(`${basePath}/bot?owner=1`, () => {
    return HttpResponse.json(
      {
        code: "200",
        message: "Bots retrieved successfully",
        body: [
          {
            nombre: "Bot 1",
            id: 1,
            quality: "Cualidad 1",
            apiUrl: "/",
          },
          {
            nombre: "Bot 2",
            id: 2,
            quality: "Cualidad 2",
            apiUrl: "/",
          },
        ]
      },
      { status: 200 }
    );
  }),

  /*/ --- league --- /*/
  http.post(`${basePath}/league`, () => {
    return HttpResponse.json<ClientResponse<LeagueDTO>>(
      {
        code: "201",
        message: "League created successfully",
        body: {
          id: 1,
          name: "Copa Melón",
          imageUrl: "",
          rounds: 3,
          matchMaxMessages: 10,
          state: "PENDING",
          bots: [],
        }
      },
      { status: 201 }
    );
  }),

  http.get(`${basePath}/league`, () => {
    return HttpResponse.json<ClientResponse<LeagueDTO[]>>(
      {
        code: "200",
        message: "Leagues retrieved successfully",
        body: [
          {
            id: 1,
            name: "Copa Melón",
            imageUrl: "",
            rounds: 3,
            matchMaxMessages: 10,
            state: "PENDING",
            bots: [],
          },
          {
            id: 2,
            name: "Copa Plátano",
            imageUrl: "",
            rounds: 5,
            matchMaxMessages: 20,
            state: "IN_PROGRESS",
            bots: [],
          },
        ]
      },
      { status: 200 }
    );
  }),
  http.get(`${basePath}/league/1`, () => {
    return HttpResponse.json<ClientResponse<LeagueDTO>>(
      {  
        code: "200",
        message: "League retrieved successfully",
        body: {
          id: 1,
          name: "Copa Melón",
          imageUrl: "https://static.vecteezy.com/system/resources/previews/002/703/018/non_2x/soccer-ball-sport-cartoon-in-black-and-white-free-vector.jpg",
          rounds: 3,
          matchMaxMessages: 10,
          state: "PENDING",
          bots: [],
        }
      },
      { status: 200 }
    );
  }),

  http.put(`${basePath}/league/1`, () => {
    return HttpResponse.json<ClientResponse<LeagueDTO>>(
      {
        code: "200",
        message: "League updated successfully",
        body: {
          id: 1,
          name: "Copa Melón",
          imageUrl: "",
          rounds: 3,
          matchMaxMessages: 10,
          state: "PENDING",
          bots: [],
        }
      },
      { status: 200 }
    );
  }),

  // TODO: Completar
  http.post(`${basePath}/league/1/bot`, () => {
    return HttpResponse.json(
      { message: "Bot added to league" },
      { status: 201 }
    );
  }),

  http.get(`${basePath}/league/1/leaderboard`, () => {
    return HttpResponse.json<ClientResponse<ParticipationDTO[]>>(
      {  
        code: "200",
        message: "Leaderboard retrieved successfully",
        body: [
          {
            botId: 1,
            points: 10,
            botName: "Bot 1",
            position: 1,
            nWins: 0,
            nLosses: 0,
            nDraws: 0,
          },
          {
            botId: 2,
            points: 5,
            botName: "Bot 2",
            position: 2,
            nWins: 0,
            nLosses: 0,
            nDraws: 0,
          },
          {
            botId: 3,
            points: 0,
            botName: "Bot 3",
            position: 3,
            nWins: 0,
            nLosses: 0,
            nDraws: 0,
          },
          {
            botId: 4,
            points: 0,
            botName: "Bot 4",
            position: 4,
            nWins: 0,
            nLosses: 0,
            nDraws: 0,
          }
        ]
      },
      { status: 200 }
    );
  }),

  http.delete(`${basePath}/league/1`, () => {
    return HttpResponse.json(
      { code: "200", message: "League deleted successfully", body: null },
      { status: 200 }
    );
  }),

  http.post(`${basePath}/league/1/start`, () => {
    return HttpResponse.json(
      { code: "200", message: "League started successfully", body: null },
      { status: 200 }
    );
  }),

  http.get(`${basePath}/league/1/match`, () => {
    return HttpResponse.json<ClientResponse<MatchDTO[]>>(
      {
        code: "200",
        message: "Matches retrieved successfully",
        body: [
          {
            id: 1,
            fighters: [
              {
                nombre: "Bot 1",
                id: 1,
                quality: "Cualidad 1",
                apiUrl: "/",
              },
              {
                nombre: "Bot 2",
                id: 2,
                quality: "Cualidad 2",
                apiUrl: "/",
              },
            ],
            roundNumber: 1,
            state: "COMPLETED",
            result: 1
          },
          {
            id: 2,
            fighters: [
              {
                nombre: "Bot 3",
                id: 3,
                quality: "Cualidad 3",
                apiUrl: "/",
              },
              {
                nombre: "Bot 4",
                id: 4,
                quality: "Cualidad 4",
                apiUrl: "/",
              },
            ],
            roundNumber: 1,
            state: "IN_PROGRESS",
            result: 0
          },
        ]
      },
      { status: 200 }
    );
  }),

  /*/ --- match --- /*/
  // TODO: Completar mocks de llamadas al match
];
