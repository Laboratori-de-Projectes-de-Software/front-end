import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LeagueResponseDTO, MatchResponseDTO } from './ConAPI';
import Footer from './Footer';
import SideBar from './SideBar';

type LeagueParams = {
  leagueId: string;
};

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const combate: React.FC = () => {
  const { leagueId } = useParams<LeagueParams>();
  const [league, setLeague] = useState<LeagueResponseDTO | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [combates, setcombates] = useState<MatchResponseDTO[]>([]);

  useEffect(() => {
    if (!leagueId) return;

    window.APIConection.getLeague(Number(leagueId))
      .then((response: LeagueResponseDTO) => {
        setLeague(response);
      })
      .catch((error: any) => {
        setNotification({
          message: error.message || 'Failed to load league',
          type: 'error',
        });
      });

    window.APIConection.getAllMatchesLeague(Number(leagueId))
      .then((response: MatchResponseDTO[]) => {
        setcombates(response);
      })
      .catch((error: any) => {
        setNotification({
          message: error.message || 'Failed to load classification',
          type: 'error',
        });
      });
  }, [leagueId]);

  const notificationStyles = {
    container: {
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '16px',
      position: 'relative' as const,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    success: {
      backgroundColor: '#e6f4ea',
      border: '1px solid #34a853',
      color: '#1e7e34',
    },
    error: {
      backgroundColor: '#fdecea',
      border: '1px solid #ea4335',
      color: '#d32f2f',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      marginLeft: '8px',
    },
  };

  const Notification = ({ message, type }: NotificationProps) => {
    const style = {
      ...notificationStyles.container,
      ...(type === 'success'
        ? notificationStyles.success
        : notificationStyles.error),
    };

    return (
      <div style={style} role="alert">
        <span>{message}</span>
        <button
          style={notificationStyles.closeButton}
          onClick={() => setNotification(null)}
        >
          &times;
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="page_container">
        <SideBar />
        <div className="content_container">
          <div className="scores_container">
            <h1>Combates</h1>

            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}

            {league && (
              <div key={leagueId}>
                <div className="league_info">
                  <p className="league_name"><strong>{league.name}</strong></p>
                  <p className="league_state"></p>
                  <p className="league_rounds"> Tiempo por combate: {league.matchTime}</p>
                  <p className="league_time"></p>
                </div>
              </div>
            )}

            {combates && combates.map((combate, index) => (
              <div key={index} className="league_card">
                <div className="league_info">
                  <p><strong>Estado:</strong> {combate.state}</p>
                  <p><strong>Combatientes:</strong> {combate.fighters}</p>
                  <p><strong>Resultado:</strong> {combate.result}</p>
                  <p><strong>Nº de rondas:</strong> {combate.roundNumber}</p>
                </div>
                <Link to={`/chatwindow/${combate.matchId.toString()}`}>
                  <button className="button-round button-blue">Ver chat</button>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default combate;
