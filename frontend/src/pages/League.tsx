import { useState } from "react";
import { Box, Typography, Button, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Enfrentamiento from "../components/Confrontation";
import TablaClasificacion from "../components/ClassificationTable";
import data from "../data/liga.json";

export default function Liga() {
  const [selectedJornada, setSelectedJornada] = useState<number>(data.liga.jornada_actual);
  const [showAllMatches, setShowAllMatches] = useState(false);

  const jornadasDisponibles = [
    ...new Set(data.liga.enfrentamientos.map((match) => match.jornada))
  ].sort((a, b) => a - b);

  const handleJornadaChange = (event: SelectChangeEvent<string>) => {
    setSelectedJornada(Number(event.target.value)); // Convertir a número
  };

  const toggleMatchesView = () => {
    setShowAllMatches(!showAllMatches);
  };

  const enfrentamientosFiltrados = data.liga.enfrentamientos.filter(
    (match) => showAllMatches || match.jornada === selectedJornada
  );

  return (
    <Box className="liga-container" sx={{ pt: 2, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h4">{data.liga.nombre}</Typography>

      {/* Selector de jornada */}
      <Select value={selectedJornada.toString()} onChange={handleJornadaChange} sx={{ mb: 2 }}>
        {jornadasDisponibles.map((jornada) => (
          <MenuItem key={jornada} value={jornada}>
            Jornada {jornada}
          </MenuItem>
        ))}
      </Select>

      {showAllMatches ? (
        // Vista de cuadrícula (3 por fila)
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {enfrentamientosFiltrados.map((match, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Enfrentamiento bot1={match.bot1} bot2={match.bot2} jornada={match.jornada} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Vista con scroll horizontal (máx. 4 visibles)
        <Box className="scrollLeague">
          {enfrentamientosFiltrados.map((match, index) => (
            <Box key={index} className="scrollLeague-item">
              <Enfrentamiento bot1={match.bot1} bot2={match.bot2} jornada={match.jornada} />
            </Box>
          ))}
        </Box>
      )}

      {/* Botón para alternar entre todas las jornadas o solo la seleccionada */}
      <Box className="league-button-container">
        <Button variant="contained" onClick={toggleMatchesView}>
          {showAllMatches ? "Ver menos" : "Ver todos"}
        </Button>
      </Box>

      <TablaClasificacion data={data.liga.clasificacion} />
    </Box>
  );
}