import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "../styles.css";

export default function LeagueRegisterForm() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numRounds, setNumRounds] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !season || !startDate || !endDate || !numRounds) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const payload = {
      name,
      season,
      startDate,
      endDate,
      numRounds: Number(numRounds),
    };

    try {
      const response = await fetch("http://localhost:8080/api/leagues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Liga registrada correctamente.");
        setName("");
        setSeason("");
        setStartDate("");
        setEndDate("");
        setNumRounds("");
      } else {
        alert("Error al registrar la liga.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <Box className="login-container">
      <Typography variant="h4" className="login-title">
        Registrar Liga
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Nombre de la Liga"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Temporada"
          variant="outlined"
          fullWidth
          margin="normal"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
        <TextField
          label="Fecha de Inicio"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          label="Número de Jornadas"
          type="number"
          fullWidth
          margin="normal"
          value={numRounds}
          onChange={(e) => setNumRounds(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="login-button"
        >
          Registrar Liga
        </Button>
      </form>
    </Box>
  );
}
