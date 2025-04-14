import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import Enfrentamiento from "../components/Confrontation";
import TablaClasificacion from "../components/ClassificationTable";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Tipo para un match
interface Match {
  state: string;
  result: number;
  fighters: number[];
  roundNumber: number;
}

interface LeagueProps {
  leagueId: number;
}

// Datos mínimos de la liga (ajusta según lo que devuelve tu API)
interface LeagueData {
  leagueId: number;
  name: string;
  // Otros campos que utilices...
}

// Interfaz para la clasificación tal como la espera la tabla.
// Si la tabla no admite null, se asegura con valores por defecto.
export interface IClasificacion {
  botId: number;
  botName: string;
  points: number;
  position: number;
  nWins: number;
  nLosses: number;
  nDraws: number;
}

// Tipo que devuelve el endpoint del leaderboard
interface LeaderboardAPI {
  botId: number;
  name: string | null;
  points: number;
  position: number | null;
  nWins: number;
  nLosses: number;
  nDraws: number;
}

export default function League({ leagueId }: LeagueProps) {
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [roundMap, setRoundMap] = useState<number[]>([]);
  const [botNames, setBotNames] = useState<Record<number, string>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardAPI[]>([]);
  const pageSize = 4;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!leagueId || !token) return;

    const fetchLeagueData = async () => {
      try {
        // 1. Obtener datos de la liga
        const resLeague = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataLeague: LeagueData = await resLeague.json();
        setLeagueData(dataLeague);

        // 2. Obtener los matches de la liga
        const resMatches = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/match`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataMatches: Match[] = await resMatches.json();
        setMatches(dataMatches);

        // 3. Extraer los números de jornada (rounds)
        const rounds: number[] = [...new Set(dataMatches.map((m) => m.roundNumber))].sort((a, b) => a - b);
        setRoundMap(rounds);
        setSelectedIndex(0);

        // 4. Obtener nombres de bots para los enfrentamientos
        const botIds = new Set<number>();
        dataMatches.forEach((m) => m.fighters.forEach((id) => botIds.add(id)));
        const names: Record<number, string> = {};
        for (const id of botIds) {
          const resBot = await fetch(`http://localhost:8080/api/v0/bot/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const botData = await resBot.json();
          names[id] = botData.name;
        }
        setBotNames(names);

        // 5. Obtener la clasificación (leaderboard)
        const resLeaderboard = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataLeaderboard: LeaderboardAPI[] = await resLeaderboard.json();
        // Para cada registro, si el campo name es null, se obtiene llamando al endpoint de bot.
        const updatedLeaderboard = await Promise.all(
          dataLeaderboard.map(async (item, i) => {
            let name = item.name;
            if (name === null) {
              const resBot = await fetch(`http://localhost:8080/api/v0/bot/${item.botId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const botData = await resBot.json();
              name = botData.name;
            }
            return {
              ...item,
              position: item.position ?? (i + 1),  // Asigna posición si viene null
              name,
            };
          })
        );
        setLeaderboard(updatedLeaderboard);
      } catch (error) {
        console.error("Error cargando datos de la liga:", error);
      }
    };

    fetchLeagueData();
  }, [leagueId]);

  const handleJornadaChange = (event: SelectChangeEvent<string>) => {
    setSelectedIndex(Number(event.target.value));
    setCurrentIndex(0);
  };

  // Determinar la jornada actual
  const roundNumberActual = roundMap[selectedIndex] ?? 0;

  // Filtrar los matches correspondientes a la jornada actual
  const enfrentamientosFiltrados = useMemo(() => {
    return matches.filter((match) => match.roundNumber === roundNumberActual);
  }, [roundNumberActual, matches]);

  // Paginación: obtener la página actual de matches
  const visibleMatches = enfrentamientosFiltrados.slice(currentIndex, currentIndex + pageSize);

  const handlePrevious = () => {
    if (currentIndex - pageSize >= 0) {
      setCurrentIndex((prev) => prev - pageSize);
    }
  };

  const handleNext = () => {
    if (currentIndex + pageSize < enfrentamientosFiltrados.length) {
      setCurrentIndex((prev) => prev + pageSize);
    }
  };

  if (!leagueData || roundMap.length === 0) {
    return (
      <Box sx={{ color: "white", textAlign: "center", mt: 4 }}>
        <CircularProgress color="inherit" />
        <Typography>Cargando liga...</Typography>
      </Box>
    );
  }

  // Transformamos la data del leaderboard para ajustarla a la interfaz IClasificacion
  const dataTabla: IClasificacion[] = leaderboard.map((item) => ({
    botId: item.botId,
    botName: item.name ?? "Desconocido",
    points: item.points,
    position: item.position ?? 0, // Asigna un valor por defecto si es null
    nWins: item.nWins,
    nLosses: item.nLosses,
    nDraws: item.nDraws,
  }));

  return (
    <Box sx={{ 
      pt: 0, // Ajustar para integrarse en el Dashboard
      px: 0,
      height: "100%",
      overflowY: "auto",
      color: "white"
    }}>

      <Typography variant="h4" sx={{ mb: 3, color: "cyan", fontWeight: "bold", textAlign: "center" }}>
        {leagueData.name}
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          width: "250px",
          mb: 3,
          ".MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "cyan" },
          "& .MuiSvgIcon-root": { color: "cyan" },
        }}
      >
        <InputLabel id="jornada-label" sx={{ color: "cyan" }}>
          Seleccionar Jornada
        </InputLabel>
        <Select
          labelId="jornada-label"
          value={selectedIndex.toString()}
          onChange={handleJornadaChange}
          label="Seleccionar Jornada"
          sx={{ color: "white" }}
        >
          {roundMap.map((_, index) => (
            <MenuItem key={index} value={index}>
              Jornada {index}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            color: "white",
            border: "1px solid cyan",
            ":hover": { backgroundColor: "rgba(0,255,255,0.2)" },
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1000px",
          }}
        >
          {visibleMatches.map((match, index) => (
            <Enfrentamiento
              key={index}
              bot1={botNames[match.fighters[0]] || match.fighters[0].toString()}
              bot2={botNames[match.fighters[1]] || match.fighters[1].toString()}
              jornada={selectedIndex}
            />
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={currentIndex + pageSize >= enfrentamientosFiltrados.length}
          sx={{
            color: "white",
            border: "1px solid cyan",
            ":hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, color: "cyan", fontWeight: "bold", textAlign: "center" }}>
        Clasificación
      </Typography>
      <TablaClasificacion
        data={dataTabla.map((item) => ({
          posicion: item.position,
          bot: item.botName,
          puntos: item.points,
          nWins: item.nWins,
          nLosses: item.nLosses,
          nDraws: item.nDraws,
        }))}
      />
    </Box>
  );
}
