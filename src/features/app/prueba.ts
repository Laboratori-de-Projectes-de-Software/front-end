// TODO: Este archivo es solo para pruebas, eliminarlo cuando se haya entendido como funciona el appApi
import { appApi } from "./client";

const aux = appApi.useGetAppSettingsQuery(undefined);

const [mutate, result] = appApi.usePostSomethingMutation(undefined);

mutate(true)

console.log(result.data);

console.log(aux.data);
console.log(aux.isLoading);