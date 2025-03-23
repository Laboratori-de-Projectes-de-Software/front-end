import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Android as BotIcon,
  EmojiEvents as LeagueIcon,
  Public as AllIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Section =
  | "dashboard"
  | "myBots"
  | "myLeagues"
  | "allLeagues"
  | "allBots";

export default function Dashboard() {
  const [section, setSection] = useState<Section>("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const username = "admin"; // Puedes reemplazarlo por un contexto global

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#0a0f1d",
          color: "cyan",
          paddingTop: 2,
          boxShadow: "2px 0 10px rgba(0,255,255,0.1)",
        }}
      >
        <Typography sx={{ px: 2, mb: 2 }} variant="h6">
          👤 {username}
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("myBots")}>
              <ListItemIcon>
                <BotIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Mis Bots" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("myLeagues")}>
              <ListItemIcon>
                <LeagueIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Mis Ligas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("allLeagues")}>
              <ListItemIcon>
                <AllIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Ver todas las Ligas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("allBots")}>
              <ListItemIcon>
                <BotIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Ver todos los Bots" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.3)" }} />

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "cyan" }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Contenido dinámico */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          background: "linear-gradient(to top, #0a0f1d, #1a2333)",
          color: "white",
        }}
      >
        {section === "dashboard" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              Dashboard principal
            </Typography>
            <Typography>Bienvenido a la Liga de Bots. Usa el menú para comenzar.</Typography>
          </>
        )}

        {section === "myBots" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              🤖 Mis Bots
            </Typography>
            <Button variant="contained" sx={{ mb: 2 }}>
              + Registrar nuevo bot
            </Button>
            <Typography>📌 Aquí irán tus bots registrados (aún no implementado).</Typography>
          </>
        )}

        {section === "myLeagues" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              🏆 Mis Ligas
            </Typography>
            <Button variant="contained" sx={{ mb: 2 }}>
              + Crear nueva liga
            </Button>
            <Typography>📌 Aquí irán tus ligas creadas (aún no implementado).</Typography>
          </>
        )}

        {section === "allLeagues" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              📋 Todas las Ligas
            </Typography>
            <Typography>📌 Aquí se mostrarán todas las ligas (filtros, tarjetas...)</Typography>
          </>
        )}

        {section === "allBots" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              🤖 Todos los Bots
            </Typography>
            <Typography>📌 Aquí se mostrarán todos los bots registrados en la plataforma.</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
