import { BotDTO, BotResponseDTO, BotSummaryResponseDTO } from "../DTOClasses/BotDTO";
import { LeagueDTO, LeagueResponseDTO } from "../DTOClasses/LeagueDTO";
import { MatchDTO } from "../DTOClasses/MatchDTO";
import { MessageDTO } from "../DTOClasses/MessageDTO";
import { ParticipationDTO } from "../DTOClasses/ParticipationDTO";
import { UserDTOLogin, UserDTORegister, UserResponseDTO } from "../DTOClasses/UserDTO";

import React, { useEffect } from "react";

interface LeagueData {
    leagueId: string;
  }
  
interface BotData {
name: string;
apiUrl: string;
team: string;
}
  
//const BASE_URL = "http://localhost:8080";

const BASE_URL = "/api/v0"

type UserToken = string | null;

export async function userSignUp(userData: UserDTORegister): Promise<UserResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok) return null;

        //Per fer proves
        const result: UserResponseDTO = await response.json();
        console.log("Usuari registrat:", result);
        return result;


        return await response.json();
    } catch (err) {
            console.error("Signup error:", err);
            return null;
    }
  }
  

  export async function userLoggin(email: string, password: string): Promise<UserToken> {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) return null;
      const data: UserResponseDTO = await response.json();
      localStorage.setItem("token", data.token);
      
      console.log("Login correcte, token:", data.token);
      return data.token;
    } catch (err) {
      console.error("Login error:", err);
      return null;
    }
  }

/**
 * 
 * @returns If the loggout was succesful
 */
export function userLoggout(): boolean {
    localStorage.removeItem("token");
    return true;
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