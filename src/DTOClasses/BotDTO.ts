export interface BotDTO {
    name: string;
    team: string;
    apiUrl: string;
  }
  
  export interface BotResponseDTO {
    id: number;
    name: string;
    team: string;
    apiUrl: string;
    ownerId: number;
  }
  
  export interface BotSummaryResponseDTO {
    id: number;
    name: string;
    team: string;
  }