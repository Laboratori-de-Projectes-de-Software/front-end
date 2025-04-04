import { jwtDecode } from "jwt-decode";

/**
 * Interfaz que define la estructura de un bot según la API
 */
export interface Bot {
  id?: number;
  name: string;
  descripcion?: string; // Nota: descripcion, no description
  urlImagen?: string; // Nota: urlImagen, no imageUrl
  endpoint?: string; // Nuevo campo que veo en tu API
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Crea un nuevo bot en el sistema
 * @param botData Datos del bot a crear
 * @returns El bot creado con su ID asignado
 */
export const createBot = async (botData: {
  name: string;
  descripcion: string;
  urlImagen: string;
  endpoint?: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const response = await fetch("http://localhost:8080/api/v0/bot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(botData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
};

/**
 * Obtiene todos los bots del usuario actual
 * @returns Lista de bots del usuario
 */
export const getUserBots = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  // Decodificar el token para obtener el ID de usuario
  const decodedToken: any = jwtDecode(token);
  const userEmail = decodedToken.sub; // Parece que tu API usa el email como identificador

  const response = await fetch(
    `http://localhost:8080/api/v0/bot?owner=${userEmail}`,
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
    throw new Error(
      errorText || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
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

  return response.json();
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

  const response = await fetch(`http://localhost:8080/api/v0/bot/${botId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(botData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
};
