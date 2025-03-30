import { useEffect, useState, useCallback } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Android as BotIcon,
  EmojiEvents as LeagueIcon,
  Public as AllIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BotRegisterForm from "./RegisterBot";
import LeagueRegisterForm from "./RegisterLiga";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BotCard from "../components/BotCard";
import LeagueCard from "../components/LeagueCard";

// Tipos
interface Bot {
  name: string;
  description: string;
}

interface League {
  id: number;
  name: string;
  creatorUsername: string;
}

type Section =
  | "dashboard"
  | "myBots"
  | "myLeagues"
  | "allLeagues"
  | "allBots"
  | "registerBot"
  | "registerLeague";

export default function Dashboard() {
  const [section, setSection] = useState<Section>("dashboard");
  const [userBots, setUserBots] = useState<Bot[]>([]);
  const [allBots, setAllBots] = useState<Bot[]>([]);
  const [userLeagues, setUserLeagues] = useState<League[]>([]);
  const [loadingBots, setLoadingBots] = useState(false);
  const [loadingAllBots, setLoadingAllBots] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Desconocido";
  const token = localStorage.getItem("token") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchUserBots = useCallback(async () => {
    setLoadingBots(true);
    try {
      const res = await fetch(`http://localhost:8080/users/${username}/bots`);
      if (res.ok) {
        const data = await res.json();
        setUserBots(data);
      }
    } catch (err) {
      console.error("Error al obtener bots del usuario", err);
    } finally {
      setLoadingBots(false);
    }
  }, [username]);

  const fetchAllBots = useCallback(async () => {
    setLoadingAllBots(true);
    try {
      const res = await fetch("http://localhost:8080/bots/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllBots(data);
      }
    } catch (err) {
      console.error("Error al obtener todos los bots", err);
    } finally {
      setLoadingAllBots(false);
    }
  }, [token]);

  const fetchUserLeagues = useCallback(async () => {
    setLoadingLeagues(true);
    try {
      const res = await fetch(`http://localhost:8080/leagues/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserLeagues(data);
      }
    } catch (err) {
      console.error("Error al obtener ligas del usuario", err);
    } finally {
      setLoadingLeagues(false);
    }
  }, [username, token]);

  useEffect(() => {
    if (section === "myBots") fetchUserBots();
    else if (section === "allBots") fetchAllBots();
    else if (section === "myLeagues") fetchUserLeagues();
  }, [section, fetchUserBots, fetchAllBots, fetchUserLeagues]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#0a0f1d",
          color: "cyan",
          paddingTop: 2,
          boxShadow: "2px 0 10px rgba(0,255,255,0.1)",
          borderRight: "2px solid cyan",
        }}
      >
        <Typography sx={{ px: 2, mb: 2 }} variant="h6">
          👤 {username}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("dashboard")}>
              <ListItemIcon><DashboardIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("myBots")}>
              <ListItemIcon><BotIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Mis Bots" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("myLeagues")}>
              <ListItemIcon><LeagueIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Mis Ligas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("allBots")}>
              <ListItemIcon><BotIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Ver todos los Bots" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("allLeagues")}>
              <ListItemIcon><AllIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Ver todas las Ligas" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2, borderColor: "rgba(0,255,255,0.3)" }} />

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon sx={{ color: "cyan" }} /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ flex: 1, padding: 4, background: "linear-gradient(to top, #0a0f1d, #1a2333)", color: "white" }}>
        {section === "dashboard" && (
          <>
            <Typography variant="h4" color="cyan" gutterBottom>
              Dashboard principal
            </Typography>
            <Typography>
              Bienvenido a la Liga de Bots, {username}. Usa el menú para comenzar.
            </Typography>
          </>
        )}

        {section === "myBots" && (
          <>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" color="cyan" sx={{ mb: 2 }}>
                🤖 Mis Bots
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Button variant="contained" onClick={() => setSection("registerBot")}>
                + Registrar nuevo bot
              </Button>
            </Box>

            {loadingBots ? (
              <CircularProgress color="inherit" />
            ) : userBots.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {userBots.map((bot, index) => (
                  <BotCard
                    key={index}
                    name={bot.name}
                    description={bot.description}
                    onEdit={() => {
                      console.log("Editar bot:", bot.name);
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Typography>Aún no tienes bots registrados.</Typography>
            )}
          </>
        )}

        {section === "allBots" && (
          <>
            <Typography variant="h4" color="cyan" sx={{ mb: 4 }}>
              🤖 Todos los Bots
            </Typography>
            {loadingAllBots ? (
              <CircularProgress color="inherit" />
            ) : allBots.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {allBots.map((bot, index) => (
                  <BotCard key={index} name={bot.name} description={bot.description} />
                ))}
              </Box>
            ) : (
              <Typography>No hay bots disponibles aún.</Typography>
            )}
          </>
        )}

        {section === "myLeagues" && (
          <>
            <Typography variant="h4" color="cyan">🏆 Mis Ligas</Typography>
            <Button variant="contained" sx={{ my: 2 }} onClick={() => setSection("registerLeague")}>+ Crear nueva liga</Button>
            {loadingLeagues ? <CircularProgress color="inherit" /> : (
              userLeagues.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {userLeagues.map((league) => (
                    <LeagueCard key={league.id} name={league.name} creator={league.creatorUsername} />
                  ))}
                </Box>
              ) : <Typography>No tienes ligas todavía.</Typography>
            )}
          </>
        )}

        {section === "registerBot" && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => setSection("myBots")}
              sx={{
                mb: 2,
                color: "cyan",
                borderColor: "cyan",
                minWidth: "40px",
                padding: "6px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(0,255,255,0.1)",
                  borderColor: "cyan",
                },
              }}
            >
              <ArrowBackIcon />
            </Button>
            <Box
              sx={{
                backgroundColor: "#111827",
                padding: 4,
                borderRadius: 2,
                boxShadow: "0 0 15px rgba(0,255,255,0.2)",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              <BotRegisterForm />
            </Box>
          </Box>
        )}

        {section === "registerLeague" && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => setSection("myLeagues")}
              sx={{
                mb: 2,
                color: "cyan",
                borderColor: "cyan",
                minWidth: "40px",
                padding: "6px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(0,255,255,0.1)",
                  borderColor: "cyan",
                },
              }}
            >
              <ArrowBackIcon />
            </Button>
            <Box
              sx={{
                backgroundColor: "#111827",
                padding: 4,
                borderRadius: 2,
                boxShadow: "0 0 15px rgba(0,255,255,0.2)",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              <LeagueRegisterForm />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
