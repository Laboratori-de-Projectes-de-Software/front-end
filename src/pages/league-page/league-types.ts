import { DateTime } from "luxon";

export interface LeaguesFilters {
    name?: string;
    date?: DateTime;
    numRounds?: number;
    playTime?: number;
    playing?: boolean;
};

export type LeagueType = {
    id: number;
    name: string;
    date: string;
    numRounds: number;
    playTime: number;
    playing: boolean;
};