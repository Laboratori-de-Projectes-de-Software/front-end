import { getLeaguesByUser, createLeague, updateLeaguebyId, fetchLeagueByIdModel, getMatchesByLeagueId, getStandingsByLeagueId, startLeagueById } from "../models/LeaguesModel";
import { jwtDecode } from "jwt-decode";
import { isValidToken } from "../api/AuthUtils";

/**
 * Obtiene las ligas asociadas al usuario actual y actualiza la UI
 * @param setLeagues Función para establecer las ligas en el componente
 * @param setError Función opcional para manejar errores
 */
export const fetchUserLeagues = async (
    setLeagues: (leagues: any[]) => void,
    setError?: (error: string) => void
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    let decodedToken: any;
    try {
      decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
    } catch (error) {
      throw new Error("Invalid token format");
    }

    const userId = decodedToken?.sub;
    if (!userId) throw new Error("User ID not found in token");

    const leagues = await getLeaguesByUser(userId);
    setLeagues(leagues);
  } catch (error) {
    console.error("Error fetching user leagues:", error);
    if (setError) {
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  }
};

/**
 * Crea una nueva liga con los datos proporcionados
 * @param leagueData Datos de la liga a crear
 * @param onSuccess Función que se ejecuta tras crear la liga correctamente
 * @param onError Función opcional para manejar errores
 * @param navigate Función opcional para redireccionar al login si el token expiró
 */
export const createNewLeague = async (
  leagueData: {
    name: string;
    imageUrl?: string;
    rounds: number;
    matchTime: number;
  },
  onSuccess: (createdLeague: any) => void,
  onError?: (error: string) => void,
  navigate?: (path: string) => void
) => {
  try {
    // Verificar token antes de hacer la petición
    if (!isValidToken() && navigate) {
      navigate("/login");
      return;
    }
    console.log("CREATE LEAGUE: Datos de la liga:", leagueData);
    const createdLeague = await createLeague(leagueData);
    console.log("CREATE LEAGUE: Liga creada:", createdLeague);
    onSuccess(createdLeague);
  } catch (error) {
    console.error("Error creating league:", error);

    // Si el error es de autenticación, redirigir al login
    if (
      error instanceof Error &&
      (error.message.includes("Sesión expirada") ||
        error.message.includes("No hay token válido")) &&
      navigate
    ) {
      navigate("/login");
      return;
    }

    if (onError) {
      onError(error instanceof Error ? error.message : "Unknown error");
    }
  }
};

export const updateLeague = async (
    leagueId: number,
    leagueData: {
      name: string;
      imageUrl?: string;
      rounds: number;
      matchTime: number;
    },
    onSuccess: (updatedLeague: any) => void,
    onError?: (error: string) => void
) => {
  try {
    const updatedLeague = await updateLeaguebyId(leagueId, leagueData);
    onSuccess(updatedLeague);
  } catch (error) {
    console.error("Error updating league:", error);
    if (onError) {
      onError(error instanceof Error ? error.message : "Unknown error");
    }
  }
};

/**
 * Fetches league data by ID
 * @param leagueId ID of the league
 * @returns League data
 * @throws Error if the request fails
 */
export const fetchLeagueById = async (leagueId: number) => {
  if (!leagueId) {
    throw new Error("League ID is required.");
  }

  try {
    return await fetchLeagueByIdModel(leagueId);
  } catch (error) {
    console.error("Error fetching league data:", error);
    throw error;
  }
};

// Fetch matches grouped by rounds for a specific league
export const fetchMatchesByLeague = async (leagueId: number) => {
  try {
    const matches = await getMatchesByLeagueId(leagueId);
    return matches;
  } catch (error) {
    console.error("Error fetching matches by league:", error);
    throw error;
  }
};

// Fetch standings for a specific league
export const fetchStandingsByLeague = async (leagueId: number) => {
  try {
    const standings = await getStandingsByLeagueId(leagueId);
    return standings;
  } catch (error) {
    console.error("Error fetching standings by league:", error);
    throw error;
  }
};

export const fetchLeagueStart = async (leagueId: number) => {
  try {
    const response = await startLeagueById(leagueId);
    return response;
  } catch (error) {
    console.error("Error starting league:", error);
    throw error;
  }
};
