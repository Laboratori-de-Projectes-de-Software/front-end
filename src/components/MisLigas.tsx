import Footer from "./Footer";
import SideBar from "./SideBar";
import { LeagueResponseDTO } from "./ConAPI";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

export default function Scores() {
  const [leagues, setLeagues] = useState<LeagueResponseDTO[]>([]);
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  function getCookie(c: string): string {
    console.log(document.cookie);
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, value] = cookie.split('=');
      if (cookieName === c) {
        return `${decodeURIComponent(value)}`;
      }
    }
    return "";
  }
   

  useEffect(() => {
    //const userId = 14;
    window.APIConection.getAllLeaguesUser(Number(getCookie("userId")))
      .then((response: LeagueResponseDTO[]) => {
        setLeagues(response);
      })
      .catch((error: any) => {
        setNotification({
          message: error.message || "Failed to load leagues",
          type: "error",
        });
      });
  }, []);

  const notificationStyles = {
    container: {
      padding: "12px 16px",
      borderRadius: "4px",
      marginBottom: "16px",
      position: "relative" as const,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    success: {
      backgroundColor: "#e6f4ea",
      border: "1px solid #34a853",
      color: "#1e7e34",
    },
    error: {
      backgroundColor: "#fdecea",
      border: "1px solid #ea4335",
      color: "#d32f2f",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      marginLeft: "8px",
    },
  };

  const Notification = ({ message, type }: NotificationProps) => {
    const style = {
      ...notificationStyles.container,
      ...(type === "success"
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
            <h1>Mis Ligas</h1>
            <h2 className="title">Historical leagues:</h2>
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}
            {leagues.map((league, index) => (
              <div key={index} className="league_card">
                <div className="league_info">
                  <img
                    src={league.urlImage}
                    //alt={league.name}
                    className="league_image"
                  />
                  <p className="league_name">{league.name}</p>
                  <p className="league_state">Estado: {league.state}</p>
                  <p className="league_rounds">Rondas: {league.rounds}</p>
                </div>

                <Link to={`/addiaLeague/${league.leagueId}`} >
                  <button className="button-round button-blue">Add bots to league</button>
                </Link>
                <Link to={`/clasificacion/${String(league.leagueId)}`} >
                  <button className="button-round button-blue">Ver Liga</button>
                </Link>
                <Link to={`/combatesLiga/${String(league.leagueId)}`} >
                  <button className="button-round button-blue">Ver Combates</button>
                </Link>

              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
