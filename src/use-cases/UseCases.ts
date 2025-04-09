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
      return data;
    } catch (err) {
      console.error("Error de connexió a getAllLeagues:", err);
      return null;
    }
  }
  
  export async function getLeague(leagueId: number): Promise<LeagueResponseDTO | null> {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/league/${leagueId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error HTTP obtenint la lliga:", response.status);
        return null;
      }

      try {
        const data: LeagueResponseDTO = await response.json();
        return data;
      } catch (err) {
        console.error("Error parsejant JSON de la lliga:", err);
        return null;
      }
    } catch (error) {
      console.error("Error obtenint la lliga:", error);
      return null;
    }
  }
  
  export async function updateLeague(leagueId: number, leagueData: LeagueDTO): Promise<LeagueResponseDTO | null> {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/league/${leagueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(leagueData),
      });

      if (!response.ok) {
        console.error("Error HTTP actualitzant la lliga:", response.status);
        return null;
      }

      try {
        const data: LeagueResponseDTO = await response.json();
        return data;
      } catch (err) {
        console.error("Error parsejant JSON de la lliga actualitzada:", err);
        return null;
      }
    } catch (error) {
      console.error("Error actualitzant la lliga:", error);
      return null;
    }
  }

  export async function addBotToLeague(leagueId: number, botId: number): Promise<void> {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/league/${leagueId}/bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ botId }),
      });

      if (!response.ok) {
        console.error("Error HTTP registrant el bot a la lliga:", response.status);
      }
    } catch (error) {
      console.error("Error registrant bot a la lliga:", error);
    }
  }

  export async function getLeagueClassification(leagueId: number): Promise<ParticipationDTO[] | null> {
    try {
      const token = localStorage.getItem("token");
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

export async function deleteLeague(leagueId: number): Promise<boolean> {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/league/${leagueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Lliga eliminada correctament.");
      return true;
    } else {
      console.error(`Error HTTP eliminant la lliga: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error eliminant la lliga:", error);
    return false;
  }
}

export async function startLeague(leagueId: number): Promise<boolean> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      console.log("Lliga iniciada i enfrontaments creats correctament.");
      return true;
    } else {
      console.error(`Error HTTP iniciant la lliga: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error iniciant la lliga:", error);
    return false;
  }
}