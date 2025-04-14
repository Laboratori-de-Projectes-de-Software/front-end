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

export const updateLeaguebyId = async (
    leagueId: number,
    leagueData: {
      name: string;
      urlImagen?: string;
      rounds: number;
      matchTime: number;
    }
): Promise<any> => {
  const token = getAuthToken();
  if (!token) throw new Error("No hay token válido");

  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
    method: "PUT",
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

/**
 * Calls the API to fetch league data by ID
 * @param leagueId ID of the league
 * @returns League data
 * @throws Error if the request fails
 */
export const fetchLeagueByIdModel = async (leagueId: number) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No valid token found.");
  }

  const response = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

// Fetch matches grouped by rounds for a specific league
export const getMatchesByLeagueId = async (leagueId: number) => {
  const token = getAuthToken();
  if (!token) throw new Error("No valid token found.");

  const endpoint = `http://localhost:8080/api/v0/league/${leagueId}/match`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

// Fetch standings for a specific league
export const getStandingsByLeagueId = async (leagueId: number) => {
  const token = getAuthToken();
  if (!token) throw new Error("No valid token found.");

  const endpoint = `http://localhost:8080/api/v0/league/${leagueId}/leaderboard`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const startLeagueById = async (leagueId: number) => {
  const token = getAuthToken();
  if (!token) throw new Error("No valid token found.");

  const endpoint = `http://localhost:8080/api/v0/league/${leagueId}/start`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}: ${response.statusText}`);
  }

  // Handle empty response body
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return null; // Return null if no JSON body is present
};
