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
      { message: "User registered successfully" },
      { status: 201 }
    );
  }),

  http.post(`${basePath}/auth/login`, () => {
    return HttpResponse.json<UserResponseDTO>(
      {
        token: "mocked_token",
        userId: 1,
        expiresIn: DateTime.now().plus({ hours: 1 }).toString(),
        user: "mocked_user",
      },
      { status: 200 }
    );
  }),

  /*/ --- bot --- /*/
  // TODO: Completar mocks de llamadas al bot

  /*/ --- league --- /*/
  http.post(`${basePath}/league`, () => {
    return HttpResponse.json<LeagueResponseDTO>(
      {
        leagueId: 1,
        name: "Copa Melón",
        urlImagen: "",
        user: 2,
        rounds: 3,
        matchTime: 10,
        state: "pendiente",
        bots: [],
      },
      { status: 201 }
    );
  }),
  http.get(`${basePath}/league`, () => {
    return HttpResponse.json<LeagueResponseDTO[]>(
      [
        {
          leagueId: 1,
          name: "Copa Melón",
          urlImagen: "",
          user: 2,
          rounds: 3,
          matchTime: 10,
          state: "pendiente",
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
      ],
      { status: 200 }
    );
  }),
  http.get(`${basePath}/league/1`, () => {
    return HttpResponse.json<LeagueResponseDTO[]>(
      [
        {
          leagueId: 1,
          name: "Copa Melón",
          urlImagen: "",
          user: 2,
          rounds: 3,
          matchTime: 10,
          state: "pendiente",
          bots: [],
        }
      ],
      { status: 200 }
    );
  }),
  http.put(`${basePath}/league/1`, () => {
    return HttpResponse.json<LeagueResponseDTO>(
      {
        leagueId: 1,
        name: "Copa Melón",
        urlImagen: "",
        user: 2,
        rounds: 3,
        matchTime: 10,
        state: "pendiente",
        bots: [],
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
    return HttpResponse.json<ParticipationResponseDTO[]>(
      [
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
        }
      ],
      { status: 200 }
    );
  }),
  http.delete(`${basePath}/league/1`, () => {
    return HttpResponse.json(
      { message: "League deleted successfully" },
      { status: 200 }
    );
  }),
  http.post(`${basePath}/league/1/start`, () => {
    return HttpResponse.json(
      { message: "League started successfully" },
      { status: 200 }
    );
  }),
  http.get(`${basePath}/league/1/match`, () => {
    return HttpResponse.json<MatchResponseDTO[]>(
      [
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
      ],
      { status: 200 }
    );
  }),

  /*/ --- match --- /*/
  // TODO: Completar mocks de llamadas al match
];
