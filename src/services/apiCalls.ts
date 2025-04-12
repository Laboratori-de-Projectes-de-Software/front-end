
import {deleteData, getData, postData} from "./api.ts";

export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const home = async (data: Object) => await getData("/league/all", data);

export const getLeague = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}`, data);

export const deleteLeague = async (leagueId: string | undefined, data: Object) => await deleteData(`/league/${leagueId}`, data);

export const listarBots = async (data: Object) => await getData("/bot", data);

export const obtenerBot = async (data: number) => await getData(`/bot/${data}`, {});

export const getEnfrentamiento = async (matchId: number) => await getData(`/match/${matchId}`, {});

export const registerBotToLeague = async (leagueId: number | string, botId: number) => {
    return await postData(`/league/${leagueId}/bot`, { botId });
};