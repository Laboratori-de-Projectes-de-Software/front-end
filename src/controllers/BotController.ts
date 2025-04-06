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
    console.log("Datos del formulario:", formData);

    // Adaptar los nombres de campos según la API
    const botData = {
      name: formData.name,
      descripcion: formData.description || "",
      urlImagen: formData.imageUrl || "",
      endpoint: "default", // Valor por defecto para el endpoint
    };

    console.log("Datos enviados a la API:", botData);

    const newBot = await createBot(botData);

    console.log("Bot creado con éxito:", newBot);
    navigate("/Dashboard"); // Redirigir al dashboard después de crear el bot
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
