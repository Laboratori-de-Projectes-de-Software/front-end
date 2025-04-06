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
import League from "./League"; // Ajusta la ruta según tu estructura

// Tipos
interface Bot {
  id: number;
  name: string;
  description: string;
  endpoint?: string;
  enLigaActiva?: boolean; 
}

interface League {
  id: number;
  name: string;
  creatorUsername: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
  fechaInicio?: string;
  fechaFin?: string;
}


type Section =
  | "dashboard"
  | "myBots"
  | "myLeagues"
  | "allLeagues"
  | "allBots"
  | "registerBot"
  | "registerLeague"
  | "leagueDetails";

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
  const [popupOpen, setPopupOpen] = useState(false);

  const [joinLeagueId, setJoinLeagueId] = useState<number | null>(null);
  const [availableBots, setAvailableBots] = useState<Bot[]>([]);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [leagueDetails, setLeagueDetails] = useState<League | null>(null);

  const handleJoinLeague = async (leagueId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v0/bot/owner=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const bots: Bot[] = await res.json();
        const botsDisponibles = bots.filter(bot => !bot.enLigaActiva);
  
        setAvailableBots(botsDisponibles);
        setSelectedBot(null);
        setJoinLeagueId(leagueId); // usar ID
        setJoinDialogOpen(true);
      }
    } catch (err) {
      console.error("Error al obtener bots para apuntarse:", err);
    }
  };
  


  const handleConfirmJoin = async () => {
    console.log("👉 joinLeagueId:", joinLeagueId);
    console.log("👉 selectedBot:", selectedBot);

    if (!joinLeagueId || selectedBot === null) return;

    try {
      const res = await fetch(`http://localhost:8080/api/v0/league/${joinLeagueId}/bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ botId: selectedBot }),
      });

      if (res.ok) {
        setJoinDialogOpen(false);
        fetchAllLeagues();
      } else {
        console.error("❌ Error al unirse a la liga");
      }
    } catch (err) {
      console.error("❌ Error de red al hacer join:", err);
    }
  };



  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Obtener bots del usuario
  const fetchUserBots = useCallback(async () => {
    setLoadingBots(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v0/bot/owner=${username}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUserBots(data);
      } else {
        console.error("Error al obtener bots:", res.status);
      }
    } catch (err) {
      console.error("Error de red:", err);
    } finally {
      setLoadingBots(false);
    }
  }, [username, token]);

  // Obtener todos los bots
  const fetchAllBots = useCallback(async () => {
    setLoadingAllBots(true);
    try {
      const res = await fetch("http://localhost:8080/api/v0/bot", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setAllBots(data);
      }
    } catch (err) {
      console.error("Error al obtener todos los bots:", err);
    } finally {
      setLoadingAllBots(false);
    }
  }, [token]);

  // Obtener todas las ligas
  const fetchAllLeagues = useCallback(async () => {
    setLoadingLeagues(true);
    try {
      const res = await fetch("http://localhost:8080/api/v0/league", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const ligasConEstado = data.map((liga: { id: number; name: string; creatorUsername: string; fechaInicio?: string; fechaFin?: string }) => ({
          ...liga,
          status: calcularEstadoLiga(liga.fechaInicio, liga.fechaFin),
        }));
        setAllLeagues(ligasConEstado);
      }
    } catch (err) {
      console.error("Error al obtener todas las ligas:", err);
    } finally {
      setLoadingLeagues(false);
    }
  }, [token]);

  // Obtener ligas del usuario
  const fetchUserLeagues = useCallback(async () => {
    setLoadingLeagues(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v0/league?owner=${username}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const ligasConEstado = data.map((liga: { fechaInicio?: string; fechaFin?: string; [key: string]: unknown }) => {
          if (typeof liga === "object" && liga !== null) {
            return {
              ...liga,
              status: calcularEstadoLiga(liga.fechaInicio, liga.fechaFin),
            };
          }
          console.error("Invalid league data:", liga);
          return null;
        }).filter(Boolean);
        setAllLeagues(ligasConEstado);
      } else {
        console.error("Error al obtener ligas del usuario:", res.status);
      }
    } catch (err) {
      console.error("Error de red:", err);
    } finally {
      setLoadingLeagues(false);
    }
  }, [username, token]);

  function calcularEstadoLiga(fechaInicio?: string, fechaFin?: string): "INACTIVE" | "ACTIVE" | "FINISHED" {
    if (!fechaInicio) return "INACTIVE";
    if (fechaInicio && !fechaFin) return "ACTIVE";
    return "FINISHED";
  }  

  const fetchLeagueById = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v0/league/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLeagueDetails(data);
        setPopupOpen(true);
      } else {
        console.error("Error al obtener liga:", res.status);
      }
    } catch (err) {
      console.error("Error de red al obtener liga:", err);
    }
  };
  
  useEffect(() => {
    if (section === "myBots") fetchUserBots();
    else if (section === "allBots") fetchAllBots();
    else if (section === "allLeagues") fetchAllLeagues();
    else if (section === "myLeagues") fetchUserLeagues();
  }, [section, fetchUserBots, fetchAllBots, fetchAllLeagues, fetchUserLeagues]);

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

      <Box sx={{ 
        flex: 1, 
        padding: 4, 
        background: "linear-gradient(to top, #0a0f1d, #1a2333)", 
        color: "white",
        height: "100vh",
        overflowY: "auto",
        position: "relative"}}>        
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
                padding: 4,
                borderRadius: 2,
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
                      onView={() => fetchLeagueById(league.id)} 
                    />

                ))}

              </Box>
            )}
          </>
        )}



{section === "allLeagues" && (
  <>
    <Typography variant="h4" color="cyan" sx={{ mb: 4 }}>
      Ver todas las Ligas
    </Typography>

    {loadingLeagues ? (
      <CircularProgress color="inherit" />
    ) : (
      allLeagues.length > 0 ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {allLeagues.map((league) => (
            <LeagueCard
              key={league.id} // usar el ID como key
              id={league.id} // pasar el ID correcto
              name={league.name}
              status={league.status}
              onView={() => {
                fetchLeagueById(league.id);
                setSection("leagueDetails");
              }}
              onJoin={() => handleJoinLeague(league.id)} // pasar el ID, no el nombre
              isAllLeaguesSection
            />
          ))}
        </Box>
      ) : (
        <Typography>No hay ligas disponibles.</Typography>
      )
    )}
  </>
)}


{section === "leagueDetails" && (
  <Box>
    <Button
      variant="outlined"
      onClick={() => setSection("allLeagues")}
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
    {/* Renderizamos el componente Liga */}
    <League />
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
        padding: 4,
        borderRadius: 2
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
            {leagueDetails?.name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1, color: "lightgray" }}>
            Creador: {leagueDetails?.creatorUsername}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Estado: {leagueDetails?.status}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Fecha inicio: {leagueDetails?.fechaInicio || "No iniciada"}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Fecha fin: {leagueDetails?.fechaFin || "No finalizada"}
          </Typography>

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

    <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)} maxWidth="sm" fullWidth>
  <Box sx={{ p: 4, backgroundColor: "#0a0f1d", color: "white", borderRadius: 2 }}>
    <DialogTitle sx={{ color: "cyan" }}>
      Selecciona bots para unirte a la liga
    </DialogTitle>

    <DialogContent>
      {availableBots.length === 0 ? (
        <Typography>No tienes bots disponibles para unirte.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {availableBots.map(bot => (
            <Button
            key={bot.id}
            variant={selectedBot === bot.id ? "contained" : "outlined"}
            onClick={() => {
              setSelectedBot(prev => prev === bot.id ? null : bot.id);
            }}
            sx={{
              justifyContent: "flex-start",
              backgroundColor: selectedBot === bot.id ? "cyan" : "transparent",
              color: selectedBot === bot.id ? "#0a0f1d" : "white",
              borderColor: "cyan",
              "&:hover": {
                backgroundColor: selectedBot === bot.id
                  ? "rgba(0,255,255,0.8)"
                  : "rgba(0,255,255,0.1)",
              },
            }}
          >
            {bot.name}
          </Button>
          
          ))}

        </Box>
      )}
    </DialogContent>

    <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
      <Button onClick={() => setJoinDialogOpen(false)} sx={{ color: "gray" }}>
        Cancelar
      </Button>
      <Button
        onClick={handleConfirmJoin}
        disabled={!selectedBot}
        variant="contained"
        sx={{ backgroundColor: "cyan", color: "#0a0f1d" }}
      >
        Confirmar
      </Button>

    </DialogActions>
  </Box>
</Dialog>



    </Box>
  );
}


         