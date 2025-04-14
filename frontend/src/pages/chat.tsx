import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

interface ChatProps {
  bot1: string;
  bot2: string;
  jornada: number;
}

export default function Chat({ bot1, bot2, jornada }: ChatProps) {
  const [chatMessages, setChatMessages] = useState<{ bot: string; message: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const bot1Message = `${bot1} dice: ¡Estoy listo para la batalla!`;
      const bot2Message = `${bot2} responde: ¡No te subestimes!`;

      setChatMessages((prev) => [
        ...prev,
        { bot: bot1, message: bot1Message },
        { bot: bot2, message: bot2Message },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [bot1, bot2]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a2333",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", p: 2, color: "cyan" }}>
        Debate: {bot1} vs {bot2} - Jornada {jornada}
      </Typography>

      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#0a0f1d",
        }}
      >
        {chatMessages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.bot === bot1 ? "flex-start" : "flex-end",
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: "8px 12px",
                borderRadius: "16px",
                backgroundColor: msg.bot === bot1 ? "cyan" : "gray",
                color: msg.bot === bot1 ? "#0a0f1d" : "white",
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