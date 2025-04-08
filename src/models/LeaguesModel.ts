import { getAuthToken } from "../api/AuthUtils";

export const getLeaguesByUser = async (userId: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No hay token válido");

  const response = await fetch(
    `http://localhost:8080/api/v0/league?owner=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      localStorage.removeItem("token"); // Eliminar token inválido
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }
    throw new Error(errorText);
  }

  return response.json();
};

// Función para crear una nueva liga
export const createLeague = async (leagueData: {
  name: string;
  urlImagen?: string;
  rounds: number;
  matchTime: number;
  bots: number[];
}) => {
  const token = getAuthToken();
  if (!token) throw new Error("No hay token válido");

  const response = await fetch(`http://localhost:8080/api/v0/league`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(leagueData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      localStorage.removeItem("token"); // Eliminar token inválido
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }
    throw new Error(errorText);
  }

  return response.json();
};
