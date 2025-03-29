import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Enfrentamiento from "../components/Confrontation";
import TablaClasificacion from "../components/ClassificationTable";
import data from "../data/liga.json";

export default function Liga() {
  const [showAllMatches, setShowAllMatches] = useState(false);

  const toggleMatchesView = () => {
    setShowAllMatches(!showAllMatches);
  };

  return (
    <Box className="liga-container">
      <Typography variant="h4">{data.liga.nombre}</Typography>
      <Typography variant="h6">Jornada {data.liga.jornada_actual}</Typography>

      {showAllMatches ? (
        // Vista de cuadrícula (3 por fila)
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {data.liga.enfrentamientos.map((match, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Enfrentamiento
                bot1={match.bot1}
                bot2={match.bot2}
                jornada={match.jornada}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Vista con scroll horizontal (máx. 4 visibles)
        <Box className= "scrollLeague" >
          {data.liga.enfrentamientos.map((match, index) => (
            <Box
              key={index}
              className="scrollLeague-item"
            >
              <Enfrentamiento
                bot1={match.bot1}
                bot2={match.bot2}
                jornada={match.jornada}
              />
            </Box>
          ))}
        </Box>
      )}

<Box className="league-button-container">
  <Button variant="contained" onClick={toggleMatchesView}>
    {showAllMatches ? "Ver menos" : "Ver todos"}
  </Button>
</Box>

      <TablaClasificacion data={data.liga.clasificacion} />
    </Box>
  );
}
