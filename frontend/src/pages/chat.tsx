import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

export default function Chat() {
  // Estado para los mensajes del chat
  const [chatMessages, setChatMessages] = useState<{ bot: string; message: string }[]>([]);

  // Simular conversación entre dos bots
  useEffect(() => {
    const bot1 = "Bot A";
    const bot2 = "Bot B";

    const interval = setInterval(() => {
      const bot1Message = `${bot1} dice: ¡Estoy listo para la batalla!`;
      const bot2Message = `${bot2} responde: ¡No te subestimes!`;

      setChatMessages((prev) => [
        ...prev,
        { bot: bot1, message: bot1Message },
        { bot: bot2, message: bot2Message },
      ]);
    }, 2000); // Cada 2 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        border: "1px solid cyan",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#1a2333",
        color: "white",
      }}
    >
      {/* Título del chat */}
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "16px", color: "cyan" }}>
        Chat entre Bots
      </Typography>

      {/* Lista de mensajes con scroll interno */}
      <List
        sx={{
          flex: 1,
          overflowY: "auto", // Habilitar scroll vertical
          maxHeight: "300px", // Altura máxima del contenedor del chat
          marginBottom: "16px",
          backgroundColor: "#0a0f1d",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        {chatMessages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.bot === "Bot A" ? "flex-start" : "flex-end",
              marginBottom: "8px",
            }}
          >
            <Box
              sx={{
                padding: "8px 12px",
                borderRadius: "16px",
                backgroundColor: msg.bot === "Bot A" ? "cyan" : "gray",
                color: msg.bot === "Bot A" ? "#0a0f1d" : "white",
              }}
            >
              {msg.message}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}