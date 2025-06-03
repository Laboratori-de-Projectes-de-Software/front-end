import {FC, useState} from 'react';
import Conversation from './conversation';
import { appApi } from '@features/shared';
import LoadingScreen from '@modules/shared/loading-screen/loading-screen';
import ErrorPage from "@modules/shared/error-page/error-page";
import './match.scss';

export type Props = {
  leagueId: number;
  matchId: number;
};

const Match: FC<Props> = ({ leagueId, matchId }) => {
  const [isStarting, setIsStarting] = useState(false);
  
  /*/ Recuperar datos de la API: /*/

  // Partido
  const queryMatch = appApi.useGetLeagueLeagueIdMatchQuery(Number(leagueId), {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
  });

  if (queryMatch.isError) {
    return <ErrorPage message='Error recuperando la información' />;
  }

  if (!queryMatch.data?.body) {
    return <ErrorPage message='Error recuperando la información' />;
  }

  const match = queryMatch.data.body.find((match) => match.matchId === Number(matchId));

  // Mensajes
  const queryMessages = appApi.useGetMatchMatchIdMessageQuery(Number(matchId), {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (queryMessages.isError) {
    return <ErrorPage message='Error recuperando los mensajes' />;
  }

  const messages = queryMessages.data?.body;

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

  if (!queryB1.data?.body || !queryB2.data?.body) {
    return <ErrorPage message='Error recuperando la información de los bots' />;
  }

  const bot1 = queryB1.data.body;
  const bot2 = queryB2.data.body;

  // Iniciar partido
  const [startMatch] = appApi.usePostMatchMatchIdStartMutation();

  const handleStartMatch = async () => {
    try {
      setIsStarting(true);
      await startMatch(Number(matchId)).unwrap();
      // Refrescar los datos
      queryMatch.refetch();
      queryMessages.refetch();
    } catch (error) {
      console.error('Error starting match:', error);
    } finally {
      setIsStarting(false);
    }
  };

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
          {match?.state === 'finalizado' ? (
            <div className="match-header-result">
              {match?.result === 0 ? "Empate" : match?.result === 1 ? "Victoria Bot 1" : "Victoria Bot 2"}
            </div> 
          ) : match?.state === 'pendiente' ? (
            <button 
              className="match-start-button" 
              onClick={handleStartMatch}
              disabled={isStarting}
            >
              {isStarting ? 'Iniciando...' : 'Iniciar Partido'}
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="match-fight">
          <div className="match-left">
            <div className="match-bot-info">
              <div className="match-bot-info-image-container">
                <img src={bot1.urlImagen} alt={bot1.name} />
              </div>
              <div className="match-bot-name">{bot1.name}</div>
            </div>
          </div>
          <Conversation messages={messagesToSent} />
          <div className="match-right">
          <div className="match-bot-info">
            <img src={bot2.urlImagen} alt={bot2.name} />
            <div className="match-bot-name">{bot2.name}</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
