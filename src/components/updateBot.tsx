import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { BotDTO } from "./ConAPI";
import { useLocation } from 'react-router-dom';

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

export default function Update_Bot() {
  // Obtener los datos pasados por navegación
  const location = useLocation();
  const { name, description, urlImage, endpoint } = location.state || {};
  
  // Inicializar estado con valores vacíos
  const [botInfo, setBotInfo] = useState<AIInfo>({ 
    name: "", 
    description: "", 
    urlImage: "", 
    endpoint: "" 
  });
  
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  // Cargar los datos recibidos en el estado cuando el componente se monte
  useEffect(() => {
    if (name && description && urlImage && endpoint) {
      setBotInfo({
        name,
        description,
        urlImage,
        endpoint
      });
    }
  }, [name, description, urlImage, endpoint]);

  const handleBotInfoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setBotInfo({
      ...botInfo,
      [name]: value
    });
  };

  const handleBotUpdate = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // Validate input data
    const aiData: BotDTO = {
      name: botInfo.name,
      description: botInfo.description,
      urlImage: botInfo.urlImage,
      endpoint: botInfo.endpoint
    }
    
    // Aquí deberías obtener el ID real del bot en lugar de usar un valor fijo
    // Podrías pasarlo también en location.state
    const botId = 40; // Idealmente, este valor debería venir de location.state
    
    window.APIConection.updateBot(aiData, botId).then((response: any) => {
      setNotification({
        message: "Bot updated successfully!",
        type: "success"
      });
    })
      .catch((error: any) => {
        setNotification({
          message: error.message || "Failed to update bot",
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
              <h2>Update Bot</h2>
              {notification && <Notification message={notification.message} type={notification.type} />}
              
              <div className="form-container">
                <label>Name: </label>
                <input type="text" name="name" value={botInfo.name} onChange={handleBotInfoChange} />
                <label>Description: </label>
                <input type="text" name="description" value={botInfo.description} onChange={handleBotInfoChange} />
                <label>Url Image: </label>
                <input type="url" name="urlImage" value={botInfo.urlImage} onChange={handleBotInfoChange} />
                <label>Endpoint: </label>
                <input type="url" name="endpoint" value={botInfo.endpoint} onChange={handleBotInfoChange} />
                <button className="button-round button-blue" onClick={handleBotUpdate}>Update Bot</button>
              </div>
              
              <h3>Original Data:</h3>
              <div className="table_container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Url Image</th>
                      <th>Endpoint</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>{urlImage}</td>
                      <td>{endpoint}</td>
                    </tr>
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