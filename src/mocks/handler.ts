import { ClientResponse } from "@interfaces/client.interface";
import { LeagueResponseDTO } from "@interfaces/league.interface";
import { MatchResponseDTO } from "@interfaces/match.interface";
import { ParticipationResponseDTO } from "@interfaces/participation.interface";
import { UserResponseDTO } from "@interfaces/user.interface";
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
    return HttpResponse.json<ClientResponse<UserResponseDTO>>(
      {
        code: "200",
        message: "User logged in successfully",
        body: {
          token: "mocked_token",
          userId: 1,
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
            cualidad: "Cualidad 1",
          },
          {
            nombre: "Bot 2",
            id: 2,
            cualidad: "Cualidad 2",
          },
        ]
      },
      { status: 200 }
    );
  }),

  /*/ --- league --- /*/
  http.post(`${basePath}/league`, () => {
    return HttpResponse.json<ClientResponse<LeagueResponseDTO>>(
      {
        code: "201",
        message: "League created successfully",
        body: {
          leagueId: 1,
          name: "Copa Melón",
          urlImagen: "",
          user: 2,
          rounds: 3,
          matchTime: 10,
          state: "PENDING",
          bots: [],
        }
      },
      { status: 201 }
    );
  }),

  http.get(`${basePath}/league`, () => {
    return HttpResponse.json<ClientResponse<LeagueResponseDTO[]>>(
      {
        code: "200",
        message: "Leagues retrieved successfully",
        body: [
          {
            leagueId: 1,
            name: "Copa Melón",
            urlImagen: "",
            user: 2,
            rounds: 3,
            matchTime: 10,
            state: "PENDING",
            bots: [],
          },
          {
            leagueId: 2,
            name: "Copa Plátano",
            urlImagen: "",
            user: 2,
            rounds: 5,
            matchTime: 20,
            state: "en curso",
            bots: [],
          },
        ]
      },
      { status: 200 }
    );
  }),
  http.get(`${basePath}/league/1`, () => {
    return HttpResponse.json<ClientResponse<LeagueResponseDTO>>(
      {  
        code: "200",
        message: "League retrieved successfully",
        body: {
          leagueId: 1,
          name: "Copa Melón",
          urlImagen: "https://static.vecteezy.com/system/resources/previews/002/703/018/non_2x/soccer-ball-sport-cartoon-in-black-and-white-free-vector.jpg",
          user: 2,
          rounds: 3,
          matchTime: 10,
          state: "PENDING",
          bots: [],
        }
      },
      { status: 200 }
    );
  }),

  http.put(`${basePath}/league/1`, () => {
    return HttpResponse.json<ClientResponse<LeagueResponseDTO>>(
      {
        code: "200",
        message: "League updated successfully",
        body: {
          leagueId: 1,
          name: "Copa Melón",
          urlImagen: "",
          user: 2,
          rounds: 3,
          matchTime: 10,
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
    return HttpResponse.json<ClientResponse<ParticipationResponseDTO[]>>(
      {  
        code: "200",
        message: "Leaderboard retrieved successfully",
        body: [
          {
            botId: 1,
            points: 10,
            name: "Bot 1",
            position: 1,
          },
          {
            botId: 2,
            points: 5,
            name: "Bot 2",
            position: 2,
          },
          {
            botId: 3,
            points: 0,
            name: "Bot 3",
            position: 3,
          },
          {
            botId: 4,
            points: 0,
            name: "Bot 4",
            position: 4,
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
    return HttpResponse.json<ClientResponse<MatchResponseDTO[]>>(
      {
        code: "200",
        message: "Matches retrieved successfully",
        body: [
          {
            matchId: 1,
            fighters: ["Bot 1", "Bot 2"],
            roundNumber: 1,
            state: "finalizado",
            result: 1
          },
          {
            matchId: 2,
            fighters: ["Bot 3", "Bot 4"],
            roundNumber: 1,
            state: "en curso",
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
