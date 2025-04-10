import {postData, getData} from "./api.ts";

export const registerUser = async (data: Object) => await postData("/auth/signup", data);

export const login = async (data: Object) => await postData("/auth/login", data);

export const home = async () => await getData("/league/all");