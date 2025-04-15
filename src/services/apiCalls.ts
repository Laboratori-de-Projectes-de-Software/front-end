
import {deleteData, getData, postData, putData} from "./api.ts";

export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const home = async (data: Object) => await getData("/league/all", data);

export const getLeague = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}`, data);

export const deleteLeague = async (leagueId: string | undefined, data: Object) => await deleteData(`/league/${leagueId}`, data);

export const listarBots = async (data: Object) => await getData("/bot", data);

export const obtenerBot = async (data: number | undefined) => await getData(`/bot/${data}`, {});

export const getEnfrentamiento = async (matchId: number) => await getData(`/match/${matchId}/message`, {});

export const registerBotToLeague = async (leagueId: number | string, botId: number) =>
     await postData(`/league/${leagueId}/bot`, { botId });


export const updateLeague = async (leagueId: string, data: Object) => await putData(`/league/${leagueId}`, data);

export const getLeagueOwnerById = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}/owner`, data);

export const listarTodosBots = async (data: Object) => await getData("/bot/all", data);

export const iniciarLiga = async (leagueId: string | undefined, data: Object) => await postData(`/league/${leagueId}/start`, data);

export const getMatchesByLeague = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}/match`, data);
