import { useState, useEffect } from "react";
import { User } from "../types/Usuario.tsx";
import imagen from "../assets/img/shrekperfil.png";

export const useUsuario = () => {
    const [usuario, setUsuario] = useState<User | null>(null);

    useEffect(() => {
        // CAMBIAR ESTO POR UN FETCH API UNA VEZ SE CONECTE CON EL BACK
        setUsuario({
            id: "1",
            name: "Adri",
            email: "correo@example.com",
            imagenUrl: imagen,
            bots:2,
            ligas:3,
        });
    }, []);

    return { usuario };
};