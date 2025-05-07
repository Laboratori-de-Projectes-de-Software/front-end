import axios from "axios";

const API_URL = "/api"; // Gracias al proxy, se conecta al backend sin problemas de CORS.

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
