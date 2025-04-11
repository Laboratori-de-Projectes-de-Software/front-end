import { BotDetail } from "./BotDetail.tsx";

export type Message = {
    bot: number;
    message: string;
}

export interface EnfrentamientoBotDetail extends BotDetail {
    position: string;
    quality: string;
    isWinner?: boolean;
}

export type EnfrentamientoDetail = {
    id: number;
    leagueId: number;
    leagueName: string;
    bots: EnfrentamientoBotDetail[];
    winner: number;
    messages: Message[];
    resultado: string;
}