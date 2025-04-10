import {postData,getData} from "./api.ts";


export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);
export const listarBots = async (data: Object) => await getData("/bot", data);
export const obtenerBot = async (data: number) => await getData(`/bot/${data}`, {});