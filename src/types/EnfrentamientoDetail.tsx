export interface EnfrentamientoBotDetail {
    id: number;
    name: string;
    description: string;
    urlImage: string;
}

export type EnfrentamientoDetail = {
    id: number;
    leagueId: number;
    leagueName: string;
    bots: EnfrentamientoBotDetail[];
    resultado: string;
}