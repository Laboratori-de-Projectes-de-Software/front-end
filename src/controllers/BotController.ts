import {
  createBot,
  getUserBots,
  getBotById,
  updateBot,
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
    // Adaptar los nombres de campos según la API
    const newBot = await createBot({
      name: formData.name,
      descripcion: formData.description || "",
      urlImagen: formData.imageUrl || "",
      endpoint: "default", // Valor por defecto para el endpoint
    });

    console.log("Bot creado con éxito:", newBot);
    navigate("/mybots");
  } catch (err) {
    console.error("Error al crear bot:", err);
    setError(
      err instanceof Error
        ? err.message
        : "Error al crear el bot. Inténtalo de nuevo más tarde."
    );
  } finally {
    setIsSubmitting(false);
  }
};

/**
 * Obtiene todos los bots del usuario actual
 * @param setUserBots Función para establecer la lista de bots en el estado
 * @param setIsLoading Función para actualizar el estado de carga
 * @param setError Función para establecer mensajes de error
 */
export const handleGetUserBots = async (
  setUserBots: (bots: any[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string) => void
) => {
  setIsLoading(true);
  setError("");

  try {
    const bots = await getUserBots();
    setUserBots(bots);
  } catch (err) {
    console.error("Error al obtener bots:", err);
    setError(
      err instanceof Error
        ? err.message
        : "Error al cargar los bots. Inténtalo de nuevo más tarde."
    );
  } finally {
    setIsLoading(false);
  }
};

/**
 * Obtiene los detalles de un bot específico
 * @param botId ID del bot a obtener
 * @param setBotDetails Función para establecer los detalles del bot
 * @param setIsLoading Función para actualizar el estado de carga
 * @param setError Función para establecer mensajes de error
 */
export const handleGetBotDetails = async (
  botId: number,
  setBotDetails: (bot: any) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string) => void
) => {
  setIsLoading(true);
  setError("");

  try {
    const bot = await getBotById(botId);
    setBotDetails(bot);
  } catch (err) {
    console.error("Error al obtener detalles del bot:", err);
    setError(
      err instanceof Error
        ? err.message
        : "Error al cargar los detalles del bot. Inténtalo de nuevo más tarde."
    );
  } finally {
    setIsLoading(false);
  }
};
