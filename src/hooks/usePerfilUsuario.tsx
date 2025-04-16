import { useState, useEffect } from "react";
import {perfilUsuario} from "../types/perfilUsuario.tsx";
import defaultImagen  from "../assets/img/perfil.png"
import {API_PERFIL} from "../config.tsx";

export const useFetchPerfil = (id: string | undefined) => {
    const [perfil, setPerfil] = useState<perfilUsuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {

                const response = await fetch(`${API_PERFIL}${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener el perfil");
                }

                const data = await response.json();
                data.imagenUrl = data.imagenUrl != null
                    ? data.imagenUrl
                    : defaultImagen;

                setPerfil(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, []);

    return { perfil, loading, error };
};