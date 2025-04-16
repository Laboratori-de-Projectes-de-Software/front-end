export const registerUser = async (
  Nombre: string,
  Correo: string,
  Contraseña: string
) => {
  const response = await fetch("http://localhost:8080/api/v0/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: Nombre,
      mail: Correo,
      password: Contraseña,
    }),
  });

  if (!response.ok) throw new Error(await response.text());

  const responseText = await response.text();
  if (!responseText || responseText.trim() === "") {
    return { success: true };
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    return { success: true, message: responseText };
  }
};

export const loginUser = async (Usuario: string, Contraseña: string) => {
  const response = await fetch("http://localhost:8080/api/v0/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: Usuario, password: Contraseña }),
  });

  if (!response.ok) throw new Error(await response.text());

  return response.json();
};
