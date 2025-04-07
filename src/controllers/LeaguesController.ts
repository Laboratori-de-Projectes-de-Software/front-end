import { getLeaguesByUser } from "../models/LeaguesModel";
import { jwtDecode } from "jwt-decode";

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