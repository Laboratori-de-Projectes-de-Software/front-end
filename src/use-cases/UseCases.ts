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

const BASE_URL = ""

export async function userSignUp(userData: UserDTORegister): Promise<UserResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok) return null;

        return await response.json();
    } catch (err) {
        console.error("Signup error:", err);
        return null;
    }
  }
  

  export async function userLoggin(email: string, password: string):  Promise<UserResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

        if (!response.ok) return null;

        const data: UserResponseDTO = await response.json();
      
        console.log("Resposta del backend:", data);      
        return data;

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

export async function getAllLeagues(userId: number): Promise<LeagueResponseDTO[] | null> {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`/league?owner=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error HTTP carregant lligues:", response.status);
        return null;
      }
  
      let data: LeagueResponseDTO[];
      try {
        data = await response.json();
      } catch (err) {
        console.error("Error parsejant JSON de lligues:", err);
        return null;
      }
  
      console.log("Lligues rebudes:", data);
      return data;
    } catch (err) {
      console.error("Error de connexió a getAllLeagues:", err);
      return null;
    }
  }

export async function getLeagueClassification(leagueId: number): Promise<ParticipationDTO[] | null> {
  try {
    const token = localStorage.getItem("token");
    console.log("📡 GET /leagues/:leagueId/classification → leagueId =", leagueId);
    const response = await fetch(`/leagues/${leagueId}/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error HTTP carregant classificació:", response.status);
      return null;
    }

    try {
      const data: ParticipationDTO[] = await response.json();
      console.log("Classificació rebuda:", data);
      return data;
    } catch (parseError) {
      console.error("Error parsejant JSON de classificació:", parseError);
      return null;
    }
  } catch (error) {
    console.error("Error durant la petició de classificació:", error);
    return null;
  }
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