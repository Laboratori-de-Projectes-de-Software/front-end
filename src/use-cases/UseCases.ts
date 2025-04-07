import LeagueDTO from "@DTOClasses/LeagueDTO.ts";
import BotDTO from "@DTOClasses/BotDTO.ts";
import UserDTO from "@DTOClasses/UserDTO.ts";
import MatchDTO from "@DTOClasses/MatchDTO.ts";
import ParticipationDTO from "@DTOClasses/ParticipationDTO.ts";
import MessageDTO from "@DTOClasses/MessageDTO.ts";
import React, { useEffect } from "react";

interface LeagueData {
    leagueId: string
}

interface UserData {
    name: string
}

interface BotData {
    name: string
    APILink: string

}

type UserToken = string | null;

export function userSignUp(userData: UserData): UserDTO | null{
    return null
}

export function userLoggin(): UserToken {
    return null;
}

/**
 * 
 * @returns If the loggout was succesful
 */
export function userLoggout(): boolean {
    return false;
}

export function registerBot(botData: BotData): BotDTO | null {
    return null;
}

export function createLeague(leagueData: LeagueData): LeagueDTO | null {
    return null;
}

export function updateLeague(league: LeagueDTO) {
    return league
}


export function addBotToLeague(bot: BotDTO, league: LeagueDTO) {
    return {bot, league};
}

export function initLeague(league: LeagueDTO): boolean {
    return false;
}

function createMatches(league: LeagueDTO): MatchDTO[] | null {
    return null;
}

export function getLeagueClassification(league: LeagueDTO): ParticipationDTO[] | null {
    return null;
}

export function getLeagueMatches(league: LeagueDTO): MatchDTO[] | any {
    return null;
}

export function getMatchMessages(match: MatchDTO): MessageDTO[] | null {
    return null;
}

export function getBots(): BotDTO[] | null {
    const [participants, setParticipants] = React.useState<BotDTO[]>([]);

    useEffect(() => {
        const fetchParticipants = async () => {
        try {
            const response = await fetch('http://localhost:8080/bot');
            if (!response.ok) throw new Error('Error loading participants');
            const data: BotDTO[] = await response.json();
            setParticipants(data);
        } catch (err) {
            console.error('Error loading participants:', err);
        }
        };

        fetchParticipants();
    }); // opció de filtrar per equip ??

    return participants;
}