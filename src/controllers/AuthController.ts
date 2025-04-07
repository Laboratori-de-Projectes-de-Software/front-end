import { registerUser, loginUser } from "../models/AuthModel";
import { jwtDecode } from "jwt-decode";

export const handleRegister = async (formData: any, navigate: any, setError: any) => {
    const { Nombre, Correo, Contraseña, ["Repetir Contraseña"]: RepetirContraseña } = formData;
    if (Contraseña !== RepetirContraseña) {
        setError("Las contraseñas no coinciden");
        return;
    }

    try {
        await registerUser(Nombre, Correo, Contraseña);
        console.log("Registro exitoso");
        navigate("/login");
    } catch (err: any) {
        setError(err.message || "Ocurrió un error");
    }
};

export const handleLogin = async (formData: any, navigate: any, setError: any) => {
    const { Correo, Contraseña } = formData;

    try {
        const data = await loginUser(Correo, Contraseña);
        console.log("Login exitoso:", data);

        // Decode the token to get the username
        const decodedToken: any = jwtDecode(data.token);
        localStorage.setItem("token", decodedToken);
        const email = decodedToken.username;
        console.log("user: " + email);
        localStorage.setItem("user", email);
        navigate("/dashboard");
    } catch (err: any) {
        setError(err.message || "Ocurrió un error");
    }
};