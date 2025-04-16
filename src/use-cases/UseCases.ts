import { CreateBotDTO, BotDTO } from "@DTOClasses/BotDTO";
import { CreateLeagueDTO, LeagueDTO } from "@DTOClasses/LeagueDTO";
import { MatchDTO } from "@DTOClasses/MatchDTO";
import { MessageDTO } from "@DTOClasses/MessageDTO";
import { ParticipationDTO } from "@DTOClasses/ParticipationDTO";
import {UserRegisterDTO, UserDTO, AuthenticatedUserDTO } from "@DTOClasses/UserDTO";
  
const BASE_URL = "http://localhost:8082/api/v0"
//const BASE_URL = "http://localhost:8082";


export async function userSignUp(userData: UserRegisterDTO){
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
          console.error("Signup response. Status:", response.status);
        }else{ 
          console.log("Sigup correcte", response.status);
        }

    } catch (err) {
        console.error("Signup error:", err);
        return null;
    }
  }
  

  export async function userLoggin(email: string, password: string):  Promise<AuthenticatedUserDTO | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

        if (!response.ok) return null;

        const data: AuthenticatedUserDTO = await response.json();
      
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
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresIn")
    return true;
  }

export async function registerBot(botData: CreateBotDTO): Promise<BotDTO | null> {
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
      const result: BotDTO = await response.json();
  
      // Per fer proves, podem mostrar el resultat a la consola
      console.log("Bot registrat amb èxit:", result);
  
      return result; // Retornem la resposta amb les dades del bot registrat
    } catch (err) {
      console.error("Error al registrar el bot:", err);
      return null; // En cas d'error, retornem null
    }
}

export async function getAllBots(userId?: number): Promise<BotDTO[]> {
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
            return [];
        }
  
        const bots: BotDTO[] = await response.json();
        return bots;
    } catch (error) {
        console.error("Error inesperat al obtenir els bots:", error);
        return [];
    }
}

export async function getBot(botId: number): Promise<BotDTO | null> {
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
  
        const bot: BotDTO = await response.json();
        return bot;
    } catch (error) {
        console.error(`Error inesperat en obtenir el bot amb ID ${botId}:`, error);
        return null;
    }
}

export async function updateBot(botId: number, botData: CreateBotDTO): Promise<BotDTO | null> {
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
  
        const updatedBot: BotDTO = await response.json();
        return updatedBot;
    } catch (error) {
        console.error(`Error inesperat al actualitzar el bot amb ID ${botId}:`, error);
        return null;
    }
}

export async function createLeague(leagueData: CreateLeagueDTO): Promise<LeagueDTO | null> {
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
    
        const result: LeagueDTO = await response.json();
    
        console.log("Lliga creada amb èxit:", result);
    
        return result; 
      } catch (err) {
        console.error("Error al crear la lliga:", err);
        return null; // En cas d'error, retornem null
      }
}

export async function getAllLeagues(userId?: number): Promise<LeagueDTO[]> {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(userId ? `/league?owner=${userId}` : `/league`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error HTTP carregant lligues:", response.status);
        return [];
      }
  
      let data: LeagueDTO[];
      try {
        data = await response.json();
      } catch (err) {
        console.error("Error parsejant JSON de lligues:", err);
        return [];
      }
      return data;
    } catch (err) {
      console.error("Error de connexió a getAllLeagues:", err);
      return [];
    }
  }
  
  export async function getLeague(leagueId: number): Promise<LeagueDTO | null> {
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
        const data: LeagueDTO = await response.json();
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
  
  export async function updateLeague(leagueId: number, leagueData: CreateLeagueDTO): Promise<LeagueDTO | null> {
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
        const data: LeagueDTO = await response.json();
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

  export async function getLeagueClassification(leagueId: number): Promise<ParticipationDTO[]> {
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
        return [];
      }
  
      try {
        const data: ParticipationDTO[] = await response.json();
        return data;
      } catch (parseError) {
        console.error("Error parsejant JSON de classificació:", parseError);
        return [];
      }
    } catch (error) {
      console.error("Error durant la petició de classificació:", error);
      return [];
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

export async function getMatchesFromLeague(leagueId: number): Promise<MatchDTO[] | null> {
  return [];
}

export async function getMessagesFromMatch(matchId: number): Promise<MessageDTO[] | null> {
  const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/match/${matchId}/message`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error HTTP while fething the messages:", response.status);
        return null;
      }

      try {
        const data: MessageDTO[] = await response.json();
        return data;
      } catch (err) {
        console.error("Error while parsing JSON from messages:", err);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching messages", error);
      return null;
    }
}

export function isLogged(): boolean {
  return localStorage.getItem('token') !== null;
}
