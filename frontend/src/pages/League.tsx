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
import { useLocation } from "react-router-dom";

interface Match {
  state: string;
  result: number;
  fighters: number[];
  roundNumber: number;
}


export default function Liga() {
  const location = useLocation();
  const leagueId = location.state?.leagueId;

  const [leagueData, setLeagueData] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 4;

  const [roundMap, setRoundMap] = useState<number[]>([]); // índice → roundNumber real

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!leagueId || !token) return;

    const fetchLeagueData = async () => {
      try {
        const resLeague = await fetch(`http://localhost:8080/api/v0/league/${leagueId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataLeague = await resLeague.json();
        setLeagueData(dataLeague);

        const resMatches = await fetch(`http://localhost:8080/api/v0/league/${leagueId}/match`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataMatches = await resMatches.json();
        setMatches(dataMatches);

        const rounds = [...new Set(dataMatches.map((m: any) => m.roundNumber))].sort((a, b) => a - b);
        setRoundMap(rounds);
        setSelectedIndex(0);
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

  const roundNumberActual = roundMap[selectedIndex];

  const enfrentamientosFiltrados = useMemo(() => {
    return matches.filter((match) => match.roundNumber === roundNumberActual);
  }, [roundNumberActual, matches]);

  const visibleMatches = enfrentamientosFiltrados.slice(
    currentIndex,
    currentIndex + pageSize
  );

  const handlePrevious = () => {
    if (currentIndex - pageSize >= 0) {
      setCurrentIndex(currentIndex - pageSize);
    }
  };

  const handleNext = () => {
    if (currentIndex + pageSize < enfrentamientosFiltrados.length) {
      setCurrentIndex(currentIndex + pageSize);
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

  return (
    <Box sx={{ pt: 3, px: 3, height: "100%", overflowY: "auto", color: "white" }}>
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
        <InputLabel id="jornada-label" sx={{ color: "cyan" }}>Seleccionar Jornada</InputLabel>
        <Select
          labelId="jornada-label"
          value={selectedIndex.toString()}
          onChange={handleJornadaChange}
          label="Seleccionar Jornada"
          sx={{ color: "white" }}
        >
          {roundMap.map((_, index) => (
            <MenuItem key={index} value={index}>Jornada {index}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3, gap: 2 }}>
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{ color: "white", border: "1px solid cyan", ":hover": { backgroundColor: "rgba(0,255,255,0.2)" } }}
        >
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </IconButton>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", maxWidth: "1000px" }}>
          {visibleMatches.map((match, index) => (
            <Enfrentamiento
              key={index}
              bot1={match.fighters[0]}
              bot2={match.fighters[1]}
              jornada={selectedIndex}
            />
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={currentIndex + pageSize >= enfrentamientosFiltrados.length}
          sx={{ color: "white", border: "1px solid cyan", ":hover": { backgroundColor: "rgba(255,255,255,0.2)" } }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography
        variant="h5"
        sx={{ mb: 2, color: "cyan", fontWeight: "bold", textAlign: "center" }}
      >
        Clasificación
      </Typography>

      <TablaClasificacion data={leagueData.clasificacion || []} />
    </Box>
  );
}
