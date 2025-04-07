import LeagueDTO from "src/DTOClasses/LeagueDTO.ts";
import BotDTO from "../DTOClasses/BotDTO.ts";
import UserDTO from "src/DTOClasses/UserDTO.ts";
import MatchDTO from "src/DTOClasses/MatchDTO.ts";
import ParticipationDTO from "src/DTOClasses/ParticipationDTO.ts";
import MessageDTO from "src/DTOClasses/MessageDTO.ts";

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