import axios from 'axios';
import {API} from "../config.tsx";

const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getData = async (endpoint: string, data: object) => {
    try{
        return await api.get(endpoint, data);
    } catch (error) {
        throw error;
    }
}

export const postData = async (endpoint: string, data: object) => {
    try{
        return await api.post(endpoint, data);
    } catch (error) {
        throw error;
    }
}

export const putData = async (endpoint: string, data: object) => {
    try{
        return await api.put(endpoint, data);
    } catch (error) {
        throw error;
    }
}