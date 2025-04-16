
import {deleteData, getData, postData, putData} from "./api.ts";
import axios from "axios";
import {API} from "../config.tsx";

export const registerUser = async (data: Object) => await postData("/auth/register", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const home = async (data: Object) => await getData("/league/all", data);

export const getLeague = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}`, data);

export const deleteLeague = async (leagueId: string | undefined, data: Object) => await deleteData(`/league/${leagueId}`, data);

export const listarBots = async (data: Object) => await getData("/bot", data);

export const obtenerBot = async (data: number | undefined) => await getData(`/bot/${data}`, {});

export const getEnfrentamiento = async (matchId: number) => await getData(`/match/${matchId}`, {});
export const deleteBot = async (botId: string | undefined, data: Object) => await deleteData(`/bot/${botId}`, data);


export const registerBotToLeague = async (leagueId: number | string, botId: number) =>
    axios.post(`${API}/league/${leagueId}/bot`, botId, {
        headers: {
            "Content-Type": "application/json",
        },
    });


export const createBot = async (data: Object) => await putData(`/bot`, data);

export const updateLeague = async (leagueId: string, data: Object) => await putData(`/league/${leagueId}`, data);

export const updateBot = async (botId: string, data: Object) => await putData(`/bot/${botId}`, data);

export const getLeagueOwnerById = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}/owner`, data);

export const getBotById = async (botId: string | undefined, data: Object) => await getData(`/bot/${botId}/byid`, data);

export const listarTodosBots = async (data: Object) => await getData("/bot/all", data);

export const iniciarLiga = async (leagueId: string | undefined, data: Object) => await postData(`/league/${leagueId}/start`, data);

export const getConversacion = async (matchId: number) => await getData(`/match/${matchId}/message`, {});
export const getMatchesByLeague = async (leagueId: string | undefined, data: Object) => await getData(`/league/${leagueId}/match`, data);

export const getLeaguesByUserId = async (data: Object) => await getData(`/league`, data);

export const createLiga = async (data: Object) => await putData(`/league`, data);
