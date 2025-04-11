import {deleteData, getData, postData} from "./api.ts";

export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const getLeague = async (leagueId: number, data: Object) => await getData(`/league/${leagueId}`, data);

export const deleteLeague = async (leagueId: number, data: Object) => await deleteData(`/league/${leagueId}`, data);

export const listarBots = async (data: Object) => await getData("/bot", data);
export const obtenerBot = async (data: number) => await getData(`/bot/${data}`, {});

export const getEnfrentamiento = async (matchId: number) => await getData(`/match/${matchId}`, {});