import { getUserInfo } from "../models/UserModel";
import { jwtDecode } from "jwt-decode";

/**
 * Obtiene la información del usuario actual y actualiza la UI
 * @param setUsername Función para establecer el nombre de usuario en el componente
 * @param setError Función opcional para manejar errores
 */
export const fetchCurrentUserInfo = async (
  setUsername: (username: string) => void,
  setError?: (error: string) => void
) => {
  try {
    // Intentamos obtener la información desde la API
    const userInfo = await getUserInfo();

    if (userInfo && userInfo.username) {
      // Establecer el nombre de usuario desde la respuesta del backend
      setUsername(userInfo.username);
      return;
    }
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);

    // Si falla la petición, intentamos usar la información del localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      return;
    }

    // Si no hay información en localStorage, intentamos extraerla del token
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.email) {
          // Usar la parte antes del @ como nombre temporal
          setUsername(decodedToken.email.split("@")[0]);
        }
      }
    } catch (tokenError) {
      console.error("Error al decodificar token:", tokenError);
    }

    // Propagar el error si se proporcionó una función para manejarlo
    if (setError) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  }
};

/**
 * Maneja el proceso de cierre de sesión
 * @param navigate Función para navegar a otra ruta
 */
export const handleLogout = (navigate: (path: string) => void) => {
  // Eliminar el token y cualquier otra información de autenticación
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate("/");
};
