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
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Android as BotIcon,
  EmojiEvents as LeagueIcon,
  Public as AllIcon,
  Logout as LogoutIcon,
  Close as CloseIcon
} from "@mui/icons-material";
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
  leagueId: number;
  name: string;
  owner: string;
  status: "ACTIVE" | "INACTIVE" | "FINISHED";
  state?: string; // Se utiliza para calcular el estado
  matchTime?: number;
  rounds?: number;
  bots?: number[]; // O la estructura que uses
  matches?: {
    state: string;
    result: number;
    fighters: number[];
    roundNumber: number;
  }[];
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
  const [popupOpen, setPopupOpen] = useState(false);

  const [joinLeagueId, setJoinLeagueId] = useState<number | null>(null);
  const [availableBots, setAvailableBots] = useState<Bot[]>([]);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [leagueDetails, setLeagueDetails] = useState<League | null>(null);
  const [leagueBots, setLeagueBots] = useState<{ id: number; name: string }[]>([]);

  const [joinSuccess, setJoinSuccess] = useState(false);
  const [joinError, setJoinError] = useState(false);

  const [leagueToEdit, setLeagueToEdit] = useState<League | null>(null);

  const [joinedLeagues, setJoinedLeagues] = useState<League[]>([]);
  const [createdLeagues, setCreatedLeagues] = useState<League[]>([]);

  // Para tabs o secciones
  const [subSection, setSubSection] = useState<"joined" | "created">("joined");
  // Para el filtro
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE" | "FINISHED">("ALL");

  // Función que calcula el estado basado únicamente en el campo state.
  function calcularEstadoLiga(state?: string): "INACTIVE" | "ACTIVE" | "FINISHED" {
    if (state) {
      const stateLower = state.toLowerCase();
      if (stateLower === "espera") return "INACTIVE";   // Liga en espera = inactiva
      if (stateLower === "iniciado") return "ACTIVE";    // Consideramos "Iniciado" como activa
      if (stateLower === "activo") return "ACTIVE";
      if (stateLower === "finalizada") return "FINISHED";
    }
    return "INACTIVE"; // Valor por defecto
  }
  const handleDeleteLeague = async (leagueId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta liga? Esta acción no se puede deshacer.")) {
      try {
        const res = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (res.ok) {
          // Actualizar el estado para reflejar la eliminación
          if (section === "myLeagues") {
            fetchUserLeagues();
          } else if (section === "allLeagues") {
            fetchAllLeagues();
          }
          setJoinSuccess(true);
        } else {
          console.error("Error al eliminar la liga:", res.status);
          setJoinError(true);
        }
      } catch (err) {
        console.error("Error de red al eliminar la liga:", err);
        setJoinError(true);
      }
    }
  };
  const handleJoinLeague = async (leagueId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v0/bot?owner=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const bots: Bot[] = await res.json();
        const botsDisponibles = bots.filter(bot => !bot.enLigaActiva);
  
        // Establecer el ID y los bots disponibles
        setJoinLeagueId(leagueId);
        setAvailableBots(botsDisponibles);
        setSelectedBot(null);
  
        // Abrir diálogo
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
        setJoinSuccess(true); 
        fetchAllLeagues();
      } else {
        console.error("❌ Error al unirse a la liga");
        setJoinError(true); 
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
      const res = await fetch(`http://localhost:8080/api/v0/bot?owner=${username}`, {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const ligasConEstado = data.map((liga: { id: number; name: string; creatorUsername: string; state?: string }) => ({
          ...liga,
          status: calcularEstadoLiga(liga.state),
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
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const ligasConEstado = data.map((liga: { state?: string; [key: string]: unknown }) => {
          if (typeof liga === "object" && liga !== null) {
            return {
              ...liga,
              status: calcularEstadoLiga(liga.state as string | undefined),
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

  const fetchLeagueById = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v0/league/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.ok) {
        const data = await res.json();
        const status = calcularEstadoLiga(data.state);
        setLeagueDetails({ ...data, status });
        setPopupOpen(true);

        // Obtener los bots participantes
        if (data.bots && data.bots.length > 0) {
          const fetchedBots: { id: number; name: string }[] = [];
          for (const botId of data.bots) {
            const botRes = await fetch(`http://localhost:8080/api/v0/bot/${botId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (botRes.ok) {
              const botData = await botRes.json();
              fetchedBots.push({ id: botData.id, name: botData.name });
            }
          }
          setLeagueBots(fetchedBots);
        } else {
          setLeagueBots([]);
        }
      } else {
        console.error("Error al obtener liga:", res.status);
      }
    } catch (err) {
      console.error("Error de red al obtener liga:", err);
    }
  };

  const handleStartLeague = async (leagueId: number) => {
    try {
      console.log("👉 Iniciando liga con ID:", leagueId);
      // Iniciar la liga
      const startRes = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/start`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (startRes.ok) {
        console.log("✅ Liga iniciada correctamente");
  
        // Obtener los matches de la liga
        const matchesRes = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/match`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (matchesRes.ok) {
          const matches = await matchesRes.json();
          console.log("✅ Matches obtenidos correctamente:", matches);
          // Redirigir al componente League si la liga ya se inició
          navigate("/league", { state: { leagueId } });
        } else {
          console.error("❌ Error al obtener los matches:", matchesRes.status);
        }
        setJoinSuccess(true);
      } else {
        console.error("❌ Error al iniciar la liga:", startRes.status);
        setJoinError(true);
      }
    } catch (err) {
      console.error("❌ Error de red al iniciar la liga o al obtener los matches:", err);
      setJoinError(true);
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
      fetchAllLeagues();
      fetchUserBots();
    }
  }, [section, fetchAllLeagues, fetchUserBots]);
  
  useEffect(() => {
    if (section === "myLeagues") {
      const userBotIds = userBots.map(bot => bot.id);
      const created = allLeagues.filter(league => league.owner === username);
      const joined = allLeagues.filter(
        league =>
          league.bots && league.bots.some((botId: number) => userBotIds.includes(botId))
      );
      setCreatedLeagues(created);
      setJoinedLeagues(joined);
    }
  }, [allLeagues, userBots, section, username]);

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
        position: "relative"
      }}>        
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

        {/* Mis bots */}
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

        {/* Registrar nuevo bot */}
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
            <Box sx={{ padding: 4, borderRadius: 2 }}>
              <BotRegisterForm botToEdit={botToEdit || undefined} onBotSaved={() => setSection("myBots")} />
            </Box>
          </Box>
        )}

        {/* Ver todos los bots */}
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
          <Box>
            <Typography variant="h4" sx={{ color: "cyan", mb: 3 }}>
              Mis Ligas
            </Typography>
            <Tabs
              value={subSection}
              onChange={(_event, newValue) => setSubSection(newValue)}
              textColor="inherit"
            >
              <Tab label="LIGAS EN LAS QUE PARTICIPAS" value="joined" />
              <Tab label="LIGAS QUE HAS CREADO" value="created" />
            </Tabs>

            {/* Ligas en las que participas */}
            {subSection === "joined" && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <FormControl fullWidth variant="outlined" sx={{ maxWidth: "300px" }}>
                    <InputLabel id="filter-label-joined" sx={{ color: "cyan" }}>
                      Filtrar por estado
                    </InputLabel>
                    <Select
                      labelId="filter-label-joined"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {joinedLeagues
                    .filter((league) =>
                      selectedFilter === "ALL" ? true : league.status === selectedFilter
                    )
                    .map((league) => (
                      <LeagueCard
                        key={league.leagueId}
                        id={league.leagueId}
                        name={league.name}
                        status={league.status}
                        onDelete={(id) => handleDeleteLeague(id)} // Nueva prop
                        onView={() => {
                          if (league.status === "ACTIVE" || league.status === "FINISHED") {
                            navigate("/league", { state: { leagueId: league.leagueId } });
                          } else {
                            fetchLeagueById(league.leagueId);
                          }
                        }
                      }                        
                      />
                    ))}
                </Box>
              </Box>
            )}

            {/* Ligas que has creado */}
            {subSection === "created" && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <FormControl fullWidth variant="outlined" sx={{ maxWidth: "300px" }}>
                    <InputLabel id="filter-label-created" sx={{ color: "cyan" }}>
                      Filtrar por estado
                    </InputLabel>
                    <Select
                      labelId="filter-label-created"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
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
                  <Button
                    variant="contained"
                    onClick={() => {
                      setLeagueToEdit(null);
                      setSection("registerLeague");
                    }}
                    sx={{ ml: 2 }}
                  >
                    + Registrar nueva Liga
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {createdLeagues
                    .filter((league) =>
                      selectedFilter === "ALL" ? true : league.status === selectedFilter
                    )
                    .map((league) => (
                      <LeagueCard
                        key={league.leagueId}
                        id={league.leagueId}
                        name={league.name}
                        status={league.status}
                        onView={() => {
                          if (league.status === "ACTIVE" || league.status === "FINISHED") {
                            navigate("/league", { state: { leagueId: league.leagueId } });
                          } else {
                            fetchLeagueById(league.leagueId);
                          }
                        }}                        
                        onStart={(id) => handleStartLeague(id)}
                        onEdit={(id) => {
                          const liga = createdLeagues.find((l) => l.leagueId === id);
                          if (liga) {
                            setLeagueToEdit(liga);
                            setSection("registerLeague");
                          }
                        }}
                        onDelete={(id) => handleDeleteLeague(id)} // Nueva prop
                        isMyLeaguesSection
                      />
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Ver todas las ligas */}
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
                      key={league.leagueId}
                      id={league.leagueId}
                      name={league.name}
                      status={league.status}
                      onView={() => {
                        if (league.status === "ACTIVE" || league.status === "FINISHED") {
                          navigate("/league", { state: { leagueId: league.leagueId } });
                        } else {
                          fetchLeagueById(league.leagueId);
                        }
                      }}                      
                      onJoin={() => handleJoinLeague(league.leagueId)}
                       onDelete={(id) => handleDeleteLeague(id)} // Nueva prop
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
  
        {/* Detalles de la liga */}
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

            {/*  Eliminado <League />, para que NO muestre "Cargando liga..."  */}
            
            {/* Podrías dejar algún contenido de texto aquí, o simplemente nada */}
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
            <Box sx={{ padding: 4, borderRadius: 2 }}>
              <LeagueRegisterForm
                leagueToEdit={leagueToEdit}
                onLeagueCreated={() => {
                  setSection("myLeagues");
                  setLeagueToEdit(null);
                  fetchUserLeagues();
                }}
              />
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
          <DialogTitle
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              mb: 2,
              color: "cyan",
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            🏆 Detalles de la liga
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
              {leagueDetails?.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Estado: {leagueDetails?.status}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Duración del enfrentamiento: {leagueDetails?.matchTime} min
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Número de rondas: {leagueDetails?.rounds}
            </Typography>
            {leagueBots.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ color: "cyan", mb: 1 }}>
                  Bots participantes:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                  {leagueBots.map(bot => (
                    <li key={bot.id}>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        🤖 {bot.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </DialogContent>
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
                    onClick={() => setSelectedBot(prev => prev === bot.id ? null : bot.id)}
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

      <Snackbar
        open={joinSuccess}
        autoHideDuration={3000}
        onClose={() => setJoinSuccess(false)}
        message="✅ Te has unido correctamente a la liga"
      />
      <Snackbar
        open={joinError}
        autoHideDuration={3000}
        onClose={() => setJoinError(false)}
        message="❌ Hubo un error al unirse a la liga"
      />
    </Box>
  );
}
