import { LeagueResponseDTO } from "@interfaces/league.interface";
import { UserResponseDTO } from "@interfaces/user.interface";
import { DateTime } from "luxon";
import { http, HttpResponse } from "msw";

const basePath = `${import.meta.env.VITE_REACT_APP_API_URL}`;

export const handlers = [
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
        expiresIn: DateTime.now().plus({ hours: 1 }),
        user: "mocked_user",
      },
      { status: 200 }
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
          bots: [],
        },
        {
          leagueId: 2,
          name: "Copa Plátano",
          urlImagen: "",
          user: 2,
          rounds: 5,
          matchTime: 20,
          bots: [],
        },
      ],
      { status: 200 }
    );
  }),
];
