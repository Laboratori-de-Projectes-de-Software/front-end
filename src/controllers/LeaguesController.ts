import { getLeaguesByUser, createLeague } from "../models/LeaguesModel";
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

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;
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
    urlImagen?: string;
    rounds: number;
    matchTime: number;
    bots: number[];
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

    const createdLeague = await createLeague(leagueData);
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
