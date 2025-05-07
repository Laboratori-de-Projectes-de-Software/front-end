import { jwtDecode } from "jwt-decode";

/**
 * Obtiene la información del usuario actual basado en el token JWT
 */
export const getUserInfo = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    // Decodificar el token para obtener la información del usuario
    const decodedToken: any = jwtDecode(token);
    console.log("Token decodificado:", decodedToken);

    let endpoint = "";

    // Determinar qué endpoint usar basado en la información disponible en el token
    if (decodedToken.sub && decodedToken.sub.includes("@")) {
      // Si el campo 'sub' contiene un email, usamos el endpoint por email
      endpoint = `http://localhost:8080/api/v0/user/email/${encodeURIComponent(
        decodedToken.sub
      )}`;
    } else if (decodedToken.sub && !isNaN(Number(decodedToken.sub))) {
      // Si el campo 'sub' es un número, usamos el endpoint por ID
      endpoint = `http://localhost:8080/api/v0/user/${decodedToken.sub}`;
    } else {
      throw new Error(
        "No se pudo determinar el identificador del usuario desde el token"
      );
    }

    console.log("Haciendo petición a:", endpoint);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error de la API:", errorText);
      throw new Error(
        errorText || `Error ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error en getUserInfo:", error);
    throw error;
  }
};
