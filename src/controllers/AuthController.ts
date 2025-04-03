import { registerUser, loginUser } from "../models/AuthModel";

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
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
    } catch (err: any) {
        setError(err.message || "Ocurrió un error");
    }
};