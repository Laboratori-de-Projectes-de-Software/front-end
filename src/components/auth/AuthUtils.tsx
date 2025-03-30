export interface User {
  userId: number;
  email: string;
  nombre: string;
  imagen?: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      // TODO quitar dependencia a 8080
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Login failed");
  }
};

export const registerUser = async (
  email: string,
  nombre: string,
  password: string
) => {
  try {
    const response = await fetch("http://localhost:8080/register", {
      // TODO quitar dependencia a 8080
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nombre, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Registration failed");
    }
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Registration failed");
  }
};

export const logoutUser = async () => {
  // TODO implementar frontend logout
  try {
    const response = await fetch("http://localhost:8080/logout", {
      // TODO quitar dependencia a 8080
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Logout failed", errorData);
      return;
    }
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed", err);
  }
};

export const getCurrentUser = () => {
  // función sin utilizar para ver el usuario actual (quizá TODO implementar un frontend del perfil?)
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  // TODO usar en el frontend de logout
  localStorage.removeItem("user");
};
