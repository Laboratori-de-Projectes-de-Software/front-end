import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Enfrentamiento from "../components/Confrontation";
import TablaClasificacion from "../components/ClassificationTable";
import data from "../data/liga.json";

// Importa íconos de Material UI para las flechas
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Liga() {
  // Estado para la jornada seleccionada
  const [selectedJornada, setSelectedJornada] = useState<number>(
    data.liga.jornada_actual
  );

  // Estado para la paginación
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cantidad de enfrentamientos a mostrar por “página”
  const pageSize = 4;

  // Todas las jornadas disponibles
  const jornadasDisponibles = useMemo(() => {
    return [...new Set(data.liga.enfrentamientos.map((m) => m.jornada))].sort(
      (a, b) => a - b
    );
  }, []);

  // Manejar el cambio de la jornada en el dropdown
  const handleJornadaChange = (event: SelectChangeEvent<string>) => {
    setSelectedJornada(Number(event.target.value));
    setCurrentIndex(0); // Reiniciar la paginación al cambiar de jornada
  };

  // Filtramos por jornada seleccionada
  const enfrentamientosFiltrados = useMemo(() => {
    return data.liga.enfrentamientos.filter(
      (match) => match.jornada === selectedJornada
    );
  }, [selectedJornada]);

  // Sub-array de enfrentamientos que se ven en la “página actual”
  const visibleMatches = enfrentamientosFiltrados.slice(
    currentIndex,
    currentIndex + pageSize
  );

  // Navegar hacia la página anterior
  const handlePrevious = () => {
    if (currentIndex - pageSize >= 0) {
      setCurrentIndex(currentIndex - pageSize);
    }
  };

  // Navegar hacia la página siguiente
  const handleNext = () => {
    if (currentIndex + pageSize < enfrentamientosFiltrados.length) {
      setCurrentIndex(currentIndex + pageSize);
    }
  };

  return (
    <Box
      sx={{
        pt: 3,
        px: 3,
        height: "100%",
        overflowY: "auto",
        color: "white",
      }}
    >
      {/* Título grande de la liga */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "cyan",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {data.liga.nombre}
      </Typography>

      {/* Selector de jornada con estilo similar a tus dropdowns "Filtrar por estado" */}
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
          value={selectedJornada.toString()}
          onChange={handleJornadaChange}
          label="Seleccionar Jornada"
          sx={{
            color: "white",
          }}
        >
          {jornadasDisponibles.map((jornada) => (
            <MenuItem key={jornada} value={jornada}>
              Jornada {jornada}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sección de enfrentamientos, centrada con flechas para “paginación” */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          gap: 2,
        }}
      >
        {/* Flecha izquierda */}
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            color: "white",
            border: "1px solid cyan",
            ":hover": {
              backgroundColor: "rgba(0,255,255,0.2)",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </IconButton>

        {/* Contenedor de los 3/4 enfrentamientos que se muestran */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1000px", // ajusta según tu diseño
          }}
        >
          {visibleMatches.map((match, index) => (
            <Enfrentamiento
              key={index}
              bot1={match.bot1}
              bot2={match.bot2}
              jornada={match.jornada}
            />
          ))}
        </Box>

        {/* Flecha derecha */}
        <IconButton
          onClick={handleNext}
          disabled={currentIndex + pageSize >= enfrentamientosFiltrados.length}
          sx={{
            color: "white",
            border: "1px solid cyan",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Título para la Clasificación */}
      <Typography
        variant="h5"
        sx={{ mb: 2, color: "cyan", fontWeight: "bold", textAlign: "center" }}
      >
        Clasificación
      </Typography>

      {/* Tabla de clasificación */}
      <TablaClasificacion data={data.liga.clasificacion} />
    </Box>
  );
}
