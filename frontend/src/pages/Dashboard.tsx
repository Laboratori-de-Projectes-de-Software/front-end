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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Android as BotIcon,
  EmojiEvents as LeagueIcon,
  Public as AllIcon,
  Logout as LogoutIcon,
  Close as CloseIcon } from "@mui/icons-material";
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
  endpoint?: string;
}

interface League {
  id: number;
  name: string;
  creatorUsername: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
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
  const [loadingBots, setLoadingBots] = useState(false);
  const [loadingAllBots, setLoadingAllBots] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [botToEdit, setBotToEdit] = useState<Bot | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Desconocido";
  const token = localStorage.getItem("token") || "";
  const [allLeagues, setAllLeagues] = useState<League[]>([]);
  const [leagueFilter, setLeagueFilter] = useState<string[]>(["ALL"]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);




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

  const fetchAllLeagues = useCallback(async () => {
    setLoadingLeagues(true);
    try {
      const res = await fetch("http://localhost:8080/leagues/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllLeagues(data);
      }
    } catch (err) {
      console.error("Error al obtener todas las ligas", err);
    } finally {
      setLoadingLeagues(false);
    }
  }, [token]);


  useEffect(() => {
    if (section === "myBots") fetchUserBots();
    else if (section === "allBots") fetchAllBots();
    else if (section === "allLeagues") fetchAllLeagues(); 
  }, [section, fetchUserBots, fetchAllBots, fetchAllLeagues]);

  useEffect(() => {
    if (section === "myLeagues") {
      const loadLocalLeagues = async () => {
        setLoadingLeagues(true);
        try {
          const res = await fetch("/leagues.json"); // ✅ ruta relativa desde public
          const data = await res.json();
          setAllLeagues(data);
        } catch (err) {
          console.error("Error al cargar leagues.json:", err);
        } finally {
          setLoadingLeagues(false);
        }
      };
  
      loadLocalLeagues();
    }
  }, [section]);

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
              <Button variant="contained" onClick={() => {
                setBotToEdit(null);
                setSection("registerBot");
              }}>
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
                      setBotToEdit(bot);
                      setSection("registerBot");
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Typography>Aún no tienes bots registrados.</Typography>
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
              <BotRegisterForm botToEdit={botToEdit || undefined} onBotSaved={() => setSection("myBots")} />
            </Box>
          </Box>
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
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" color="cyan" sx={{ mb: 2 }}>
              🏆 Mis Ligas
              </Typography>
            </Box>

            {/* Contenedor centrado con ancho fijo */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", gap: 6, mb: 6 }}>
              <Button
                variant="contained"
                onClick={() => setSection("registerLeague")}
                sx={{ width: "300px" }}
              >
                + Registrar nueva Liga
              </Button>

              <FormControl sx={{ width: "300px" }} variant="outlined">
                <InputLabel id="league-filter-label" sx={{ color: "cyan" }}>
                  Filtrar por estado
                </InputLabel>
                <Select
                  labelId="league-filter-label"
                  id="league-filter"
                  value={leagueFilter[0]}
                  onChange={(e) => setLeagueFilter([e.target.value])}
                  label="Filtrar por estado"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
                    "& .MuiSvgIcon-root": { color: "cyan" },
                  }}
                >
                  <MenuItem value="ALL">Todas</MenuItem>
                  <MenuItem value="INACTIVE">🟡 Inactivas</MenuItem>
                  <MenuItem value="ACTIVE">🟢 Activas</MenuItem>
                  <MenuItem value="FINISHED">🔴 Finalizadas</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {loadingLeagues ? (
              <CircularProgress color="inherit" />
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {allLeagues
                  .filter(
                    (league) =>
                      leagueFilter.includes("ALL") ||
                      leagueFilter.includes(league.status)
                  )
                  .map((league) => (
                    <LeagueCard
                      key={league.id}
                      id={league.id}
                      name={league.name}
                      status={league.status}
                      onView={() => {
                        setSelectedLeague(league); // 👈 capturas aquí la liga
                        setPopupOpen(true);
                      }}
                    />
                ))}

              </Box>
            )}
          </>
        )}



        {section === "allLeagues" && (
          <>
            <Typography variant="h4" color="cyan" sx={{ mb: 4 }}>Ver todas las Ligas</Typography>
            
            {loadingLeagues ? <CircularProgress color="inherit" /> : (
              allLeagues.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {allLeagues.map((league) => (
                    <LeagueCard key={league.id} id={league.id} name={league.name} status={"ACTIVE"} />
                  ))}
                </Box>
              ) : <Typography>No hay ligas disponibles.</Typography>
            )}
          </>
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

      <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} maxWidth="sm" fullWidth>
        <Box
          sx={{
            position: "relative",
            p: 4,
            backgroundColor: "#0a0f1d",
            color: "white",
            borderRadius: 2,
          }}
        >
          {/* ❌ Botón cerrar */}
          <IconButton
            onClick={() => setPopupOpen(false)}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Título */}
          <DialogTitle sx={{ fontSize: 24, fontWeight: "bold", mb: 2, color: "cyan", display: "flex", alignItems: "center", gap: 1 }}>
            🏆 Detalles de la liga
          </DialogTitle>

          {/* Contenido */}
          <DialogContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
              {selectedLeague?.name}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 1, color: "lightgray" }}>
              Participantes:
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Typography>- BotAlpha</Typography>
              <Typography>- BotBeta</Typography>
              <Typography>- BotGamma</Typography>
            </Box>
          </DialogContent>

          {/* Botones */}
          <DialogActions sx={{ mt: 4, justifyContent: "flex-end" }}>
            <Button variant="outlined" disabled sx={{ color: "white", borderColor: "gray", opacity: 0.5 }}>
              Editar
            </Button>
            <Button variant="contained" disabled sx={{ backgroundColor: "gray", color: "white", opacity: 0.5 }}>
              Iniciar liga
            </Button>
          </DialogActions>
        </Box>
      </Dialog>



    </Box>
  );
}

         