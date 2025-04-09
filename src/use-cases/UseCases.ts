import { BotDTO, BotResponseDTO, BotSummaryResponseDTO } from "../DTOClasses/BotDTO";
import { LeagueDTO, LeagueResponseDTO } from "../DTOClasses/LeagueDTO";
import { MatchResponseDTO } from "../DTOClasses/MatchDTO";
import { MessageResponseDTO } from "../DTOClasses/MessageDTO";
import { ParticipationResponseDTO } from "../DTOClasses/ParticipationDTO";
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

export async function registerBot(botData: BotDTO): Promise<BotResponseDTO | null> {
    try {
      // Realitzem la petició POST per registrar el bot
      const response = await fetch(`${BASE_URL}/bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquem que enviem un JSON
        },
        body: JSON.stringify(botData), // Convertim `botData` en un JSON per enviar-lo
      });
  
      // Si la resposta no és satisfactòria (no OK), retornem null
      if (!response.ok) {
        console.error("Error al registrar el bot:", response.statusText);
        return null;
      }
  
      // Parsegem la resposta com a JSON i la convertim en un objecte `BotResponseDTO`
      const result: BotResponseDTO = await response.json();
  
      // Per fer proves, podem mostrar el resultat a la consola
      console.log("Bot registrat amb èxit:", result);
  
      return result; // Retornem la resposta amb les dades del bot registrat
    } catch (err) {
      console.error("Error al registrar el bot:", err);
      return null; // En cas d'error, retornem null
    }
}

export async function getAllBots(userId?: number): Promise<BotSummaryResponseDTO[] | null> {
    try {
        // Construcció dinàmica de l'URL amb o sense paràmetre `owner`
        const url = userId ? `${BASE_URL}/bot?owner=${userId}` : `${BASE_URL}/bot`;
  
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        if (!response.ok) {
            console.error("Error al obtenir els bots:", response.statusText);
            return null;
        }
  
        const bots: BotSummaryResponseDTO[] = await response.json();
        return bots;
    } catch (error) {
        console.error("Error inesperat al obtenir els bots:", error);
        return null;
    }
}

export async function getBot(botId: number): Promise<BotResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/bot/${botId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        if (!response.ok) {
            console.error(`Error en obtenir el bot amb ID ${botId}:`, response.statusText);
            return null;
        }
  
        const bot: BotResponseDTO = await response.json();
        return bot;
    } catch (error) {
        console.error(`Error inesperat en obtenir el bot amb ID ${botId}:`, error);
        return null;
    }
}

export async function updateBot(botId: number, botData: BotDTO): Promise<BotResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/bot/${botId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(botData),
        });
  
          if (!response.ok) {
            console.error(`Error al actualitzar el bot amb ID ${botId}:`, response.statusText);
            return null;
        }
  
        const updatedBot: BotResponseDTO = await response.json();
        return updatedBot;
    } catch (error) {
        console.error(`Error inesperat al actualitzar el bot amb ID ${botId}:`, error);
        return null;
    }
}

export async function createLeague(leagueData: LeagueDTO): Promise<LeagueResponseDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/league`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(leagueData), 
        });
    
        if (!response.ok) {
          console.error("Error al crear la lliga:", response.statusText);
          return null;
        }
    
        const result: LeagueResponseDTO = await response.json();
    
        console.log("Lliga creada amb èxit:", result);
    
        return result; 
      } catch (err) {
        console.error("Error al crear la lliga:", err);
        return null; // En cas d'error, retornem null
      }
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

function createMatches(league: LeagueDTO): MatchResponseDTO[] | null {
    return null;
}

export function getLeagueClassification(league: LeagueDTO): ParticipationResponseDTO[] | null {
    return null;
}

export function getLeagueMatches(league: LeagueDTO): MatchResponseDTO[] | any {
    return null;
}

export function getMatchMessages(): MessageResponseDTO[] | null {
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

