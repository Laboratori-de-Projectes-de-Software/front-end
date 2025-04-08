import { jwtDecode } from "jwt-decode";

/**
 * Verifica si el token actual es válido y no ha expirado
 * @returns {boolean} true si el token es válido, false en caso contrario
 */
export const isValidToken = (): boolean => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Verificar que el token tenga la estructura básica de un JWT (tres partes separadas por puntos)
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.error("Token malformado: no tiene las tres partes requeridas");
      localStorage.removeItem("token");
      return false;
    }

    // Intenta decodificar el token
    try {
      const decodedToken: any = jwtDecode(token);

      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log("Token expirado");
        localStorage.removeItem("token");
        return false;
      }

      // Verificar que el token contenga información básica de usuario
      if (!decodedToken.sub) {
        console.error("Token inválido: falta información de usuario");
        localStorage.removeItem("token");
        return false;
      }

      return true;
    } catch (decodeError) {
      console.error("Error al decodificar el token:", decodeError);
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    console.error("Error general al validar el token:", error);
    localStorage.removeItem("token");
    return false;
  }
};

/**
 * Obtiene el token actual con manejo de errores
 * @returns {string|null} El token JWT o null si no existe o es inválido
 */
export const getAuthToken = (): string | null => {
  if (!isValidToken()) return null;
  return localStorage.getItem("token");
};
