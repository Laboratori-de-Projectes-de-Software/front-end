export const registerUser = async (Nombre: string, Correo: string, Contraseña: string) => {
    const response = await fetch("http://localhost:8080/api/v0/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: Nombre, email: Correo, password: Contraseña }),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
};

export const loginUser = async (Correo: string, Contraseña: string) => {
    const response = await fetch("http://localhost:8080/api/v0/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Correo, password: Contraseña }),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
};