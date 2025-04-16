import { jwtDecode } from "jwt-decode";
import { getUserInfo } from "./UserModel";
import { getAuthToken } from "../api/AuthUtils";

/**
 * Interfaz que define la estructura de un bot según la API
 */
export interface Bot_simple {
  id?: number;
  name: string;
  description?: string; // Nota: descripcion, no description
}

export interface Bot {
  botId: number,
  name: string,
  description: string,
  urlImagen: string,
  nWins: number,
  nLosses: number,
  nDraws: number
}

/**
 * Crea un nuevo bot en el sistema
 * @param botData Datos del bot a crear
 * @returns El bot creado con su ID asignado
 */
export const createBot = async (botData: {
  name: string;
  description: string;
  urlImagen: string;
  endpoint?: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    console.log("Intentando crear bot con datos:", botData);

    const dataToSend = {
      ...botData,
      endpoint: botData.endpoint || "default",
    };

    const response = await fetch("http://localhost:8080/api/v0/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    console.log("Respuesta status:", response.status);

    if (response.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem("token"); // Eliminar el token inválido
      throw new Error(
        "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      throw new Error(
        errorText || `Error ${response.status}: ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Bot creado exitosamente:", result);
    return result;
  } catch (error) {
    console.error("Error completo al crear bot:", error);
    throw error;
  }
};

/**
 * Obtiene todos los bots del usuario actual
 * @returns Lista de bots del usuario
 */
export const getUserBots = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token válido");
  }

  try {
    // Primero obtenemos la información del usuario para conseguir su ID
    const userInfo = await getUserInfo();
    console.log("Información de usuario obtenida:", userInfo);

    if (!userInfo || !userInfo.id) {
      throw new Error("No se pudo obtener el ID del usuario");
    }

    const userId = userInfo.id;
    console.log("Buscando bots para el usuario con ID:", userId);

    // Ahora usamos el ID para obtener los bots
    const response = await fetch(
      `http://localhost:8080/api/v0/bot?owner=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Manejo mejorado de errores
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error(
          "Sesión expirada. Por favor, inicia sesión nuevamente."
        );
      }

      if (response.status === 404) {
        return []; // Devolver array vacío si no hay bots
      }

      const errorText = await response.text();
      throw new Error(
        errorText || `Error ${response.status}: ${response.statusText}`
      );
    }

    const bots = await response.json();
    console.log("Bots obtenidos:", bots);
    return bots;
  } catch (error) {
    console.error("Error al obtener los bots del usuario:", error);
    throw error;
  }
};

/**
 * Obtiene un bot específico por su ID
 * @param botId ID del bot a obtener
 * @returns Detalles del bot
 */
export const getBotById = async (botId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    const response = await fetch(`http://localhost:8080/api/v0/bot/${botId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener el bot con ID ${botId}:`, error);
    throw error;
  }
};

/**
 * Actualiza un bot existente
 * @param botId ID del bot a actualizar
 * @param botData Datos actualizados del bot
 * @returns El bot actualizado
 */
export const updateBot = async (
  botId: number,
  botData: {
    name: string;
    descripcion: string;
    urlImagen: string;
    endpoint?: string;
  }
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    // Asegurar que el endpoint esté definido
    const dataToSend = {
      ...botData,
      endpoint: botData.endpoint || "default",
    };

    const response = await fetch(`http://localhost:8080/api/v0/bot/${botId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Error ${response.status}: ${response.statusText}`
      );
    }

    // El backend devuelve 204 No Content, así que no hay cuerpo para parsear
    if (response.status === 204) {
      // En este caso, podemos devolver los datos enviados con el ID
      return { ...dataToSend, id: botId };
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar el bot con ID ${botId}:`, error);
    throw error;
  }
};

export const addBotsToLeagueModel = async (
  leagueId: number,
  botIds: number[]
) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token válido.");
  }

  for (const botId of botIds) {
    const response = await fetch(
      `http://localhost:8080/api/v0/league/${leagueId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ botId }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }
};
