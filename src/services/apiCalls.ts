import {deleteData, getData, postData} from "./api.ts";

export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const getLeague = async (leagueId: number, data: Object) => await getData(`/league/${leagueId}`, data);

export const deleteLeague = async (leagueId: number, data: Object) => await deleteData(`/league/${leagueId}`, data);
