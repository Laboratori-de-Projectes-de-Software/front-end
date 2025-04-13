import {FC} from 'react';
import Conversation from './conversation';
import { appApi } from 'src/features/shared';
import LoadingScreen from '@modules/shared/loading-screen/loading-screen';
import ErrorPage from "@modules/shared/error-page/error-page";
import './match.scss';

export type Props = {
  leagueId: number;
  matchId: number;
};

const Match: FC<Props> = ({ leagueId, matchId }) => {

  // TODO: Extraer toda la lógica de aquí y pasarlo al componente Match.tsx (mejor si en un hook aparte)
  
  /*/ Recuperar datos de la API: /*/

  // Partido
  const queryMatch = appApi.useGetLeagueLeagueIdMatchQuery(Number(leagueId), {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
  });

  if (queryMatch.isError) {
    return <ErrorPage message='Error recuperando la información' />;
  }

  if (!queryMatch.data) {
    return <ErrorPage message='Error recuperando la información' />;
  }

  const match = queryMatch.data.find((match) => match.matchId === Number(matchId));

  // Mensajes
  const queryMessages = appApi.useGetMatchMatchIdMessageQuery(Number(matchId), {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (queryMessages.isError) {
    return <ErrorPage message='Error recuperando los mensajes' />;
  }

  const messages = queryMessages.data;

  if (!messages) {
    return <ErrorPage message='Error recuperando los mensajes' />;
  }

  // Contrincantes
  const bot1_Id = messages[0].botId;
  const bot2_Id = messages.find((message) => message.botId !== bot1_Id)?.botId;

  const queryB1 = appApi.useGetBotBotIdQuery(bot1_Id, {
    skip: !bot1_Id,
  });
  const queryB2 = appApi.useGetBotBotIdQuery(bot2_Id!, {
    skip: !bot2_Id,
  });

  if (queryB1.isLoading || queryB2.isLoading) {
    return <LoadingScreen />;
  }

  if (queryB1.isError || queryB2.isError) {
    return <ErrorPage message='Error recuperando la información de los bots' />;
  }

  // Ordenar los mensajes
  const messagesToSent: {
    text:string;
    side: "left" | "right";
    time: string;
  } [] = messages.map((message) => {
    return {
      text: message.text,
      side: message.botId === bot1_Id ? "left" : "right",
      time: message.time,
    };
  });

  return (
    <div className="dark-theme">
      <div className="match-container">
        <div className="match-header">
          <div className="match-header-title">Match #{matchId}</div>
          <div className="match-header-state">{match?.state}</div>
          {match?.state === 'finalizado' ? 
            <div className="match-header-result">
              {match?.result === 0 ? "Empate" : match?.result === 1 ? "Victoria Bot 1" : "Victoria Bot 2"}
            </div> 
          : 
            <></>
          }
        </div>
        <div className="match-left">
          <div className="match-bot-info">
            <div className="match-bot-info-image-container">
              <img src={queryB1.data?.urlImagen} alt={queryB1.data?.name} />
            </div>
            <div className="match-bot-name">{queryB1.data?.name}</div>
          </div>
        </div>
        <Conversation messages={messagesToSent} />
        <div className="match-right">
          <div className="match-bot-info">
            <img src={queryB2.data?.urlImagen} alt={queryB2.data?.name} />
            <div className="match-bot-name">{queryB2.data?.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
