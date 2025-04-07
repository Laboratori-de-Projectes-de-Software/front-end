export interface botLiga {
    posicion: number;
    nombre: string;
    cualidad: string;
    imagen: string;
    estadisticas: estadisticasBotLiga

}

export interface estadisticasBotLiga{
    total: number;
    victorias: number;
    derrotas: number;
    empates: number;
}
