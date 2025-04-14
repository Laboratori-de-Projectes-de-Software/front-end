import {useEffect, useState} from "react";
import {BotDetail} from "../types/BotDetail.tsx";
import {listarBots, listarTodosBots, obtenerBot} from "../services/apiCalls.ts";

export const useFetchListarBots = () => {
    const [botList, setBotList] = useState<Array<BotDetail> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchListarBots = async () => {
            try {

                const userId = localStorage.getItem("userId");

                const response = await listarBots({params: {owner: userId}});
                if (response.status != 200) {
                    throw new Error("Error al obtener el bot");
                }

                const data = await response.data;

                console.log(data);
                setBotList(data);


            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchListarBots();
    }, []);

    return {botList, loading, error};
};

export const useFetchObtenerBot = (id: number | undefined) => {
    const [bot, setBot] = useState<BotDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchObtenerBot = async () => {
            try {


                const response = await obtenerBot(id);
                if (response.status != 200) {
                    throw new Error("Error al obtener el bot");
                }

                const data = await response.data;

                console.log(data);
                setBot(data);


            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchObtenerBot();
    }, []);

    return {bot, loading, error};
};

export const useFetchTodosLosBots = () => {
    const [botList, setBotList] = useState<Array<BotDetail> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await listarTodosBots({});
                setBotList(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { botList, loading, error };
};