import { BotSummaryResponseDTO } from "./ConAPI";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";

const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

export default function Account() {
  interface NotificationProps {
    message: string;
    type: "success" | "error";
  }
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const [bots, setBots] = useState<BotSummaryResponseDTO[]>([]);
  

  const initializeComponent = (userId: number) => {

    //const userId = 1
  
          window.APIConection.getAllBotsUser(userId).then((response: BotSummaryResponseDTO[]) => {
            setBots(response); // Guarda la respuesta en el estado
          })
              .catch((error: any) => {
                  setNotification({
                      message: error.message || "Failed to log account",
                      type: "error"
                  });
              });
  };

  // useEffect que ejecuta la función cuando el componente se monta
  useEffect(() => {
    initializeComponent(40);
  }, []); 




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

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
    e.target.value = "0"; // Si el valor es negativo, lo forzamos a 0
  }
}

const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

const toggleOption = (option: string) => {
  setSelectedOptions((prev) =>
    prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
  );
};

  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="content_home">
            {notification && <Notification message={notification.message} type={notification.type} />}
                <h2> Home </h2>
                <p>Select the AIs for the match:</p>
                <div className="dropdown-container">
                  <details className="dropdown-details">
                    <summary className="dropdown-button">
                      {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Seleccionar..."}
                      <span className="icon">▼</span>
                    </summary>
                    <div className="dropdown-menu">
                      {bots.map((bot)=>(
                        <div                          
                          key={bot.name}
                        >
                        </div>
                      ))}

                      {options.map((option) => (
                        <div
                          key={option}
                          className={`option-item ${selectedOptions.includes(option) ? "selected" : ""}`}
                          onClick={() => toggleOption(option)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            readOnly
                          />
                          {option}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
                <p>Match details:</p>
                <div className="counter">  
                    <label>Combat Time (s):</label>
                    <input 
                        type="number" 
                        name="combat_time"
                        defaultValue="0"
                        onChange={handleChange} 
                        className="counter-input" 
                    />
                    <label>Nº of combats:</label>
                    <input 
                        type="number" 
                        name="n_combat"
                        defaultValue="0"
                        onChange={handleChange} 
                        className="counter-input" 
                    />
                </div>
                <button className="button-round button-blue" >Start</button>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
