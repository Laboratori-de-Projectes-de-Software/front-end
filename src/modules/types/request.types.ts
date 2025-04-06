export type UserDTORegister = {
  user: string;
  mail: string;
  password: string;
}

export type UserDTOLogin = {
  mail: string;
  password: string;
}

export type BotDTO = {
  name: string;
  description: string;
  urlImagen: string;
  endpoint: string;
}

export type LeagueDTO = {
  name: string;
  urlImagen: string;
  rounds: number;
  matchTime: number;
  bots: number[];
}