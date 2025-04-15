import { ChangeEvent, FormEvent, useState } from "react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { BotDTO } from "./ConAPI";
import { useNavigate } from 'react-router-dom';

interface AIInfo {
  name: string,
  description: string,
  urlImage: string,
  endpoint: string
}

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

// Definimos la interfaz para el tipo TableRow
interface TableRow {
  name: string;
  description: string;
  urlImage: string;
  endpoint: string;
}

// Creamos el array tableData con dos objetos
const tableData: TableRow[] = [
  {
    name: "Bot Asistente",
    description: "Un bot que proporciona asistencia a usuarios con consultas generales",
    urlImage: "https://example.com/images/assistant-bot.png",
    endpoint: "/api/bots/assistant"
  },
  {
    name: "Bot Análisis",
    description: "Bot especializado en análisis de datos y generación de informes",
    urlImage: "https://example.com/images/analysis-bot.png",
    endpoint: "/api/bots/analysis"
  }
];


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
export default function Account() {
  // Mueve useNavigate dentro del componente
  const navigate = useNavigate();
  
  const [botInfo, setBotInfo] = useState<AIInfo>({ name: "", description: "", urlImage: "", endpoint: "" });
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  // Mueve handleUpdateBotClick dentro del componente y arréglalo
  const handleUpdateBotClick = (row: TableRow) => {
    navigate('/updateBot', { 
      state: { 
        name: row.name,
        description: row.description,
        urlImage: row.urlImage,
        endpoint: row.endpoint
      } 
    });
  };

  const handleBotInfoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setBotInfo({
      ...botInfo,
      [name]: value
    });
  };

  const handleBotPost = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // Validate input data
    const aiData: BotDTO ={
      name:botInfo.name,
      description:botInfo.description,
      urlImagen:botInfo.urlImage,
      endpoint:botInfo.endpoint,
      userId: parseInt(getCookie("userId"))
    }
    window.APIConection.postBot(aiData).then(() => {
      setNotification({
        message: "Account created successfully!",
        type: "success"
      });
    })
      .catch((error: any) => {
        setNotification({
          message: error.message || "Failed to create account",
          type: "error"
        });
      });
  };

  const notificationStyles = {
    container: {
        padding: '12px 16px',
        borderRadius: '4px',
        marginBottom: '16px',
        position: 'relative' as const,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    success: {
        backgroundColor: '#e6f4ea',
        border: '1px solid #34a853',
        color: '#1e7e34'
    },
    error: {
        backgroundColor: '#fdecea',
        border: '1px solid #ea4335',
        color: '#d32f2f'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        marginLeft: '8px'
    }
  };

  // Notification component
  const Notification = ({ message, type }: NotificationProps) => {
      const style = {
          ...notificationStyles.container,
          ...(type === "success" ? notificationStyles.success : notificationStyles.error)
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
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="IAs_container">
              <h2>Add AIs</h2>
              {notification && <Notification message={notification.message} type={notification.type} />}
              <div>
                <label>Name: </label>
                <input type="text" name="name" value={botInfo.name} onChange={handleBotInfoChange} />
                <label>Description: </label>
                <input type="text" name="description" value={botInfo.description} onChange={handleBotInfoChange} />
                <label>Url Image: </label>
                <input type="url" name="urlImage" value={botInfo.urlImage} onChange={handleBotInfoChange} />
                <label>Endpoint: </label>
                <input type="url" name="endpoint" value={botInfo.endpoint} onChange={handleBotInfoChange} />
              </div>
              <button className="button-round button-blue" onClick={handleBotPost}>ADD</button>
              <div className="table_container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Url Image</th>
                      <th>Endpoint</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.description}</td>
                        <td>{row.urlImage}</td>
                        <td>{row.endpoint}</td>
                        <td>
                          <button 
                            className="delete-button" 
                            onClick={() => handleUpdateBotClick(row)}
                          >
                            ✖
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}