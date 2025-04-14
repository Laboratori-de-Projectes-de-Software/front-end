import {
  createBot,
  getUserBots,
  getBotById,
  updateBot,
  addBotsToLeagueModel,
  Bot,
} from "../models/BotModel";
import { jwtDecode } from "jwt-decode";

/**
 * Maneja la creación de un nuevo bot
 * @param formData Datos del formulario de creación de bot
 * @param navigate Función para navegar a otra ruta
 * @param setError Función para establecer mensajes de error
 * @param setIsSubmitting Función para actualizar el estado de envío del formulario
 */
export const handleCreateBot = async (
  formData: {
    name: string;
    description: string;
    imageUrl: string;
  },
  navigate: (path: string) => void,
  setError: (error: string) => void,
  setIsSubmitting: (isSubmitting: boolean) => void
) => {
  if (!formData.name.trim()) {
    setError("El nombre del bot es obligatorio");
    return;
  }

  setIsSubmitting(true);
  setError("");

  try {
    console.log("Datos del formulario:", formData);

    const botData = {
      name: formData.name,
      descripcion: formData.description || "",
      urlImagen: formData.imageUrl || "",
      endpoint: "default",
    };

    console.log("Datos enviados a la API:", botData);

    const newBot = await createBot(botData);

    console.log("Bot creado con éxito:", newBot);
    navigate("/Dashboard");
  } catch (err) {
    console.error("Error al crear bot:", err);

    if (err instanceof Error && err.message.includes("sesión")) {
      // Redirigir al login si el token ha expirado
      alert("Tu sesión ha expirado. Serás redirigido al inicio de sesión.");
      navigate("/login");
    } else {
      setError(
        err instanceof Error
          ? err.message
          : "Error al crear el bot. Inténtalo de nuevo más tarde."
      );
    }
  } finally {
    setIsSubmitting(false);
  }
};

/**
 * Obtiene todos los bots del usuario actual
 * @param setBots Función para establecer los bots en el componente
 * @param setError Función opcional para manejar errores
 */
export const fetchUserBots = async (
  setBots: (bots: Bot[]) => void,
  setError?: (error: string) => void
) => {
  try {
    const bots = await getUserBots();
    setBots(bots);
  } catch (error) {
    console.error("Error al obtener los bots del usuario:", error);
    if (setError) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  }
};
/**
 * Añade bots a una liga
 * @param leagueId ID de la liga
 * @param botIds IDs de los bots a inscribir
 * @throws Error si ocurre algún problema durante la inscripción
 */
export const addBotsToLeague = async (leagueId: number, botIds: number[]) => {
  if (!leagueId || botIds.length === 0) {
    throw new Error("La liga y los bots son obligatorios.");
  }

  try {
    await addBotsToLeagueModel(leagueId, botIds);
    console.log("Bots inscritos con éxito en la liga:", leagueId);
  } catch (error) {
    console.error("Error al inscribir bots en la liga:", error);
    throw error;
  }
};

/// Función para obtener un bot por su ID
export const fetchBotById = async (botId: number) => {
  try {
    const bot = await getBotById(botId);
    return bot;
  } catch (error) {
    console.error("Error al obtener el bot:", error);
    throw error;
  }
};
